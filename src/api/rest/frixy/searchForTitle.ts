import { IFrixySearchResults } from '../../../interfaces';
import { RestClient } from '../RestClient';

export const searchForTitle = async (title: string) => {
  const baseURL = 'https://frixysubs.pl/api';
  const response = await new RestClient(baseURL).get<IFrixySearchResults>(
    `/anime?limit=15&offset=0&search=${encodeURI(title)}`,
  );
  return response;
};
