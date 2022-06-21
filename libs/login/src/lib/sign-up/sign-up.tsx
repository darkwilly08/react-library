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
  onSignUp: PropTypes.func.isRequired,
  onLogin: PropTypes.func.isRequired,
  labels: PropTypes.shape({
    username: PropTypes.string,
    password: PropTypes.string,
    confirmPassword: PropTypes.string,
    signUp: PropTypes.string,
  }),
};

export type SignUpProps = PropTypes.InferProps<typeof propTypes>;

export function SignUp({ image, logo, title, onSignUp, labels, onLogin }: SignUpProps) {
  const {
    usernameField,
    passwordField,
    confirmPasswordField,
    handleUsernameFocus,
    handleUsernameChange,
    handleUsernameBlur,
    handlePasswordChange,
    handlePasswordVisibility,
    handleConfirmPasswordChange,
    passwordVisibility,
    validateAll,
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

          if (!validateAll()) {
            return;
          }

          onSignUp(usernameField.value, passwordField.value);
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
                    onClick={handlePasswordVisibility}
                    flat
                    round
                    icon={passwordVisibility ? 'visibility' : 'visibility_off'}
                  />
                </InputAdornment>
              ),
            }}
            variant="filled"
          />
          <TextField
            value={confirmPasswordField.value}
            label={labels?.confirmPassword}
            onChange={(evt) => handleConfirmPasswordChange(evt.target.value)}
            type={passwordVisibility ? 'text' : 'password'}
            autoComplete="current-password"
            error={!!confirmPasswordField.error}
            helperText={confirmPasswordField.error}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <DwButton
                    type="button"
                    onClick={handlePasswordVisibility}
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
        <DwButton type="submit" fullWidth text={labels?.signUp} onClick={() => null} />
        <div style={{ display: 'flex', marginTop: '10px', fontSize: '.8rem' }}>
          <span style={{ marginLeft: 'auto' }}>
            Have account?
            <button
              type="button"
              className={styles['link']}
              style={{ marginLeft: '4px' }}
              onClick={(e) => {
                e.preventDefault();
                onLogin();
              }}
            >
              SignIn
            </button>
          </span>
        </div>
      </form>
    </div>
  );
}

SignUp.propTypes = propTypes;

SignUp.defaultProps = {
  labels: {
    username: 'Username',
    password: 'Password',
    confirmPassword: 'Confirm Password',
    signUp: 'create account',
  },
};
