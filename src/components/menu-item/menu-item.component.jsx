import React from 'react';

import './menu-item.styles.scss';

const MenuItem = ({ id, title, imageUrl }) => (
  <div className="menu--item" id={id}>
    <div
      className="background--image"
      style={{
        backgroundImage: `url(${imageUrl})`,
      }}
    ></div>
    <div className="content">
      <h2 className="title">{title}</h2>
    </div>
  </div>
);

export default MenuItem;
