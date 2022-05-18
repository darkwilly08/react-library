import { useContext, useState } from 'react';
import { DrawerContext } from '../contexts';
import clsx from 'clsx';

import Ripples from 'react-ripples';

import { Link } from '@darkwilly08/link';

import styles from './styles/menu.module.scss';
import { DrawerItem } from '../models';
import { Item } from '../item';

const Menu = () => {
  const drawerContext = useContext(DrawerContext);
  const [activeItem, setActiveItem] = useState<DrawerItem | null>(null);
  const rootClass = 'ripple-menu';

  const handleActive = (item: DrawerItem) => {
    if (activeItem && activeItem.title === item.title) {
      return;
    }

    setActiveItem(item);
  };

  const handleExpansion = (item: DrawerItem) => {
    // TODO: Handle expansion
  };

  return (
    <>
      {drawerContext.menu.map((item) => (
        <div key={item.title}>
          <Item
            item={item}
            active={!!(activeItem && activeItem.title === item.title)}
            action={() => (!item.children ? handleActive(item) : handleExpansion(item))}
          />
          {item.children && (
            <>
              {item.children.map((child) => (
                <Link key={child.title} href={child.href}>
                  <Ripples
                    className={clsx(
                      styles[rootClass],
                      activeItem && activeItem.title === child.title && styles[`${rootClass}--active`],
                    )}
                    during={1200}
                    onClick={() => handleActive(child)}
                  >
                    <div className={styles[`${rootClass}__menu`]}>
                      <span className={clsx('text-body2', styles['item__child'])}>{child.title}</span>
                    </div>
                  </Ripples>
                </Link>
              ))}

              <hr className={styles['item__child__separator']} />
            </>
          )}
        </div>
      ))}
    </>
  );
};

export { Menu };
