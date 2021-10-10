import React from 'react';

import { Link } from 'react-router-dom';

import './header.styles.scss';

const Header = () => (
  <div className="header">
    <div className="logo">Elite Lifestyle</div>
    <nav className="nav--bar">
      <Link>Workout</Link>
      <Link>Food</Link>
      <Link>Financies</Link>
    </nav>
  </div>
);

export default Header;
