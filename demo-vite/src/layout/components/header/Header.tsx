import React from "react";
import './header.css'
export const Header: React.FC = () => {
  return (
    <nav className="header navbar navbar-default navbar-fixed-top">
      <div className="container-fluid">
        <div className="navbar-header">
          <a className="navbar-brand" href="/">
            React ARC
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Header;
