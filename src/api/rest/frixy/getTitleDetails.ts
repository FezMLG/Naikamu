import { RestClient } from '../RestClient';

export const getTitleDetails = async (link: string) => {
  const baseURL = `https://frixysubs.pl/api/anime/${link}`;
  console.log(baseURL);
  const response = await new RestClient(baseURL).get<any>();
  return response;
};
