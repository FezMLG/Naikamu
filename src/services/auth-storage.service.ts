import * as Keychain from 'react-native-keychain';

export const TOKEN = 'TOKEN';

export const saveTokensToStorage = async (idToken: string) => {
  await Keychain.setGenericPassword(TOKEN, JSON.stringify(idToken));
};

export const retrieveTokensFromStorage = async (): Promise<string | null> => {
  try {
    const credentials = await Keychain.getGenericPassword();
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

export const resetTokensStorage = async () => {
  await Keychain.resetGenericPassword();
};
