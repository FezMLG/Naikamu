import { AnimePlayer, PlayerType } from '@naikamu/shared';

export const sortPlayers = (a: AnimePlayer, b: AnimePlayer): -1 | 0 | 1 => {
  const types: PlayerType[] = ['native', 'embed', 'external'];
  const aIndex = types.indexOf(a.playerType);
  const bIndex = types.indexOf(b.playerType);

  if (aIndex > bIndex) {
    return 1;
  }
  if (aIndex < bIndex) {
    return -1;
  }

  return 0;
};
