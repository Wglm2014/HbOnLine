import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { logout } from "../../actions/auth";

const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {

  if ((!loading) && (isAuthenticated)) {

    return (
      <div className="ui pointing menu">
        <a href="/" className="active item" ><img className="" src="./hbonline.png" alt="icon" /> <span>HOME</span></a>
        <div className="right menu">
          <Link className="item" to="/dashboard">
            Budget
            </Link>

          <a className="item" onClick={logout} href="#!">
            Logout
            </a>

        </div>
      </div>
    );
  } else {
    return (
      <div className="ui pointing menu">
        <a href="/" className="active item" ><img className="" src="./hbonline.png" alt="icon" /> <span>HOME</span></a>
        <div className="right menu">
          <Link className="item" to="/login">
            Login
          </Link>
          <Link className="item" to="/register">
            Sign Up
          </Link>

        </div>
      </div>
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
