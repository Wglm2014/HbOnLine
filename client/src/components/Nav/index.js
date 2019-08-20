import React from "react";

function Nav() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <a href="/" className="navbar-brand" ><img className="rounded" src="./hbonline.png" alt="icon" /> <span>HOME</span></a>
      <ul class="navbar-nav ml-auto">
        <li class="nav-item">
          <a href="/login" class="nav-link" id="navbardrop">
            Login
          </a>
        </li>
        <li class="nav-item dropdown">
          <a href="/register" class="nav-link" id="navbardrop">
            Sign Up
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default Nav;
