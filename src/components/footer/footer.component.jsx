import React from "react";

import gitgub_logo from "../../img/github.webp";

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
        <img src={gitgub_logo} alt="GitHub Logo" />
        &nbsp;GitHub
      </a>
    </div>
  </footer>
);

export default Footer;
