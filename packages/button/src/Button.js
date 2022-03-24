import Ripples from 'react-ripples';
import clsx from 'clsx';

import { IconWrapper } from '@darkwilly08/icon-wrapper';

import './styles/Button.scss';

const Button = ({ text, leftIcon, rightIcon, flat, color, textColor, onClick }) => {
  const style = {
    color: textColor ?? null,
    backgroundColor: color ?? null,
  };
  return (
    <Ripples className={clsx(!flat && 'shadow')} onClick={onClick}>
      <button className={clsx('button', flat && 'button--flat')} style={style}>
        {leftIcon && <IconWrapper name={leftIcon} className="button__left-icon" />}
        <div className="button__text">{text}</div>
        {rightIcon && <IconWrapper name={rightIcon} className="button__right-icon" />}
      </button>
    </Ripples>
  );
};

export { Button };
