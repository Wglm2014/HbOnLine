import React, { Component } from "react";
import { Link } from "react-router-dom";
import { postBudgetLine, getBudgetLine } from "../../utils/budgetline";

class BudgetLines extends Component {

    state = {
        budgetLines: [],
        name: "",
        period: "",
        payment_date: "",
        amount_budgeted: ""
    }
    componentWillMount() { this.loadBudgetLines(); }
    loadBudgetLines = () => {
        getBudgetLine(null)
            .then(res => {
                this.setState({
                    budgetLines: res.data,
                    name: "",
                    period: "",
                    payment_date: "",
                    amount_budgeted: "",
                    amount_spent: ""
                });
            })
            .catch(err => console.log(err));
    }

    handleInputChange = e => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    };

    handleFormSubmit = e => {
        e.preventDefault();
        postBudgetLine({
            name: this.state.name,
            period: this.state.period,
            payment_date: this.state.payment_date,
            amount_budgeted: this.state.amount_budgeted
        }).then((res) => { this.loadBudgetLines(); })
            .catch((err) => console.log(err));
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <form className="form">
                            <input
                                type="text"
                                value={this.state.name}
                                onChange={this.handleInputChange}
                                name="name"
                                placeholder="Budge Line Name (required)"
                                className="budgetlineinput"
                                required
                            />
                            <select value={this.state.period} onChange={this.handleInputChange} name="period" placeholder="payment every?" className="budgetlineinput" required>
                                <option value="monthly">month</option>
                                <option value="quarter">quarter</option>
                                <option value="year">year</option>
                                <option value="six months">six months</option>
                            </select>
                            <input
                                type="date"
                                value={this.state.payment_date}
                                onChange={this.handleInputChange}
                                name="payment_date"
                                placeholder="last day to pay"
                                className="budgetlineinput"
                                required
                            />
                            <input
                                type="number"
                                value={this.state.amount_budgeted}
                                onChange={this.handleInputChange}
                                name="amount_budgeted"
                                placeholder="0.0"
                                step="0.01"
                                className="budgetlineinput"
                                required
                            />
                            <button type="submit" className="btn btn-link btn-lg" onClick={this.handleFormSubmit}>
                                <i className="fa fa-save"></i>
                            </button>
                        </form>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <label htmlFor="name" className="budgetlinelabel">Name</label>
                        <label htmlFor="period" className="budgetlinelabel">period</label>
                        <label htmlFor="payment_date" className="budgetlinelabel">due date</label>
                        <label htmlFor="amount_budgeted" className="budgetlinelabel">Amount Budgeted</label>
                        <label htmlFor="amount_spent" className="budgetlinelabel">Amount Spent</label>
                    </div>
                </div>
                <div className="row">
                    {this.state.budgetLines.length ? (
                        <div>
                            {this.state.budgetLines.map(line => (

                                <div className="col-12" key={line._id}>
                                    <label className="budgetlinelabel">{line.name}</label>
                                    <label className="budgetlinelabel">{line.period}</label>
                                    <label className="budgetlinelabel">{line.payment_date}</label>
                                    <label className="budgetlinelabel">{line.amount_budgeted}</label>
                                    <label className="budgetlinelabel">{line.amount_spent}</label>
                                    <Link to={"/postmovements/" + line._id} >Add movement</Link>
                                    <Link to="#!">Alter Amount</Link>
                                </div>

                            ))} </div>
                    ) : (<h3>No Budget Lines added Yet</h3>)}
                </div>

            </div>

        )
    }
}

export default BudgetLines;