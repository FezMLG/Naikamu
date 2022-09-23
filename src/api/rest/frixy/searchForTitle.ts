import { IFrixySearchResults } from '../../../interfaces';
import { RestClient } from '../RestClient';

export const searchForTitle = async (title: string) => {
  const baseURL = `https://frixysubs.pl/api/anime?limit=15&offset=0&search=${encodeURI(
    title,
  )}`;
  console.log(baseURL);
  const response = await new RestClient(baseURL).get<IFrixySearchResults>();
  return response;
};
