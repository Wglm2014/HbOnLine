import React from "react";

function Nav() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <a className="navbar-brand" href="/"><img className = "rounded" src="./hbonline.png" alt="icon" /> <span>HOME</span></a>
      <ul class="navbar-nav ml-auto">
        <li class="nav-item">
          <a class="nav-link" href="#" id="navbardrop">
              Login
          </a>
        </li>
        <li class="nav-item dropdown">
          <a class="nav-link" href="#" id="navbardrop">
            Sign Up
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default Nav;
