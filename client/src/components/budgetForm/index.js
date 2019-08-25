import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { postBudgetLine } from "../../actions/budgetline"

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
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <form className="form" onSubmit={e => { onSubmit(e) }}>
                        <input
                            value={name}
                            onChange={e => onChange(e)}
                            name="name"
                            placeholder="Budge Line Name (required)"
                        />
                        <input
                            value={description}
                            onChange={e => onChange(e)}
                            name="description"
                            placeholder="Decribe de Line (required)"
                        />
                        <input
                            type="number"
                            value={amount_budgeted}
                            onChange={e => onChange(e)}
                            name="amount_budgeted"
                            placeholder="0.0"
                        />
                        <input
                            type="number"
                            value={amount_spent}
                            onChange={e => onChange(e)}
                            name="amount_spent"
                            placeholder="0.0"
                        />
                        <button type="submit" className="btn btn-primary" value="login">
                            Add Line
                         </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
PostBudgetLine.propTypes = {
    postBudgetLine: PropTypes.func.isRequired
}

export default connect(null, { postBudgetLine })(withRouter(PostBudgetLine))