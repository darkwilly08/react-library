import * as PropTypes from 'prop-types';

import { useSprings, animated } from 'react-spring';

import { SignIn } from './sign-in';
import { SignUp } from './sign-up';

const propTypes = {
  title: PropTypes.string.isRequired,
  signIn: PropTypes.shape({
    onSignIn: PropTypes.func.isRequired,
    image: PropTypes.string.isRequired,
    logo: PropTypes.string,
    labels: PropTypes.shape({
      username: PropTypes.string,
      password: PropTypes.string,
      signIn: PropTypes.string,
    }),
  }).isRequired,
  signUp: PropTypes.shape({
    onSignUp: PropTypes.func.isRequired,
    image: PropTypes.string.isRequired,
    logo: PropTypes.string,
    labels: PropTypes.shape({
      username: PropTypes.string,
      password: PropTypes.string,
      confirmPassword: PropTypes.string,
      signUp: PropTypes.string,
    }),
  }).isRequired,
};

export type LoginProps = PropTypes.InferProps<typeof propTypes>;

export function Login({ title, signIn, signUp }: LoginProps) {
  const width = window.innerWidth;
  const handleOnRegister = () => {
    api.start((i) => {
      if (i === 0)
        return {
          scale: 0.9,
          x: `${window.innerWidth}px`,
          opacity: 0,
          visibility: 'hidden',
          delay: (key) => (['visibility'].includes(key) ? 300 : 0),
        };
      const x = '0px';
      const scale = 1;
      return {
        x,
        scale,
        opacity: 1,
        visibility: 'visible',
        delay: 0,
      };
    });
  };

  const handleOnLogin = () => {
    api.start((i) => {
      if (i === 1)
        return {
          scale: 0.9,
          x: `${-1 * window.innerWidth}px`,
          opacity: 0,
          visibility: 'hidden',
          delay: (key) => (['visibility'].includes(key) ? 300 : 0),
        };
      const x = '0px';
      const scale = 1;
      return {
        x,
        scale,
        opacity: 1,
        visibility: 'visible',
        delay: 0,
      };
    });
  };

  const pages = [
    <SignIn
      title={title}
      image={signIn.image}
      logo={signIn.logo}
      onSignIn={signIn.onSignIn}
      onRegister={handleOnRegister}
    />,
    <SignUp title={title} image={signUp.image} logo={signUp.logo} onSignUp={signUp.onSignUp} onLogin={handleOnLogin} />,
  ];

  const [props, api] = useSprings(pages.length, (i) => ({
    x: i === 0 ? '0px' : `${-width}px`,
    scale: 1,
    opacity: i === 0 ? 1 : 0,
    visibility: i === 0 ? 'visible' : 'hidden',
    config: { duration: 300 },
  }));

  return (
    <main>
      {props.map(({ x, scale, opacity, visibility }, i) => (
        <animated.div key={i} style={{ translateX: x, scale, opacity, visibility: visibility as any }}>
          {pages[i]}
        </animated.div>
      ))}
    </main>
  );
}

Login.propTypes = propTypes;
