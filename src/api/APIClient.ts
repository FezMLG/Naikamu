import axios, { AxiosInstance } from 'axios';
import { AnimeSeason } from '../enums/anime-season.enum';
import { AnimeList, AnimeDetails, AnimeEpisodes } from '../interfaces';

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
      baseURL: 'https://api-aniwatch.herokuapp.com/api',
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

  async getAnimeList(options: GetAnimeListDTO): Promise<AnimeList> {
    return this.post<AnimeList>('/anime', options);
  }

  async getAnimeDetails(animeName: string): Promise<AnimeDetails> {
    animeName.replace(/[^a-z0-9]/gi, '');
    animeName.replace(/ /g, '-');
    return this.get<AnimeDetails>(`/${animeName}`);
  }

  async getEpisodes(
    animeName: string,
    expectedEpisodes: number,
  ): Promise<AnimeEpisodes> {
    animeName.replace(/[^a-z0-9]/gi, '');
    animeName.replace(/ /g, '-');
    return this.post<AnimeEpisodes>(`/${animeName}/episodes`, {
      expected_episodes: expectedEpisodes,
    });
  }

  async getEpisodePlayers(
    animeName: string,
    episode: number,
  ): Promise<AnimeEpisodes> {
    animeName.replace(/[^a-z0-9]/gi, '');
    animeName.replace(/ /g, '-');
    return this.get<AnimeEpisodes>(`/${animeName}/episode/${episode}`);
  }
}
