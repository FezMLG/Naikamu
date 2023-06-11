import axios, { AxiosInstance, AxiosRequestHeaders } from 'axios';
import {
  AnimeList,
  AnimeDetails,
  AnimeEpisodes,
  AnimePlayers,
  AnimeSeason,
  WatchList,
  WatchListSeriesEpisode,
  WatchListSeries,
} from '@aniwatch/shared';
import Config from 'react-native-config';
import { fireGetIdToken } from '../services/firebase/fire-auth.service';
import { Resolution } from '../services/store/reducers/interfaces';

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
      baseURL: Config.API_URL,
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

  async getApiHealth(): Promise<{
    status: number;
    message: string;
    version: string;
  }> {
    return this.get<{
      status: number;
      message: string;
      version: string;
    }>('/health');
  }

  async getApiVersion(): Promise<{
    version: string;
  }> {
    return this.get<{
      version: string;
    }>('/version');
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
    id: string,
    expectedEpisodes: number,
  ): Promise<AnimeEpisodes> {
    const token = await this.withToken();
    return this.post<AnimeEpisodes>(
      '/anime/details/episodes',
      {
        id: id,
        expectedEpisodes: expectedEpisodes,
      },
      { ...token },
    );
  }

  async getEpisodePlayers(
    id: string,
    episode: number,
    resolution: Resolution,
  ): Promise<AnimePlayers> {
    const token = await this.withToken();
    return this.post<AnimePlayers>(
      `/anime/details/episode/${episode}`,
      {
        id: id,
        resolve: true,
        resolution: resolution,
      },
      { ...token },
    );
  }

  async getUserWatchList() {
    return this.get<WatchList>('user/watch-list', {
      ...(await this.withToken()),
    });
  }

  async getUserWatchListSeries(animeId: string) {
    return this.get<WatchListSeries>(`user/watch-list/${animeId}`, {
      ...(await this.withToken()),
    });
  }

  async updateUserSeriesWatchList(animeId: string) {
    return this.post<WatchListSeries>(
      `user/watch-list/${animeId}`,
      {},
      {
        ...(await this.withToken()),
      },
    );
  }

  async updateUserSeriesWatchProgress(animeId: string, episode: number) {
    return this.post<WatchListSeriesEpisode>(
      `user/watch-list/${animeId}/${episode}`,
      {},
      {
        ...(await this.withToken()),
      },
    );
  }

  async withToken() {
    const token = await fireGetIdToken();
    return {
      Authorization: 'Bearer ' + token,
    };
  }
}
