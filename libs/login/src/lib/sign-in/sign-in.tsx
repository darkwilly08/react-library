import * as PropTypes from 'prop-types';

import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';

import { DwButton } from '@darkwilly08/dw-button';

import { useConfig } from './useConfig';

import styles from '../login.module.scss';

const propTypes = {
  image: PropTypes.string.isRequired,
  logo: PropTypes.string,
  title: PropTypes.string.isRequired,
  onSignIn: PropTypes.func.isRequired,
  onRegister: PropTypes.func.isRequired,
  labels: PropTypes.shape({
    username: PropTypes.string,
    password: PropTypes.string,
    signIn: PropTypes.string,
  }),
};

export type SignInProps = PropTypes.InferProps<typeof propTypes>;

export function SignIn({ image, logo, title, onSignIn, labels, onRegister }: SignInProps) {
  const {
    usernameField,
    passwordField,
    handleUsernameFocus,
    handleUsernameChange,
    handleUsernameBlur,
    handlePasswordChange,
    handlePasswordVisibility,
    passwordVisibility,
  } = useConfig();

  return (
    <div className={styles['login-card']}>
      <div className={styles['login-card__image']}>
        <img src={image} alt="company" />
        {logo && (
          <div className={styles['login-card__image__logo']}>
            <img src={logo} alt="company" />
          </div>
        )}
      </div>
      <form
        className={styles['login-card__form']}
        onSubmit={(e) => {
          e.preventDefault();
          onSignIn(usernameField.value, passwordField.value);
        }}
      >
        <div className="text-h6">{title}</div>
        <div className={styles['login-card__form__fields-container']}>
          <TextField
            value={usernameField.value}
            label={labels?.username}
            onChange={(evt) => handleUsernameChange(evt.target.value)}
            onBlur={(evt) => handleUsernameBlur(evt.target.value)}
            onFocus={handleUsernameFocus}
            variant="filled"
            autoComplete="username"
            error={!!usernameField.error}
            helperText={usernameField.error}
          />
          <TextField
            value={passwordField.value}
            label={labels?.password}
            onChange={(evt) => handlePasswordChange(evt.target.value)}
            type={passwordVisibility ? 'text' : 'password'}
            autoComplete="current-password"
            error={!!passwordField.error}
            helperText={passwordField.error}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <DwButton
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      handlePasswordVisibility(e);
                    }}
                    flat
                    round
                    icon={passwordVisibility ? 'visibility' : 'visibility_off'}
                  />
                </InputAdornment>
              ),
            }}
            variant="filled"
          />
        </div>
        <DwButton type="submit" fullWidth text={labels?.signIn} onClick={(e) => e.preventDefault} />
        <div style={{ display: 'flex', marginTop: '10px', fontSize: '.8rem' }}>
          <span>
            Forgot
            <a href=""> password?</a>
          </span>
          <span style={{ marginLeft: 'auto' }}>
            New user?
            <button
              type="button"
              className={styles['link']}
              style={{ marginLeft: '4px' }}
              onClick={(e) => {
                e.preventDefault();
                onRegister();
              }}
            >
              Register
            </button>
          </span>
        </div>
      </form>
    </div>
  );
}

SignIn.propTypes = propTypes;

SignIn.defaultProps = {
  labels: {
    username: 'Username',
    password: 'Password',
    signIn: 'login',
  },
};
