import React from 'react';

import { Link } from 'react-router-dom';

import './header.styles.scss';

const Header = props => (
  <div className="header">
    <Link to="/">
      <div className="logo">Elite Lifestyle</div>
    </Link>
    <nav className="nav--bar">
      {Object.values(props).map(item => (
        <Link key={item.id} to={`/${item.url}`}>
          {item.url[0].toUpperCase() + item.url.slice(1)}
        </Link>
      ))}
    </nav>
  </div>
);

export default Header;
