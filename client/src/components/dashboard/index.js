import React, { Fragment, Component, useEffect } from "react";
import PropType from "prop-types";
import { connect } from "react-redux";
import spinner from "../spinner"
import { getBudgetLine } from "../../actions/budgetline"
import BudgetForm from "../budgetForm";
class Dashboard extends Component {

    //  useEffect(() => { this.props.getBudgetLine() }, []);

    componentWillMount() {
        console.log("requests");
        this.props.getBudgetLine();
    }



    componentDidUpdate(prevProps, prevState) {
        if (prevProps.budgetline.budgetLine === null) {
            console.log("it works");
            this.props.getBudgetLine();
        }
    }

    render() {
        return this.props.budgetline.loading && this.props.budgetline.budgetLine === null ? <spinner /> :
            <Fragment>
                <h1 className="large text-primary">Budget</h1>
                <BudgetForm />
                {this.props.budgetline.budgetLine.length ? (
                    <div>
                        {this.props.budgetline.budgetLine.map(line => (
                            <div className="row">
                                <div className="col-12" key={line._id}>
                                    <label className="budgetlinelabel">{line.name}</label>
                                    <label className="budgetlinelabel">{line.period}</label>
                                    <label className="budgetlinelabel">{line.payment_date}</label>
                                    <label className="budgetlinelabel">{line.amount_budgeted}</label>
                                    <label className="budgetlinelabel">{line.amount_spent}</label>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (<h3>No Budget Lines added Yet</h3>)}
            </Fragment>
    }

}

Dashboard.propTypes = {
    getBudgetLine: PropType.func.isRequired,
    auth: PropType.object.isRequired,
    budgetline: PropType.object.isRequired
}

const mapStateToProps = (state, ownProps) => ({
    auth: state.auth,
    budgetline: state.budgetline
});

export default connect(mapStateToProps, { getBudgetLine })(Dashboard)