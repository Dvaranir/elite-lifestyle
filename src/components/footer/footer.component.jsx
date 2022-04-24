import React from "react";

import "./footer.styles.scss";

const Footer = () => (
  <footer className="footer">
    <div className="author--ref">
      <p>©Made by Yuriy Plakhin</p>
      <a
        href="https://github.com/Yuriy-Plakhin/elite-lifestyle"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src="img/github.webp" alt="GitHub Logo" />
        &nbsp;GitHub
      </a>
    </div>
  </footer>
);

export default Footer;
