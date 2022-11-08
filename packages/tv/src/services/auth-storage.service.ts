import * as Keychain from 'react-native-keychain';

export const saveTokensToStorage = async (
  idToken: string,
  tokenKey: string,
) => {
  await Keychain.setGenericPassword(tokenKey, JSON.stringify(idToken), {
    service: tokenKey,
  });
};

export const retrieveTokensFromStorage = async (
  tokenKey: string,
): Promise<string | null> => {
  try {
    const credentials = await Keychain.getGenericPassword({
      service: tokenKey,
    });
    if (credentials) {
      const token: string = JSON.parse(credentials.password);

      return token;
    }

    return null;
  } catch (error) {
    console.log("Keychain couldn't be accessed!", error);
    return null;
  }
};

export const resetTokensStorage = async (tokenKey: string) => {
  await Keychain.resetGenericPassword({
    service: tokenKey,
  });
};
