import axios, { AxiosInstance } from 'axios';

export class AuthService {
  private baseUrl: string;
  private authAxios: AxiosInstance;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
    this.authAxios = axios.create({
      timeout: 8000,
      headers: {
        'Content-Type': 'application/json',
      },
      baseURL: this.baseUrl,
    });
  }

  public async fetchProfile(token: string) {
    return this.authAxios.get('/me', {
      headers: {
        AUTH: token,
      },
    });
  }

  public async signIn(username: string, password: string) {
    return this.authAxios.post('/login', { username, password });
  }

  public async signUp(username: string, password: string) {
    return this.authAxios.post('/register', { username, password });
  }
}
