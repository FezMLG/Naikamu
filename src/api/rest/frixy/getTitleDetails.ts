import { RestClient } from '../RestClient';

export const getTitleDetails = async (link: string) => {
  const baseURL = 'https://frixysubs.pl/api';
  const response = await new RestClient(baseURL).get<any>(`/anime/${link}`);
  return response;
};
