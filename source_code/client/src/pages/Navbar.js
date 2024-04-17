import React from "react";
import profile from "../assets/logo.png";

function Navbar() {
  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark justify-content-start"
      style={{ backgroundColor: "#563d7c" }}
    >
      <a className="navbar-brand" href="/">
        <img
          src={profile}
          alt=""
          width="30"
          height="24"
          className="d-inline-block align-top"
          style={{ marginLeft: "20px", borderRadius: "15%" }}
        />
      </a>

      <div class="">
        <ul className="navbar-nav flex-row">
          <li className="nav-item">
            <a
              className="nav-link"
              style={{ marginRight: "10px" }}
              href="/profile"
            >
              Profile
            </a>
          </li>
          <li className="nav-item">
            <a
              className="nav-link"
              style={{ marginRight: "10px" }}
              href="/addition"
            >
              Addition
            </a>
          </li>
          <li className="nav-item">
            <a
              className="nav-link"
              style={{ marginRight: "10px" }}
              href="/apiInfo"
            >
              ApiInfo
            </a>
          </li>
          <li className="nav-item">
            <a
              className="nav-link"
              style={{ marginRight: "10px" }}
              href="/inventory"
            >
              Inventory
            </a>
          </li>
          <li className="nav-item">
            <a
              className="nav-link"
              style={{ marginRight: "10px" }}
              href="/loggedUser"
            >
              User Profile
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
