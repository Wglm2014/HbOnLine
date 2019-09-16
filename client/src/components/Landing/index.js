import React from "react"
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Register from "../auth/register"
import Alert from "../alert";

const Landing = ({ isAuthenticated }) => {
  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }
  return (
    <section className="container mt-5">
      <div className="row">
        <div className="col-5">
          <h1 className="Display-1">Home Budget One Line</h1>
          <p className="lead">Take care of your spences, know were is your money going...</p>
        </div>
        <div className="col-2">
        </div>

        <div className="col-5">
          <Alert />
          <Register />
        </div>
      </div>

    </section>);
}

Landing.prototype = {
  isAuthenticated: PropTypes.bool
}
const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});
export default connect(mapStateToProps)(Landing);