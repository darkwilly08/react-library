import clsx from 'clsx';
import * as PropTypes from 'prop-types';

import './icon-wrapper.module.scss';

const propTypes = {
  name: PropTypes.string.isRequired,
  className: PropTypes.string,
};

type IconWrapperProps = PropTypes.InferProps<typeof propTypes>;

const IconWrapper = ({ name, className }: IconWrapperProps) => {
  return <span className={clsx('material-icons', className)}>{name}</span>;
};

IconWrapper.propTypes = propTypes;

export { IconWrapper };
