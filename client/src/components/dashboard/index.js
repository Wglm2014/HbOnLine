import React, { Fragment, useEffect } from "react";
import PropType from "prop-types";
import { connect } from "react-redux";
import spinner from "../spinner/index"
import { getBudgetLine } from "../../actions/budgetline"
import BudgetForm from "../budgetForm";
const Dashboard = ({ getBudgetLine, auth, budgetline }) => {
    useEffect(() => {
        getBudgetLine();
    }, []);
    console.log(budgetline);

    return budgetline.loading && budgetline.budgetLine === null ? <spinner /> :
        <Fragment>
            <h1 className="large text-primary">Budget</h1>
            <BudgetForm />
            {budgetline.budgetLine.length ? (
                <div>
                    {budgetline.budgetLine.map(line => (
                        <div className="row">
                            <div className="col-12" key={line._id}>
                                <a href="#!">
                                    <strong>
                                        {line.name}
                                    </strong>
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (<h3>No Budget Lines added Yet</h3>)}
        </Fragment>
}

Dashboard.propTypes = {
    getBudgetLine: PropType.func.isRequired,
    auth: PropType.object.isRequired,
    budgetline: PropType.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
    budgetline: state.budgetline
});

export default connect(mapStateToProps, { getBudgetLine })(Dashboard)