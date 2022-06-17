import MockAdapter from 'axios-mock-adapter';
import { authAxios } from '../services/userService';

let userServiceMock: MockAdapter;

const start = () => {
  userServiceMock = new MockAdapter(authAxios);

  userServiceMock.onPost('/login', { username: 'testUser', password: 'testUser' }).reply(200, {
    customToken: 'mocked-token',
  });

  userServiceMock.onPost('/login', { username: 'notValid', password: 'notValid' }).reply(401, {
    error: 'Unauthorized',
    message: 'user or password is not valid',
    status: 401,
  });

  userServiceMock
    .onGet('/me', undefined, {
      asymmetricMatch: (headers: Record<string, string>) => headers['AUTH'] === 'authToken',
    })
    .reply(200, {
      username: 'testUser',
      email: 'test@test.com',
      firstname: 'FirstName',
      lastname: 'LastName',
    });
};

const restore = () => userServiceMock.restore();

export default { start, restore };
