import React, { Fragment } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { logout } from "../../actions/auth";
import BudgetForm from "../budgetForm";
function Dashboard({ isAuthenticated }) {

    if (!isAuthenticated) {
        return <Redirect to="/" />;
    }
    return (
        <Fragment>
            <BudgetForm />
        </Fragment>)


}

//export default Dashboard;
Dashboard.prototype = {
    isAuthenticated: PropTypes.bool
}
const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});
export default connect(mapStateToProps)(Dashboard);


