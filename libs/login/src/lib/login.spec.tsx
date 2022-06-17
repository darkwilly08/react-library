import { render } from '@testing-library/react';

import { Login, LoginProps } from './login';

describe('Login', () => {
  let loginProps: LoginProps;
  beforeEach(() => {
    loginProps = {
      title: 'Example App',
      onLogin: jest.fn(),
      image: 'https://dummy.com',
    };
  });
  it('should render successfully', () => {
    const { container } = render(
      <Login title={loginProps.title} onLogin={loginProps.onLogin} image={loginProps.image} />,
    );
    expect(container).toMatchSnapshot();
  });
});
