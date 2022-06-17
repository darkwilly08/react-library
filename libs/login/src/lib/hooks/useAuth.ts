import { useState, useReducer, useEffect } from 'react';

import { onIdTokenChanged, onAuthStateChanged, ParsedToken, User, signInWithCustomToken, Auth } from 'firebase/auth';

import { AuthService } from '../services/userService';
import { AuthUser } from '../models/authUser';

const extractRolesFromClaims = (claims: ParsedToken) => {
  return Object.entries(claims)
    .map(([k]) => k)
    .filter((o) => o.endsWith('ROLE'));
};

const setCookie = (cname: string, cvalue: string, exMins: number) => {
  const d = new Date();
  d.setTime(d.getTime() + exMins * 60 * 1000);
  const expires = 'expires=' + d.toUTCString();
  document.cookie = cname + '=' + cvalue + ';' + expires + ';' + ';path=/';
};

export const tokenCookie = 'authToken';

enum AuthActionEnum {
  CLEAR = 'clear',
  SET_TOKEN = 'set_token',
  SET_USER = 'set_user',
}

interface AuthAction {
  type: AuthActionEnum;
  payload?: Partial<AuthUser>;
}

const initialState: AuthUser = {
  loggedIn: false,
  currentUser: null,
  roles: [],
  token: null,
};

const authReducer = (state: AuthUser, action: AuthAction): AuthUser => {
  const { type, payload } = action;
  switch (type) {
    case AuthActionEnum.CLEAR:
      return initialState;
    case AuthActionEnum.SET_TOKEN:
      return {
        ...state,
        token: payload!.token!,
      };
    case AuthActionEnum.SET_USER:
      return {
        loggedIn: payload!.loggedIn!,
        token: payload!.token!,
        roles: payload!.roles!,
        currentUser: payload!.currentUser!,
      };
    default:
      return state;
  }
};

export function useCustomAuth(auth: Auth, isSSR: boolean, apiUrl: string) {
  const [authUser, dispatch] = useReducer(authReducer, initialState);
  const [ready, setReady] = useState(false);

  const login = async (username: string, password: string) => {
    return new Promise<void>((resolve, reject) => {
      new AuthService(apiUrl)
        .signIn(username, password)
        .then((res) => {
          const customToken = res.data.customToken;
          signInWithCustomToken(auth, customToken)
            .then(() => resolve())
            .catch(reject);
        })
        .catch(reject);
    });
  };

  const logout = async () => {
    await auth.signOut();
  };

  const authStateChanged = async (user: User | null) => {
    if (user) {
      const tokenObject = await user.getIdTokenResult();
      const roles = extractRolesFromClaims(tokenObject.claims);
      const token = tokenObject.token;
      const loggedIn = true;
      const userProfile = await (await new AuthService(apiUrl).fetchProfile(token)).data;
      dispatch({
        type: AuthActionEnum.SET_USER,
        payload: { token, loggedIn, roles, currentUser: userProfile },
      });
    } else {
      dispatch({
        type: AuthActionEnum.CLEAR,
      });
    }

    setReady(true);
  };

  const idTokenChanged = async (user: User | null) => {
    if (!user) {
      if (isSSR) setCookie(tokenCookie, '', 0);

      return;
    }

    const token = await user.getIdToken();
    dispatch({
      type: AuthActionEnum.SET_TOKEN,
      payload: { token },
    });

    if (isSSR) setCookie(tokenCookie, token, 60);
  };

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, authStateChanged);
    const unsubscribeToken = onIdTokenChanged(auth, idTokenChanged);
    return () => {
      unsubscribeAuth();
      unsubscribeToken();
    };
  }, []);

  return {
    authUser,
    login,
    logout,
    ready,
  };
}
