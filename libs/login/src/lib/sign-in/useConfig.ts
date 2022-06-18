import { useState, MouseEvent } from 'react';
import { Field } from '../models/field';

export const useConfig = () => {
  const [usernameField, setUsername] = useState<Field>({
    value: '',
    error: null,
  });
  const [passwordField, setPassword] = useState<Field>({
    value: '',
    error: null,
  });

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

  const [passwordVisibility, setPasswordVisibility] = useState(false);

  const handlePasswordVisibility = (e: MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    setPasswordVisibility((prevValue) => !prevValue);
  };

  const handlePasswordChange = (value: string) => {
    setPassword({
      value,
      error: passwordValidator(value),
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

  const handleUsernameFocus = () => {
    setUsername((prevState) => {
      return {
        value: prevState.value,
        error: null,
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

  return {
    passwordVisibility,
    handlePasswordVisibility,
    handlePasswordChange,
    handleUsernameBlur,
    handleUsernameChange,
    handleUsernameFocus,
    usernameField,
    passwordField,
  };
};
