import * as PropTypes from 'prop-types';

import { Button } from '@darkwilly08-nx/button';

import styles from './app-bar.module.scss';

const propTypes = {
  onClick: PropTypes.func.isRequired,
};

type AppBarProps = PropTypes.InferProps<typeof propTypes>;

const AppBar = ({ onClick }: AppBarProps) => {
  const rootClass = 'app-bar';
  return (
    <div className={styles[rootClass]}>
      <Button icon="menu" round flat onClick={onClick} />
      <div className={`${styles['app-bar__title']} text-h6`}>title</div>
      <div className={`${styles[`${rootClass}__right`]} text-subtitle`}>test</div>
    </div>
  );
};

AppBar.propTypes = propTypes;

AppBar.defaultProps = {
  onClick: () => null,
};

export { AppBar };
