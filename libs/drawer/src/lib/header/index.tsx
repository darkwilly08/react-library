import { useContext } from 'react';
import clsx from 'clsx';

import styles from './styles/header.module.scss';
import { DrawerContext } from '../contexts';

const Header = () => {
  const drawerContext = useContext(DrawerContext);
  return (
    <div className={clsx(styles['header'])}>
      {drawerContext.logo && <img src={drawerContext.logo} alt="App logo" />}
      <span className="text-subtitle">{drawerContext.title}</span>
    </div>
  );
};

export { Header };
