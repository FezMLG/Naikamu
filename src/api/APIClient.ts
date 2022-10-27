import axios, { AxiosInstance, AxiosRequestHeaders } from 'axios';
import { AnimeSeason } from '../enums/anime-season.enum';
import {
  AnimeList,
  AnimeDetails,
  AnimeEpisodes,
  AnimePlayers,
} from '../interfaces';
import { makeRouteFromTitle } from '../utils';
import { API_URL } from '@env';
import { retrieveTokensFromStorage } from '../services/auth-storage.service';

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

  private async get<T>(url: string, headers?: AxiosRequestHeaders): Promise<T> {
    const { data } = await this.instance.get<T>(url, {
      headers: headers,
    });
    return data;
  }

  private async post<T>(
    url: string,
    dataToSend: Object,
    headers?: AxiosRequestHeaders,
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
  }: GetAnimeListDTO): Promise<AnimeList> {
    const token = await this.withToken();
    return this.get<AnimeList>(
      `/anime?per-page=${perPage}&page=${page}&season=${season}&season-year=${seasonYear}`,
      { ...token },
    );
  }

  async getAnimeDetails(animeName: string, id: number): Promise<AnimeDetails> {
    const token = await this.withToken();
    return this.get<AnimeDetails>(
      `/anime/${makeRouteFromTitle(animeName)}?source=anilist&id=${id}`,
      { ...token },
    );
  }

  async getEpisodes(
    animeName: string,
    expectedEpisodes: number,
  ): Promise<AnimeEpisodes> {
    const token = await this.withToken();
    return this.post<AnimeEpisodes>(
      `/anime/${makeRouteFromTitle(animeName)}/episodes`,
      {
        expected_episodes: expectedEpisodes,
      },
      { ...token },
    );
  }

  async getEpisodePlayers(
    animeName: string,
    episode: number,
  ): Promise<AnimePlayers> {
    const token = await this.withToken();
    return this.get<AnimePlayers>(
      `/anime/${makeRouteFromTitle(animeName)}/episode/${episode}?resolve=true`,
      { ...token },
    );
  }

  async withToken() {
    const token = await retrieveTokensFromStorage();
    return {
      Authorization: 'Bearer ' + token,
    };
  }
}
