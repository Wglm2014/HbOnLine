import React, { useState, Fragment } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { postBudgetLine, getBudgetLine } from "../../actions/budgetline";

const PostBudgetLine = ({ postBudgetLine, history }) => {

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
    }
    return (
        <Fragment>
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <label htmlFor="name" className="budgetlinelabel">Name</label>
                        <label htmlFor="period" className="budgetlinelabel">period</label>
                        <label htmlFor="payment_date" className="budgetlinelabel">due date</label>
                        <label htmlFor="amount_budgeted" className="budgetlinelabel">Amount Budgeted</label>
                        <label htmlFor="amount_spent" className="budgetlinelabel">Amount Spent</label>

                    </div>
                    <div className="col-12">
                        <form className="form" onSubmit={e => { onSubmit(e) }}>
                            <input
                                type="text"
                                value={name}
                                onChange={e => onChange(e)}
                                name="name"
                                placeholder="Budge Line Name (required)"
                                className="budgetlineinput"
                                requied
                            />
                            <select value={period} onChange={e => onChange(e)} name="period" placeholder="payment every?" className="budgetlineinput" requied>
                                <option value="monthly">month</option>
                                <option value="quarter">quarter</option>
                                <option value="year">year</option>
                                <option value="six months">six months</option>
                            </select>
                            <input
                                type="date"
                                value={payment_date}
                                onChange={e => onChange(e)}
                                name="payment_date"
                                placeholder="last day to pay"
                                className="budgetlineinput"
                                required
                            />
                            <input
                                type="number"
                                value={amount_budgeted}
                                onChange={e => onChange(e)}
                                name="amount_budgeted"
                                placeholder="0.0"
                                step="0.01"
                                className="budgetlineinput"
                                required
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
    postBudgetLine: PropTypes.func.isRequired
}

export default connect(null, { postBudgetLine })(withRouter(PostBudgetLine))