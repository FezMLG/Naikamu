import axios, { AxiosInstance } from 'axios';

export class RestClient {
  private instance: AxiosInstance;

  constructor(private baseUrl: string) {
    this.instance = axios.create({
      baseURL: this.baseUrl,
      timeout: 2000,
      headers: {
        Accept: 'application/json',
      },
    });
  }

  async get<T>(): Promise<T> {
    const { data } = await this.instance.get<T>(this.baseUrl);
    return data;
  }

  async post<T>(dataToSend: Object): Promise<T> {
    const { data } = await this.instance.post<T>(this.baseUrl, dataToSend);
    return data;
  }
}
