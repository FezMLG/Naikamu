export const makeRouteFromTitle = (title: string) => {
  title.replace(/[^a-z0-9]/gi, '');
  title.replace(/ /g, '-');
  return title;
};
