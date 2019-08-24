import React from "react";
import { link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { logout } from "../../actions/auth";

const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {

  if ((!loading) && (isAuthenticated)) {

    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <a href="/" className="navbar-brand" ><img className="rounded" src="./hbonline.png" alt="icon" /> <span>HOME</span></a>
        <ul className="navbar-nav">
          <li className="nav-item">
            <a href="/dashboard">
              Budget Lines
            </a>
          </li>
          <li className="nav-item">
            <a onClick={logout} href="#!">
              Logout
            </a>
          </li>
        </ul>
      </nav>
    );
  } else {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <a href="/" className="navbar-brand" ><img className="rounded" src="./hbonline.png" alt="icon" /> <span>HOME</span></a>
        <ul className="navbar-nav">
          <li className="nav-item">
            <a href="/login">
              Login
            </a>
          </li>
          <li className="nav-item">
            <a href="/register">
              Sign Up
             </a>
          </li>
        </ul>
      </nav>
    );
  }
}



Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(mapStateToProps, { logout })(Navbar);
