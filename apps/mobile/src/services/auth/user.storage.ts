import { User } from '@aniwatch/shared';
import { storageGetData, storageStoreData } from '../../utils';

const USER_KEY = 'loggedUser';

const clearSavedUser = async () => {
  await storageStoreData(USER_KEY, null);
};

const saveUser = async (user: User | null) => {
  await storageStoreData(USER_KEY, user);
};

const getUser = async () => {
  return storageGetData<User>(USER_KEY);
};

export const userStorage = {
  clearSavedUser,
  saveUser,
  getUser,
};
