import clsx from 'clsx';
import * as PropTypes from 'prop-types';
import { useRef } from 'react';

import { AppBar } from '@darkwilly08-nx/app-bar';
import { Drawer, RefDrawer } from '@darkwilly08-nx/drawer';

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

  return (
    <div className={clsx(styles[rootClass], className)}>
      <Drawer ref={drawerRef}></Drawer>
      <div className={styles[`${rootClass}__page-container`]}>
        <AppBar onClick={onAppBarIcon}></AppBar>
        <div className="p-md">{children ?? null}</div>
      </div>
    </div>
  );
};

DefaultLayout.propTypes = propTypes;

export { DefaultLayout };
