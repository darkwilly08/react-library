import Ripples from 'react-ripples';
import clsx from 'clsx';

import { IconWrapper } from '@darkwilly08/icon-wrapper';

import './styles/Button.scss';

const Button = ({ text, icon, rightIcon, flat, color, textColor, onClick, round }) => {
  const rootClass = 'ripple-button';
  const style = {
    color: textColor ?? null,
    backgroundColor: color ?? null,
  };
  return (
    <Ripples className={clsx(!flat && rootClass, round && `${rootClass}--round`)} onClick={onClick}>
      <button
        className={clsx(
          `${rootClass}__button`,
          flat && `${rootClass}__button--flat`,
          round && `${rootClass}__button--round`,
        )}
        style={style}
      >
        {icon && (
          <IconWrapper
            name={icon}
            className={clsx(`${rootClass}__button__left-icon`, round && `${rootClass}__button__left-icon--round`)}
          />
        )}
        {!round && <div className="button__text">{text}</div>}
        {!round && rightIcon && <IconWrapper name={rightIcon} className="button__right-icon" />}
      </button>
    </Ripples>
  );
};

export { Button };
