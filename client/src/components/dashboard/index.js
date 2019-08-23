import React from "react";
import PropType from "prop-types";
import { connect } from "react-redux";
import { getCurrentBudget } from "../../actions/budgetline"
const Dashboard = props => {
    return (
        <div> Dashboard</div>
    )
}

Dashboard.propTypes = {
    getCurrentBudget: PropType.func.isRequired,
    auth: PropType.object.isRequired,
    budgetline: PropType.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
    budgetline: state.profile
});

export default connect(mapStateToProps, { getCurrentBudget })(Dashboard)