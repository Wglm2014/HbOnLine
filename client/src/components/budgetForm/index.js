import React, { useState, useEffect, Fragment } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { postBudgetLine, getBudgetLine } from "../../actions/budgetline";

const PostBudgetLine = ({ getBudgetLine, budgetline, auth, postBudgetLine, history }) => {

    /* useEffect(() => {
         console.log("working")
     });
     getBudgetLine();*/

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        amount_budgeted: 0.0,
        amount_spent: 0.0,
    });

    const {
        name,
        description,
        amount_budgeted,
        amount_spent,
    } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });
    const onSubmit = e => {
        e.preventDefault();
        postBudgetLine(formData, history);
        setState({
            name: "",
            description: "",
            amount_budgeted: 0.0,
            amount_spent: 0.0,
        });
    }
    return (
        <Fragment>
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <label htmlFor="name" className="budgetlinelabel">Name</label>
                        <label htmlFor="description" className="budgetlinelabel">Description</label>
                        <label htmlFor="amount_budgeted" className="budgetlinelabel">Amount Budgeted</label>
                        <label htmlFor="amount_spent" className="budgetlinelabel">Amount Spent</label>

                    </div>
                    <div className="col-12">
                        <form className="form" onSubmit={e => { onSubmit(e) }}>
                            <input
                                value={name}
                                onChange={e => onChange(e)}
                                name="name"
                                placeholder="Budge Line Name (required)"
                                className="budgetlineinput"
                            />
                            <input
                                value={description}
                                onChange={e => onChange(e)}
                                name="description"
                                placeholder="Decribe de Line (required)"
                                className="budgetlineinput"
                            />
                            <input
                                type="number"
                                value={amount_budgeted}
                                onChange={e => onChange(e)}
                                name="amount_budgeted"
                                placeholder="0.0"
                                className="budgetlineinput"
                            />
                            <input
                                type="number"
                                value={amount_spent}
                                onChange={e => onChange(e)}
                                name="amount_spent"
                                placeholder="0.0"
                                className="budgetlineinput"
                            />
                            <button type="submit" className="btn btn-link btn-lg" value="budgetline">
                                <i className="fa fa-save"></i>
                            </button>
                        </form>
                    </div>
                </div>
            </div>

        </Fragment>
    );
}
PostBudgetLine.propTypes = {
    postBudgetLine: PropTypes.func.isRequired,
    //getBudgetLine: PropTypes.func.isRequired,
    //auth: PropTypes.object.isRequired,
    //budgetline: PropTypes.object.isRequired
}
/*const mapStateToProps = state => ({
    auth: state.auth,
    budgetline: state.budgetline
});*/
export default connect(null, { postBudgetLine })(withRouter(PostBudgetLine))