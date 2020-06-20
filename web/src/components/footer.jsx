import React from "react";

const Footer = () => (
  <nav className="navbar navbar-dark bg-dark fixed-bottom">
    <span
      className="navbar-text"
      style={{
        fontSize: 12
      }}
    >
      For any questions or feedback, please{" "}
      <a
        href="mailto:sdesk@adobe.com"
        style={{
          fontSize: 13
        }}
      >
        contact us
      </a>
      .
    </span>
  </nav>
);

export default Footer;
