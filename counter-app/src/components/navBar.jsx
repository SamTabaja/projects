import React, { Component } from "react";

const NavBar = ({ uniqueItems, totalItems }) => {
  return (
    <div className="myNav">
      <nav className="navbar navbar-light bg-dark  nav">
        <a className="navbar-brand ais text-white" href="#">
          Unique Items{" "}
          <span className="badge badge-pill badge-warning spans">
            {uniqueItems}
          </span>
        </a>
        <a className="navbar-brand  text-white" href="#">
          Total Items{" "}
          <span className="badge badge-pill badge-warning spans">
            {totalItems}
          </span>
        </a>
      </nav>
    </div>
  );
};

export default NavBar;
