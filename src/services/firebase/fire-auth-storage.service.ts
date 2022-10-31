import {
  resetTokensStorage,
  retrieveTokensFromStorage,
  saveTokensToStorage,
} from '../auth-storage.service';

export const FIRE_TOKEN = 'FIRE_TOKEN';

export const fireSaveTokensToStorage = async (idToken: string) => {
  await saveTokensToStorage(idToken, FIRE_TOKEN);
};

export const fireRetrieveTokensFromStorage = async (): Promise<
  string | null
> => {
  return retrieveTokensFromStorage(FIRE_TOKEN);
};

export const fireResetTokensStorage = async () => {
  await resetTokensStorage(FIRE_TOKEN);
};
