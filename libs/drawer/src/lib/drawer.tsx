import * as PropTypes from 'prop-types';
import clsx from 'clsx';
import { forwardRef, Ref, useEffect, useImperativeHandle, useState } from 'react';

import { useIsFirstRender, useScreenSize } from '@darkwilly08/common';

import styles from './drawer.module.scss';
import { RefDrawer } from './refDrawer';
import { Menu } from './menu';
import { Header } from './header';
import { DrawerProvider } from './contexts';

const propTypes = {
  title: PropTypes.string,
  logo: PropTypes.string,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      icon: PropTypes.string,
      action: PropTypes.func,
      href: PropTypes.string,
    }).isRequired,
  ).isRequired,
  className: PropTypes.string,
};

type DrawerProps = PropTypes.InferProps<typeof propTypes>;

const Drawer = forwardRef(({ className, title, logo, items }: DrawerProps, ref: Ref<RefDrawer>) => {
  const rootClass = 'drawer';
  const screenSize = useScreenSize();
  const isFirstRender = useIsFirstRender();
  const [isHidden, setIsHidden] = useState(true);
  const [hasOverlay, setHasOverlay] = useState(false);

  const toggleVisibility = () => {
    setIsHidden((prevValue) => !prevValue);
  };

  useEffect(() => {
    if (isFirstRender) return;

    if (screenSize.lg) {
      setHasOverlay(false);
    } else {
      setIsHidden(true);
      setHasOverlay(true);
    }
  }, [isFirstRender, screenSize.lg]);

  useImperativeHandle(ref, () => ({
    toggleVisibility,
  }));

  return (
    <DrawerProvider title={title} logo={logo} menu={items}>
      <div
        className={clsx(styles['drawer__background'], (!hasOverlay || isHidden) && 'hidden')}
        onClick={toggleVisibility}
      />
      <div className={clsx(styles[rootClass], className, isHidden && styles[`${rootClass}--hidden`])}>
        <div className="p-md">
          <Header />
          <hr className="mb-md" />
          <Menu />
        </div>
      </div>
    </DrawerProvider>
  );
});

Drawer.displayName = 'Drawer';

Drawer.propTypes = propTypes;

export { Drawer };
