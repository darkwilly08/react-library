import clsx from 'clsx';

import styles from './styles/item.module.scss';

import Ripples from 'react-ripples';
import { DrawerItem } from '../models';
import { IconWrapper } from '@darkwilly08/icon-wrapper';

interface ItemProps {
  item: DrawerItem;
  action: () => void;
  active: boolean;
}

const Item = ({ item, action, active }: ItemProps) => {
  const WrapperTag: keyof JSX.IntrinsicElements = !item.children ? 'a' : 'div';

  return (
    <WrapperTag href={item.href!} className={styles['wrapper']}>
      <Ripples
        className={clsx(styles['wrapper__ripple-item'], active && styles['wrapper__ripple-item--active'])}
        during={1200}
        onClick={action}
      >
        <div className={styles['wrapper__ripple-item__item']}>
          {item.icon && <IconWrapper name={item.icon} />}
          <span className="text-subtitle">{item.title}</span>
        </div>
      </Ripples>
    </WrapperTag>
  );
};

export { Item };
