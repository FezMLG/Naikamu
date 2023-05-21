import AsyncStorage from '@react-native-async-storage/async-storage';

export const storageStoreData = async <T = Object>(key: string, value: T) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
    // saving error
  }
};

export const storageGetData = async <T = Object>(
  key: string,
): Promise<T | null | undefined> => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    // error reading value
  }
};
