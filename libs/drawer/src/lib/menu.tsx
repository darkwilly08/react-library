import React from 'react';
import * as PropTypes from 'prop-types';

const propTypes = {
  items: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
};

type MenuProps = PropTypes.InferProps<typeof propTypes>;

const Menu = ({ items }: MenuProps) => {
  return (
    <>
      {items.map((item) => (
        <div>{item}</div>
      ))}
    </>
  );
};

Menu.propTypes = propTypes;

export { Menu };
