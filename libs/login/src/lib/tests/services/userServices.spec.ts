import { signIn, fetchProfile } from '../../services/userService';
import mockServer from '../../mocks/userServiceMock';
import { AxiosError } from 'axios';

describe('Auth internal api', () => {
  beforeAll(() => {
    mockServer.start();
  });

  afterAll(() => {
    mockServer.restore();
  });

  it('login with valid credentials', async () => {
    const response = await signIn('testUser', 'testUser');
    expect(response.status).toBe(200);
    expect(response.data.customToken).toBe('mocked-token');
  });

  it('login failed with invalid credentials', async () => {
    try {
      await signIn('notValid', 'notValid');
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

  it('fetch user profile should works', async () => {
    const authToken = 'authToken';
    const response = await fetchProfile(authToken);
    expect(response.status).toBe(200);
    expect(response.data).toStrictEqual({
      username: 'testUser',
      email: 'test@test.com',
      firstname: 'FirstName',
      lastname: 'LastName',
    });
  });
});
