/* eslint-disable @typescript-eslint/no-non-null-assertion */
import styles from './login.module.scss';
import * as PropTypes from 'prop-types';

import { DwButton } from '@darkwilly08/dw-button';

import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import { useState } from 'react';

import { MouseEvent } from 'react';

const propTypes = {
  image: PropTypes.string.isRequired,
  logo: PropTypes.string,
  title: PropTypes.string,
  onLogin: PropTypes.func.isRequired,
  labels: PropTypes.shape({
    username: PropTypes.string,
    password: PropTypes.string,
    login: PropTypes.string,
  }),
};

export type LoginProps = PropTypes.InferProps<typeof propTypes>;

interface Field {
  value: string;
  error: string | null;
}

export function Login({ image, logo, title, onLogin, labels }: LoginProps) {
  const [username, setUsername] = useState<Field>({
    value: '',
    error: null,
  });
  const [password, setPassword] = useState<Field>({
    value: '',
    error: null,
  });
  const [passwordVisibility, setPasswordVisibility] = useState(false);

  const usernameValidator = (value: string) => {
    if (!value) {
      return 'This field is mandatory';
    }

    const usernameLength = 6;
    const patterNoSpaces = '^\\S*$';

    if (value.length < usernameLength) {
      return `Ingrese al menos ${usernameLength} caracteres`;
    } else if (!new RegExp(patterNoSpaces).test(value)) {
      return 'Remueva los espacios en blanco';
    }

    return null;
  };

  const passwordValidator = (value: string) => {
    if (!value) {
      return 'This field is mandatory';
    }

    const passwordLength = 8;
    const patternAtleasUpperCase = '^(.*[A-Z].*)$';
    const patternAtleastDigit = '^(.*[0-9].*)$';

    if (value.length < passwordLength) {
      return `Ingrese al menos ${passwordLength} caracteres`;
    } else if (!new RegExp(patternAtleastDigit).test(value)) {
      return 'Ingrese al menos un dígito';
    } else if (!new RegExp(patternAtleasUpperCase).test(value)) {
      return 'Ingrese al menos una mayúscula';
    }

    return null;
  };

  const handlePasswordVisibility = (e: MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    setPasswordVisibility((prevValue) => !prevValue);
  };

  const handlePasswordChange = (value: string) => {
    console.log('onpasswordchangr', value);
    setPassword({
      value,
      error: passwordValidator(value),
    });
  };

  const handleUsernameFocus = () => {
    setUsername((prevState) => {
      return {
        value: prevState.value,
        error: null,
      };
    });
  };
  const handleUsernameBlur = (value: string) => {
    setUsername((prevState) => {
      return {
        value: prevState.value,
        error: usernameValidator(value),
      };
    });
  };
  const handleUsernameChange = (value: string) => {
    setUsername((prevState) => {
      return {
        value,
        error: prevState.error,
      };
    });
  };

  return (
    <div className={styles['container']}>
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
            onLogin(username.value, password.value);
          }}
        >
          <div className="text-h6">{title}</div>
          <div className={styles['login-card__form__fields-container']}>
            <TextField
              value={username.value}
              label={labels?.username}
              onChange={(evt) => handleUsernameChange(evt.target.value)}
              onBlur={(evt) => handleUsernameBlur(evt.target.value)}
              onFocus={handleUsernameFocus}
              variant="filled"
              autoComplete="username"
              error={!!username.error}
              helperText={username.error}
            />
            <TextField
              value={password.value}
              label={labels?.password}
              onChange={(evt) => handlePasswordChange(evt.target.value)}
              type={passwordVisibility ? 'text' : 'password'}
              autoComplete="current-password"
              error={!!password.error}
              helperText={password.error}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <DwButton
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
          <DwButton fullWidth text={labels?.login} onClick={() => null} />
        </form>
      </div>
    </div>
  );
}

Login.propTypes = propTypes;

Login.defaultProps = {
  image: 'https://dummyimage.com/700x350/000/fff',
  logo: 'https://dummyimage.com/60x60/d6a3d6/000000',
  title: 'App name',
  labels: {
    username: 'Username',
    password: 'Password',
    login: 'login',
  },
};
