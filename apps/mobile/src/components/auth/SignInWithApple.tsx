import React from 'react';

import {
  appleAuth,
  AppleButton,
} from '@invertase/react-native-apple-authentication';
import { firebase } from '@react-native-firebase/auth';
import * as Sentry from '@sentry/react-native';
import { View } from 'react-native';

import { useTranslate } from '../../i18n/useTranslate';
import { useUserService } from '../../services/auth/user.service';
import { useLayoutMessageService } from '../../services/layout-info';
import { defaultRadius } from '../../styles';

/**
 * Note the sign in request can error, e.g. if the user cancels the sign-in.
 * Use `appleAuth.Error` to determine the type of error, e.g. `error.code === appleAuth.Error.CANCELED`
 */
async function onAppleButtonPress() {
  try {
    const appleAuthRequestResponse = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
    });

    const { identityToken, nonce } = appleAuthRequestResponse;

    // can be null in some scenarios
    if (identityToken) {
      const appleCredential = firebase.auth.AppleAuthProvider.credential(
        identityToken,
        nonce,
      );

      const userCredential = await firebase
        .auth()
        .signInWithCredential(appleCredential);

      console.log(
        `Firebase authenticated via Apple, UID: ${userCredential.user.uid}`,
      );
    } else {
      return 'auth/apple/missing-identity-token';
    }
  } catch (error) {
    console.error('Apple Sign-In Error:', error);
    Sentry.captureException(error);
    throw error; // Re-throw the error to handle it in the component
  }
}

export function SignInWithApple() {
  const userService = useUserService();
  const { setAndShowMessage } = useLayoutMessageService();
  const { translate } = useTranslate();

  return (
    <View>
      {appleAuth.isSupported && (
        <AppleButton
          buttonStyle={AppleButton.Style.WHITE}
          buttonType={AppleButton.Type.SIGN_IN}
          cornerRadius={defaultRadius}
          onPress={() =>
            onAppleButtonPress()
              .then(() => {
                userService.setLoggedUser();
              })
              .catch(error => {
                Sentry.captureException(error);
                setAndShowMessage(translate('auth.apple_sign_in_error'));
              })
          }
          style={[{ height: 50 }]}
        />
      )}
    </View>
  );
}
