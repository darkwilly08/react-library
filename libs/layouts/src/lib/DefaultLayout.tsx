import clsx from 'clsx';
import * as PropTypes from 'prop-types';
import { useRef } from 'react';

import { AppBar } from '@darkwilly08/app-bar';
import { Drawer, RefDrawer } from '@darkwilly08/drawer';

import styles from './styles/DefaultLayout.module.scss';

const propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};

type DefaultLayoutProps = PropTypes.InferProps<typeof propTypes>;

const DefaultLayout = ({ className, children }: DefaultLayoutProps) => {
  const rootClass = 'default-layout';
  const drawerRef = useRef<RefDrawer>(null);

  const onAppBarIcon = () => {
    if (drawerRef.current) {
      drawerRef.current.toggleVisibility();
    }
  };

  const items = [
    {
      title: 'Home',
      icon: 'home',
      action: () => alert('testing'),
      href: '/parent',
      children: [
        {
          title: 'Search',
          icon: 'search',
          href: '/search',
        },
      ],
    },
    {
      title: 'Dashboard',
      icon: 'dashboard',
      href: '/dashboard',
    },
    {
      title: 'Settings',
      icon: 'settings',
      href: '/settings',
    },
  ];

  return (
    <div className={clsx(styles[rootClass], className)}>
      <Drawer ref={drawerRef} title={'Franco Berardi'} items={items} />
      <div className={styles[`${rootClass}__page-container`]}>
        <AppBar onClick={onAppBarIcon}></AppBar>
        <div className="p-md">{children}</div>
      </div>
    </div>
  );
};

DefaultLayout.propTypes = propTypes;

export { DefaultLayout };
