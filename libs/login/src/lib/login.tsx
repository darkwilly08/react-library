import * as PropTypes from 'prop-types';

import { useSprings, animated } from 'react-spring';

import { SignIn } from './sign-in';
import { SignUp } from './sign-up';

import styles from './login.module.scss';

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
  const hiddenProps = {
    scale: 0.9,
    opacity: 0,
    display: 'none',
    delay: (key: string) => (['display'].includes(key) ? 300 : 0),
  };

  const visibleProps = {
    scale: 1,
    left: `0%`,
    opacity: 1,
    display: 'block',
    delay: 0,
  };

  const handleOnRegister = () => {
    api.start((i) => {
      if (i === 0)
        return {
          ...hiddenProps,
          left: '100%',
        };

      return visibleProps;
    });
  };

  const handleOnLogin = () => {
    api.start((i) => {
      if (i === 1)
        return {
          ...hiddenProps,
          left: '-100%',
        };

      return visibleProps;
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
    left: i === 0 ? '0%' : `-100%`,
    scale: i === 0 ? visibleProps.scale : hiddenProps.scale,
    opacity: i === 0 ? visibleProps.opacity : hiddenProps.opacity,
    display: i === 0 ? visibleProps.display : hiddenProps.display,
    config: { duration: 300 },
  }));

  // TODO: validate errors before callbacks
  return (
    <div className={styles['wrapper']}>
      {props.map(({ left, scale, opacity, display }, i) => (
        <animated.div className={styles['container']} key={i} style={{ display, x: left, scale, opacity }}>
          {pages[i]}
        </animated.div>
      ))}
    </div>
  );
}

Login.propTypes = propTypes;
