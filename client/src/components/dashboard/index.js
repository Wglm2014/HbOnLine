import React from "react";
import { Fragment } from "rect-router-dom"
import PropType from "prop-types";
import { connect } from "react-redux";
import spinner from "../../spinner";
import { getCurrentBudget } from "../../actions/budgetline"
const Dashboard = ({ getCurrentBudget, auth: { user }, budgetLine: { budgetLine, loading } }) => {
    useEffect(() => {
        getCurrentBudget();
    }, []);
    return loading && profile === null ? <spinner /> : <Fragment>
        <h1 className="large text-primary">Budget</h1>
        <p className="lead"> <i> className="fa fa-user"</i>Let&apos;s Budget {user.name} </p>
    </Fragment>
}

Dashboard.propTypes = {
    getCurrentBudget: PropType.func.isRequired,
    auth: PropType.object.isRequired,
    budgetLine: PropType.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
    budgetline: state.profile
});

export default connect(mapStateToProps, { getCurrentBudget })(Dashboard)