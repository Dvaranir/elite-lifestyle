import React from 'react';

import MenuItem from '../menu-item/menu-item.component';

import './directory.styles.scss';

const Directory = props => {
  return (
    <div className="directory">
      {Object.values(props).map(item => {
        return <MenuItem key={item.id} {...item} />;
      })}
    </div>
  );
};

export default Directory;
