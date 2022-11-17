import { AnimeSeason } from '@aniwatch/shared';

export const getAnimeSeason = (month: number = new Date().getMonth() + 1) => {
  switch (month) {
    case 1:
    case 2:
    case 3:
      return AnimeSeason.Winter;
    case 4:
    case 5:
    case 6:
      return AnimeSeason.Spring;
    case 7:
    case 8:
    case 9:
      return AnimeSeason.Summer;
    default:
      return AnimeSeason.Fall;
  }
};
