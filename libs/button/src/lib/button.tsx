import clsx from 'clsx';
import * as PropTypes from 'prop-types';
import Ripples from 'react-ripples';

import { IconWrapper } from '@darkwilly08/icon-wrapper';

import styles from './button.module.scss';
import { CSSProperties } from 'react';

const propTypes = {
  text: PropTypes.string,
  icon: PropTypes.string,
  rightIcon: PropTypes.string,
  flat: PropTypes.bool,
  color: PropTypes.string,
  textColor: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  round: PropTypes.bool,
};

type ButtonProps = PropTypes.InferProps<typeof propTypes>;

export function Button({ text, icon, rightIcon, flat, color, textColor, onClick, round }: ButtonProps) {
  const rootClass = 'ripple-button';
  const style: CSSProperties = {
    color: textColor ?? undefined,
    backgroundColor: color ?? undefined,
  };
  return (
    <Ripples className={clsx(!flat && styles[rootClass], round && styles[`${rootClass}--round`])} onClick={onClick}>
      <button
        className={clsx(
          styles[`${rootClass}__button`],
          flat && styles[`${rootClass}__button--flat`],
          round && styles[`${rootClass}__button--round`],
        )}
        style={style}
      >
        {icon && (
          <IconWrapper
            name={icon}
            className={clsx(
              styles[`${rootClass}__button__left-icon`],
              round && styles[`${rootClass}__button__left-icon--round`],
            )}
          />
        )}
        {!round && <div>{text}</div>}
        {!round && rightIcon && <IconWrapper name={rightIcon} className={styles[`${rootClass}__button__right-icon`]} />}
      </button>
    </Ripples>
  );
}

Button.propTypes = propTypes;

Button.defaultProps = {
  text: '',
  flat: false,
  round: false,
};
