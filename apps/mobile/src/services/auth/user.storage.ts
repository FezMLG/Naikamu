import { User } from '@naikamu/shared';

import { storageGetData, storageStoreData } from '../../utils';

const USER_KEY = 'loggedUser';

const clearSavedUser = () => {
  storageStoreData(USER_KEY, null);
};

const saveUser = (user: User | null) => {
  storageStoreData(USER_KEY, user);
};

const getUser = () => storageGetData<User>(USER_KEY);

export const userStorage = {
  clearSavedUser,
  saveUser,
  getUser,
};
