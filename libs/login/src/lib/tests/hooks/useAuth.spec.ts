import { cleanup, renderHook, act } from '@testing-library/react-hooks';
import { AxiosError } from 'axios';
import { useCustomAuth } from '../../hooks/useAuth';
import mockServer from '../../mocks/userServiceMock';

import { IdTokenResult, ParsedToken, User } from 'firebase/auth';

let mockAuthStateChanged: (user: User | null) => Promise<void>;
let mockIdTokenChanged: (user: User | null) => Promise<void>;
const mockSignOut = jest.fn();
const mockSignInWithCustomToken = jest.fn((auth, accessToken) => Promise.resolve());

jest.mock('firebase/auth', () => ({
  ...jest.requireActual('firebase/auth'),
  getAuth: jest.fn().mockImplementation(() => ({
    signOut: jest.fn(() => mockSignOut()),
  })),
  onAuthStateChanged: jest.fn((auth, authStateChanged: (user: User | null) => Promise<void>) => {
    mockAuthStateChanged = authStateChanged;
  }),
  onIdTokenChanged: jest.fn((auth, idTokenChanged) => {
    mockIdTokenChanged = idTokenChanged;
  }),
  signInWithCustomToken: jest.fn((auth, accessToken) => mockSignInWithCustomToken(auth, accessToken)),
}));

describe('useAuth', () => {
  let mockLoggedUser: User;

  beforeEach(() => {
    mockLoggedUser = {
      emailVerified: true,
      isAnonymous: false,
      metadata: {
        creationTime: 'Sun, 03 Jun 2018 04:20:41 GMT',
        lastSignInTime: 'Wed, 08 Jun 2022 22:20:24 GMT',
      },
      refreshToken: 'refreshToken',
      providerData: [],
      tenantId: null,
      delete: function (): Promise<void> {
        throw new Error('Function not implemented.');
      },
      getIdToken: function (forceRefresh?: boolean): Promise<string> {
        return Promise.resolve('authToken');
      },
      getIdTokenResult: function (forceRefresh?: boolean): Promise<IdTokenResult> {
        const claims: ParsedToken = {
          aud: 'fake-project',
          email: 'test@test.com',
          iss: 'https://securetoken.google.com/fake-project',
          sub: '5xMPzvKVuoh9HopNkGveSNLBjCu1',
          user_id: '5xMPzvKVuoh9HopNkGveSNLBjCu1',
          ADMIN_ROLE: 'true',
        };

        return Promise.resolve({
          claims,
          authTime: 'Wed, 08 Jun 2022 22:20:29 GMT',
          expirationTime: 'Wed, 08 Jun 2022 23:20:29 GMT',
          issuedAtTime: 'Wed, 08 Jun 2022 22:20:29 GMT',
          signInProvider: 'password',
          signInSecondFactor: 'mobile',
          token: 'authToken',
        });
      },
      reload: function (): Promise<void> {
        throw new Error('Function not implemented.');
      },
      toJSON: function (): object {
        throw new Error('Function not implemented.');
      },
      displayName: null,
      email: 'test@test.com',
      phoneNumber: null,
      photoURL: null,
      providerId: '',
      uid: '5xMPzvKVuoh9HopNkGveSNLBjCu1',
    };
  });

  beforeAll(() => {
    mockServer.start();
  });

  afterAll(() => {
    mockServer.restore();
    jest.restoreAllMocks();
  });
  afterEach(() => {
    cleanup();
  });

  test('should login when user is valid', async () => {
    const { result } = renderHook(() => useCustomAuth());

    await result.current.login('testUser', 'testUser');

    // Simulates firebase event due to auth state was updated
    await act(async () => mockAuthStateChanged(mockLoggedUser));

    expect(mockSignInWithCustomToken).toHaveBeenCalledWith(expect.anything(), 'mocked-token');

    expect(result.current.ready).toBeTruthy();

    expect(result.current.authUser).toStrictEqual({
      loggedIn: true,
      token: 'authToken',
      roles: ['ADMIN_ROLE'],
      currentUser: {
        username: 'testUser',
        email: 'test@test.com',
        firstname: 'FirstName',
        lastname: 'LastName',
      },
    });
  });

  test('should throw error when user is not valid', async () => {
    const { result } = renderHook(() => useCustomAuth());

    try {
      await result.current.login('notValid', 'notValid');
      fail('must throw');
    } catch (err) {
      const error = err as AxiosError;
      expect(error.message).toBe('Request failed with status code 401');
      expect(error.response?.status).toStrictEqual(401);
      expect(error.response?.data).toStrictEqual({
        error: 'Unauthorized',
        message: 'user or password is not valid',
        status: 401,
      });
    }
  });

  test('should logout user when is loggedIn', async () => {
    const { result } = renderHook(() => useCustomAuth());

    await result.current.logout();

    // Simulates firebase event due to auth state was updated
    await act(async () => mockAuthStateChanged(null));

    expect(mockSignOut).toBeCalled();

    expect(result.current.authUser).toStrictEqual({
      loggedIn: false,
      currentUser: null,
      roles: [],
      token: null,
    });
  });

  test('should update token when token changes', async () => {
    const { result } = renderHook(() => useCustomAuth());

    mockLoggedUser.getIdToken = function (forceRefresh?: boolean): Promise<string> {
      return Promise.resolve('newToken');
    };
    // Simulates token refresh
    await act(async () => mockIdTokenChanged(mockLoggedUser));

    expect(result.current.authUser.token).toBe('newToken');
  });

  test('should ignore update when user is null', async () => {
    const { result } = renderHook(() => useCustomAuth());

    // Simulates token refresh
    await act(async () => mockIdTokenChanged(null));

    expect(result.current.authUser.token).toBe(null); // Remains default value
  });
});
