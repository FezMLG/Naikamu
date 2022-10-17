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

  async get<T>(url: string): Promise<T> {
    const { data } = await this.instance.get<T>(this.baseUrl + url);
    return data;
  }

  async post<T>(url: string, dataToSend: Object): Promise<T> {
    const { data } = await this.instance.post<T>(
      this.baseUrl + url,
      dataToSend,
    );
    return data;
  }
}
