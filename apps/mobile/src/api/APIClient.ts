import {
  AnimeDetails,
  AnimeEpisodes,
  AnimePlayers,
  AnimeSeason,
  AnimeSource,
  IAnimeListItem,
  IPlayerResponse,
  IResolvePlayerDto,
  IUpdateWatchListEpisode,
  IWatchListSeries,
  Paginate,
  WatchListSeriesEpisode,
  WatchStatus,
} from '@naikamu/shared';
import axios, {
  AxiosHeaders,
  AxiosInstance,
  RawAxiosRequestHeaders,
} from 'axios';
import { default as Config } from 'react-native-config';

import { fireGetIdToken } from '../services/firebase/fire-auth.service';
import { Platform } from 'react-native';

interface GetAnimeListDTO {
  page?: number;
  perPage?: number;
  season?: AnimeSeason;
  seasonYear?: number;
  search?: string | null;
  status?: WatchStatus[];
}

export class APIClient {
  private instance: AxiosInstance;

  constructor() {
    let configUrl = Config.API_URL;

    if (
      configUrl &&
      configUrl.includes('localhost') &&
      Platform.OS === 'android'
    ) {
      configUrl = configUrl.replace('localhost', '10.0.2.2');
    }

    this.instance = axios.create({
      baseURL: configUrl,
      timeout: 2000,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
  }

  private async get<T>(
    url: string,
    headers?: RawAxiosRequestHeaders | AxiosHeaders,
  ): Promise<T> {
    const { data } = await this.instance.get<T>(url, {
      headers: headers,
    });

    return data;
  }

  private async post<T>(
    url: string,
    dataToSend: unknown,
    headers?: RawAxiosRequestHeaders | AxiosHeaders,
  ): Promise<T> {
    const { data } = await this.instance.post<T>(url, dataToSend, {
      headers: headers,
    });

    return data;
  }

  private async patch<T>(
    url: string,
    dataToSend: unknown,
    headers?: RawAxiosRequestHeaders | AxiosHeaders,
  ): Promise<T> {
    const { data } = await this.instance.patch<T>(url, dataToSend, {
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
  }: GetAnimeListDTO): Promise<Paginate<IAnimeListItem[]>> {
    const token = await this.withToken();

    return this.post<Paginate<IAnimeListItem[]>>(
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

  async getAnimeDetails(
    id: number | string,
    dataSource: AnimeSource,
  ): Promise<AnimeDetails> {
    const token = await this.withToken();

    return this.post<AnimeDetails>(
      '/anime/details',
      {
        dataSource: dataSource,
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
        id,
        expectedEpisodes,
      },
      { ...token },
    );
  }

  async getEpisodePlayers(id: string, episode: number): Promise<AnimePlayers> {
    const token = await this.withToken();

    return this.post<AnimePlayers>(
      `/anime/details/episode/${episode}`,
      {
        id: id,
      },
      { ...token },
    );
  }

  async getUserWatchList({
    page,
    perPage = 25,
    search = null,
    status,
  }: GetAnimeListDTO): Promise<Paginate<IWatchListSeries[]>> {
    const token = await this.withToken();

    return this.post<Paginate<IWatchListSeries[]>>(
      'user/watch-list',
      {
        page,
        perPage,
        search,
        dataSource: 'AniList',
        status,
      },
      { ...token },
    );
  }

  async getUserWatchListSeries(animeId: string) {
    return this.get<IWatchListSeries>(`user/watch-list/${animeId}`, {
      ...(await this.withToken()),
    });
  }

  async updateUserSeriesWatchList(animeId: string, status: WatchStatus) {
    return this.post<IWatchListSeries>(
      `user/watch-list/${animeId}`,
      {
        status,
      },
      {
        ...(await this.withToken()),
      },
    );
  }

  async updateUserSeriesWatchProgress(
    animeId: string,
    episode: number,
    dto: IUpdateWatchListEpisode,
  ) {
    return this.post<WatchListSeriesEpisode>(
      `user/watch-list/${animeId}/${episode}`,
      dto,
      {
        ...(await this.withToken()),
      },
    );
  }

  async resolvePlayer(dto: IResolvePlayerDto) {
    return this.post<IPlayerResponse>(
      `anime/details/episode/${dto.episode}/player`,
      dto,
      {
        ...(await this.withToken()),
      },
    );
  }

  async saveNotificationToken(token: string) {
    const apiToken = await this.withToken();

    return this.patch('user', { notificationToken: token }, apiToken);
  }

  async checkForUpdates() {
    const response = await axios.get<{
      tag_name: string;
      assets: {
        name: string;
        browser_download_url: string;
      }[];
    }>('https://api.github.com/repos/fezmlg/naikamu/releases/latest');

    return response.data;
  }

  async withToken() {
    const token = await fireGetIdToken();

    return {
      Authorization: 'Bearer ' + token,
    };
  }
}

export const apiClient = new APIClient();
