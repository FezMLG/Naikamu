export const makeRouteFromTitle = (title: string) => {
  title = title.toLowerCase();
  title = title.replace(/[^\w\s]/gi, '');
  title = title.replace(/ /g, '-');
  return title;
};
