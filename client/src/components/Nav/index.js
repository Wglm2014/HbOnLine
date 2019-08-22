import React from "react";
import {link} from "react-router-dom";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {logout} from "../../actions/auth";
function Nav({auth:{isAuthenticated,loading, logout}}) {
  const authLinks=(
    <ul class="navbar-nav ml-auto">
    <li class="nav-item">
      <link to="!#" class="nav-link" id="navbardrop">
        Budget
      </link>
    </li>
    <li class="nav-item dropdown">
      <a href={logout} class="nav-link" id="navbardrop">
        Logout
      </a>
    </li>
  </ul>  
  );
  const guestLinks=(
  <ul class="navbar-nav ml-auto">
    <li class="nav-item">
      <link to="/login" class="nav-link" id="navbardrop">
        Login
      </link>
    </li>
    <li class="nav-item dropdown">
      <link to="/register" class="nav-link" id="navbardrop">
        Sign Up
      </link>
    </li>
  </ul>
  );
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <a href="/" className="navbar-brand" ><img className="rounded" src="./hbonline.png" alt="icon" /> <span>HOME</span></a>
      <ul class="navbar-nav ml-auto">
        <li class="nav-item">
          <link to="/login" class="nav-link" id="navbardrop">
            Login
          </link>
        </li>
        <li class="nav-item dropdown">
          <link href="/register" class="nav-link" id="navbardrop">
            Sign Up
          </link>
        </li>
      </ul>
    </nav>
  );
}
Navbar.PropTypes ={
  logout: PropTypes.func.isRequired,
  auth: PropTypes.func.isRequired
}
const mapStateToProps = state =>({
  auth: state.auth
});
export default connect(mapStateToProps,{logout})(Nav);
