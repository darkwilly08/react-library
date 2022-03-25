import clsx from 'clsx';

import './styles/Drawer.scss';

const Drawer = ({ name, className }) => {
  const rootClass = 'drawer';
  return <div className={clsx(rootClass, className)}>{name}</div>;
};

export { Drawer };
