import React from 'react';

import {
  appleAuth,
  AppleButton,
} from '@invertase/react-native-apple-authentication';
import { firebase } from '@react-native-firebase/auth';
import { View } from 'react-native';

import { useUserService } from '../../services/auth/user.service';

/**
 * Note the sign in request can error, e.g. if the user cancels the sign-in.
 * Use `appleAuth.Error` to determine the type of error, e.g. `error.code === appleAuth.Error.CANCELED`
 */
async function onAppleButtonPress() {
  // 1). start a apple sign-in request
  const appleAuthRequestResponse = await appleAuth.performRequest({
    requestedOperation: appleAuth.Operation.LOGIN,
    requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
  });

  // 2). if the request was successful, extract the token and nonce
  const { identityToken, nonce } = appleAuthRequestResponse;

  // can be null in some scenarios
  if (identityToken) {
    // 3). create a Firebase `AppleAuthProvider` credential
    const appleCredential = firebase.auth.AppleAuthProvider.credential(
      identityToken,
      nonce,
    );

    // 4). use the created `AppleAuthProvider` credential to start a Firebase auth request,
    //     in this example `signInWithCredential` is used, but you could also call `linkWithCredential`
    //     to link the account to an existing user
    const userCredential = await firebase
      .auth()
      .signInWithCredential(appleCredential);

    // user is now signed in, any Firebase `onAuthStateChanged` listeners you have will trigger
    console.log(
      `Firebase authenticated via Apple, UID: ${userCredential.user.uid}`,
    );
  } else {
    // handle this - retry?
  }
}

export function SignInWithApple() {
  const userService = useUserService();

  // your component that renders your social auth providers
  return (
    <View>
      {/* Render your other social provider buttons here */}
      {appleAuth.isSupported && (
        <AppleButton
          buttonStyle={AppleButton.Style.WHITE}
          buttonType={AppleButton.Type.SIGN_IN}
          cornerRadius={5}
          onPress={() =>
            onAppleButtonPress().then(() => {
              userService.setLoggedUser();
            })
          }
          style={[{ height: 50 }]}
        />
      )}
    </View>
  );
}
