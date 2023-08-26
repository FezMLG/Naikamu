import { AnimeSeason } from '@aniwatch/shared';

export interface IAnimeSeasons {
  value: AnimeSeason;
  titleKey: string;
  icon: string;
}

export const AnimeSeasons: Record<
  'winter' | 'spring' | 'summer' | 'fall',
  IAnimeSeasons
> = {
  winter: {
    value: AnimeSeason.Winter,
    titleKey: 'animeSeason.winter',
    icon: 'snowflake',
  },
  spring: {
    value: AnimeSeason.Spring,
    titleKey: 'animeSeason.spring',
    icon: 'flower',
  },
  summer: {
    value: AnimeSeason.Summer,
    titleKey: 'animeSeason.summer',
    icon: 'white-balance-sunny',
  },
  fall: {
    value: AnimeSeason.Fall,
    titleKey: 'animeSeason.fall',
    icon: 'leaf',
  },
};

export const getAnimeSeason = (month: number = new Date().getMonth() + 1) => {
  switch (month) {
    case 1:
    case 2:
    case 3: {
      return AnimeSeasons.winter;
    }
    case 4:
    case 5:
    case 6: {
      return AnimeSeasons.spring;
    }
    case 7:
    case 8:
    case 9: {
      return AnimeSeasons.summer;
    }
    default: {
      return AnimeSeasons.fall;
    }
  }
};
