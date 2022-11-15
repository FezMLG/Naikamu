import axios, { AxiosInstance, RawAxiosRequestHeaders } from 'axios';
import { AnimeSeason } from '../enums/anime-season.enum';
import {
  AnimeList,
  AnimeDetails,
  AnimeEpisodes,
  AnimePlayers,
} from '../interfaces';
import { API_URL } from '@env';
import { fireGetIdToken } from '../services/firebase/fire-auth.service';

interface GetAnimeListDTO {
  page?: number;
  perPage?: number;
  season?: AnimeSeason;
  seasonYear?: number;
  search?: string | null;
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

  private async get<T>(
    url: string,
    headers?: RawAxiosRequestHeaders,
  ): Promise<T> {
    const { data } = await this.instance.get<T>(url, {
      headers: headers,
    });
    return data;
  }

  private async post<T>(
    url: string,
    dataToSend: Object,
    headers?: RawAxiosRequestHeaders,
  ): Promise<T> {
    const { data } = await this.instance.post<T>(url, dataToSend, {
      headers: headers,
    });
    return data;
  }

  async getAnimeList({
    page,
    season,
    seasonYear,
    perPage = 25,
    search = null,
  }: GetAnimeListDTO): Promise<AnimeList> {
    const token = await this.withToken();
    return this.post<AnimeList>(
      '/anime',
      {
        page,
        season,
        seasonYear,
        perPage,
        search,
        dataSource: 'AniList',
      },
      { ...token },
    );
  }

  async getAnimeDetails(id: number): Promise<AnimeDetails> {
    const token = await this.withToken();
    return this.post<AnimeDetails>(
      '/anime/details',
      {
        dataSource: 'AniList',
        sourceId: String(id),
      },
      { ...token },
    );
  }

  async getEpisodes(
    animeName: string,
    expectedEpisodes: number,
  ): Promise<AnimeEpisodes> {
    const token = await this.withToken();
    return this.post<AnimeEpisodes>(
      '/anime/details/episodes',
      {
        animeName: animeName,
        expectedEpisodes: expectedEpisodes,
      },
      { ...token },
    );
  }

  async getEpisodePlayers(
    animeName: string,
    episode: number,
  ): Promise<AnimePlayers> {
    const token = await this.withToken();
    return this.post<AnimePlayers>(
      `/anime/details/episode/${episode}`,
      {
        animeName: animeName,
        resolve: true,
      },
      { ...token },
    );
  }

  async withToken() {
    const token = await fireGetIdToken();
    return {
      Authorization: 'Bearer ' + token,
    };
  }
}
