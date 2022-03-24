import clsx from 'clsx';

const IconWrapper = ({ name, className }) => {
  return <span className={clsx('material-icons', className)}>{name}</span>;
};

export { IconWrapper };
