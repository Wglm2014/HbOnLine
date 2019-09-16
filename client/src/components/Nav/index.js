import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { logout } from "../../actions/auth";
import Login from "../auth/login";

const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {

  if ((!loading) && (isAuthenticated)) {

    return (
      <nav className="navbar navbar-expand-lg bg-color-primary mb-5">
        <Link to="/" className="navbar-brand" ><img className="img-fluid img-thumbnail" src="./hbonline.png" alt="icon" /></Link>
        <button class="navbar-toggler border text-white" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon bg-color-light"></span>
        </button>
        <div class="navbar-collapse collapse w-100 order-3 dual-collapse2" id="navbarNavAltMarkup">
          <ul className="navbar-na ml-auto list-group list-group-horizontal" type="none">
            <li ><Link className="nav-item nav-link" to="/dashboard">Budget</Link></li>
            <li ><a className="nav-item nav-link" onClick={logout} href="/">Logout</a></li>
          </ul>
        </div>
      </nav>
    );
  } else {
    return (
      <nav className="navbar bg-color-primary mb-5">
        <Link to="/" className="navbar-brand"><img className="img-fluid img-thumbnail" src="./hbonline.png" alt="icon" /></Link>
        <Login className="navbar-toggler" />
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
