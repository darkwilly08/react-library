import { Auth } from 'firebase/auth';

export interface AuthUser {
  loggedIn: boolean;
  currentUser: null | object;
  roles: string[];
  token: string | null;
}

export interface AuthContextModel {
  children: React.ReactNode;
  auth: Auth;
  isSSR: boolean;
  apiUrl: string;
}
