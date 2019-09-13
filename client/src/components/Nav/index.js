import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { logout } from "../../actions/auth";
import Login from "../auth/login";

const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {

  if ((!loading) && (isAuthenticated)) {

    return (
      <nav className="navbar justify-content-between bg-color-primary">
        <Link to="/" className="navbar-brand" ><img className="img-fluid img-thumbnail" src="./hbonline.png" alt="icon" /></Link>
        <div className="navbar-nav ml-auto sub-menu">
          <Link className="nav-item nav-link" to="/dashboard">Budget</Link>
          <a className="nav-item nav-link" onClick={logout} href="/">Logout</a>
        </div>
      </nav>
    );
  } else {
    return (
      <nav className="navbar justify-content-between bg-color-primary">
        <Link to="/" className="navbar-brand"><img className="img-fluid img-thumbnail" src="./hbonline.png" alt="icon" /></Link>
        <Login />
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
