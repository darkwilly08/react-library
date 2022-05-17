import React from 'react';
import clsx from 'clsx';
import * as PropTypes from 'prop-types';

import styles from './drawer.module.scss';

const propTypes = {
  title: PropTypes.string,
  logo: PropTypes.string,
};

type HeaderProps = PropTypes.InferProps<typeof propTypes>;

const Header = ({ logo, title }: HeaderProps) => {
  return (
    <div className={clsx(styles['drawer__header'])}>
      {logo && <img src={logo} alt="App logo" />}
      <span className="text-subtitle">{title}</span>
    </div>
  );
};

Header.propTypes = propTypes;

export { Header };
