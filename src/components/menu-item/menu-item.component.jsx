import React from "react";
import { Link } from "react-router-dom";
import "./menu-item.styles.scss";

// Menu item that renders on homepage
const MenuItem = ({ id, title, imageUrl, url }) => (
  <Link to={`/${url}`}>
    <div className="menu--item" id={id}>
      <div className="background--image__container">
        <img
          className="background--image"
          src={imageUrl}
          alt="Menu Background"
        />
      </div>
      <div className="content">
        <h2 className="title">{title}</h2>
      </div>
    </div>
  </Link>
);

export default MenuItem;
