export const makeRouteFromTitle = (title: string) => {
  title = title.toLowerCase();
  title = title.replaceAll(/[^\s\w]/gi, '');
  title = title.replaceAll(' ', '-');

  return title;
};
