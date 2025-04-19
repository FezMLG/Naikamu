import { PlayerType } from '../enums';

export interface IPlayerResponse {
  type: PlayerType;
  uri: string | null;
  status: number;
  title: string | null;
  downloadable: boolean;
}
