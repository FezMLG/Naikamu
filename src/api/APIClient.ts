import axios, { AxiosInstance } from 'axios';
import { AnimeSeason } from '../enums/anime-season.enum';
import {
  AnimeList,
  AnimeDetails,
  AnimeEpisodes,
  AnimePlayers,
} from '../interfaces';
import { API_URL } from '@env';

interface GetAnimeListDTO {
  page?: number;
  perPage?: number;
  season?: AnimeSeason;
  seasonYear?: number;
}

export class APIClient {
  private instance: AxiosInstance;

  constructor() {
    this.instance = axios.create({
      baseURL: API_URL,
      timeout: 2000,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
  }

  private async get<T>(url: string): Promise<T> {
    const { data } = await this.instance.get<T>(url);
    return data;
  }

  private async post<T>(url: string, dataToSend: Object): Promise<T> {
    const { data } = await this.instance.post<T>(url, dataToSend);
    return data;
  }

  async getAnimeList({
    page,
    season,
    seasonYear,
    perPage = 25,
  }: GetAnimeListDTO): Promise<AnimeList> {
    return this.get<AnimeList>(
      `/anime?per-page=${perPage}&page=${page}&season=${season}&season-year=${seasonYear}`,
    );
  }

  async getAnimeDetails(id: number): Promise<AnimeDetails> {
    return this.post<AnimeDetails>('/anime', {
      dataSource: 'anilist',
      sourceId: String(id),
    });
  }

  async getEpisodes(
    animeName: string,
    expectedEpisodes: number,
  ): Promise<AnimeEpisodes> {
    return this.post<AnimeEpisodes>('/anime/episodes', {
      animeName: animeName,
      expected_episodes: expectedEpisodes,
    });
  }

  async getEpisodePlayers(
    animeName: string,
    episode: number,
  ): Promise<AnimePlayers> {
    return this.post<AnimePlayers>(`/anime/episode/${episode}`, {
      animeName: animeName,
      resolve: true,
    });
  }
}
