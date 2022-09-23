import { getTitleDetails } from './getTitleDetails';
import { searchForTitle } from './searchForTitle';

export const getTitle = async (title: string) => {
  const list = await searchForTitle(title);
  const series = await getTitleDetails(list.series[0].link);
  return series;
};
