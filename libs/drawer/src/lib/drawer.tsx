import clsx from 'clsx';
import * as PropTypes from 'prop-types';
import { forwardRef, Ref, useEffect, useImperativeHandle, useState } from 'react';

import { useIsFirstRender, useScreenSize } from '@darkwilly08/common';

import styles from './drawer.module.scss';
import { RefDrawer } from './refDrawer';
const propTypes = {
  className: PropTypes.string,
};

type DrawerProps = PropTypes.InferProps<typeof propTypes>;

const Drawer = forwardRef(({ className }: DrawerProps, ref: Ref<RefDrawer>) => {
  const rootClass = 'drawer';
  const screenSize = useScreenSize();
  const isFirstRender = useIsFirstRender();
  const [isHidden, setIsHidden] = useState(screenSize.lg);
  const [hasOverlay, setHasOverlay] = useState(!screenSize.lg);

  const toggleVisibility = () => {
    setIsHidden((prevValue) => !prevValue);
  };

  useEffect(() => {
    if (isFirstRender) return;

    if (screenSize.lg) {
      setIsHidden(false);
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
    <>
      <div
        className={clsx(styles['drawer__background'], (!hasOverlay || isHidden) && 'hidden')}
        onClick={toggleVisibility}
      ></div>
      {/* // TODO add content as children object */}
      <div className={clsx(styles[rootClass], className, isHidden && styles[`${rootClass}--hidden`])}>content</div>
    </>
  );
});

Drawer.displayName = 'Drawer';

Drawer.propTypes = propTypes;

export { Drawer };
