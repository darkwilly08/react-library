import clsx from 'clsx';
import { useRef } from 'react';

import { AppBar, AppBarProps } from '@darkwilly08/app-bar';
import { Drawer, RefDrawer, DrawerItem } from '@darkwilly08/drawer';

import styles from './styles/DefaultLayout.module.scss';

interface DefaultLayoutProps {
  className?: string;
  children: JSX.Element;
  items: DrawerItem[];
  appBar: Omit<AppBarProps, 'onClick'> ;
}

const DefaultLayout = ({ className, children, items, appBar }: DefaultLayoutProps) => {
  const rootClass = 'default-layout';
  const drawerRef = useRef<RefDrawer>(null);

  const onAppBarIcon = () => {
    if (drawerRef.current) {
      drawerRef.current.toggleVisibility();
    }
  };

  return (
    <div className={clsx(styles[rootClass], className)}>
      <Drawer ref={drawerRef} title={'Franco Berardi'} items={items} />
      <div className={styles[`${rootClass}__page-container`]}>
        <AppBar title={appBar.title} trailing={appBar.trailing} onClick={onAppBarIcon}></AppBar>
        <div className={styles[`${rootClass}__page-container__content`]} >
          {children}
        </div>
      </div>
    </div>
  );
};

export { DefaultLayout };
