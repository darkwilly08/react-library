import { Auth, ParsedToken } from 'firebase/auth';

export interface AuthUser {
  loggedIn: boolean;
  currentUser: null | object;
  roles: string[];
  claims: ParsedToken | null;
  token: string | null;
}

export interface AuthContextModel {
  children: React.ReactNode;
  auth: Auth;
  isSSR: boolean;
  apiUrl: string;
}
