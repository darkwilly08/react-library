import { createContext, useContext } from 'react';
import { useCustomAuth } from '../hooks/useAuth';
import { AuthContextModel, AuthUser } from '../models/authUser';

interface AuthModel {
  signIn: (username: string, password: string) => Promise<unknown>;
  signUp: (username: string, password: string) => Promise<unknown>;
  logout: () => Promise<void>;
  authUser: AuthUser;
  ready: boolean;
}

export const AuthContext = createContext<AuthModel>({} as AuthModel);

export function AuthProvider({ children, auth, isSSR, apiUrl }: AuthContextModel) {
  const customAuth = useCustomAuth(auth, isSSR, apiUrl);
  return <AuthContext.Provider value={customAuth}>{children}</AuthContext.Provider>;
}

export const useAuth = (): AuthModel => useContext(AuthContext);
