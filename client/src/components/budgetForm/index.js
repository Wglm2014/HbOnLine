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
    componentDidMount() {
        this.loadBudgetLines();
    }
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
                <div className="ui segment">
                    <form className="ui form">
                        <div className="inline fields">
                            <div className="five wide field">
                                <input
                                    type="text"
                                    value={this.state.name}
                                    onChange={this.handleInputChange}
                                    name="name"
                                    placeholder="Budge Line Name (required)"
                                    required
                                />
                            </div>
                            <div className="two wide field"
                            >
                                <select className="ui search dropdown" defaultValue={"monthly"} value={this.state.period} onChange={this.handleInputChange} name="form-control period" placeholder="payment every?" required>
                                    <option value="monthly" selected>month</option>
                                    <option value="quarter">quarter</option>
                                    <option value="year">year</option>
                                    <option value="six months">six months</option>
                                </select>

                            </div>
                            <div className="three wide field"
                            >
                                <input
                                    type="date"
                                    value={this.state.payment_date}
                                    onChange={this.handleInputChange}
                                    name="payment_date"
                                    placeholder="last day to pay"

                                    required
                                />

                            </div>
                            <div className="two wide field">
                                <div className="ui right labeled input ">
                                    <label htmlFor="amount" className="ui label">$</label>
                                    <input
                                        type="number"
                                        value={this.state.amount_budgeted}
                                        onChange={this.handleInputChange}
                                        name="amount_budgeted"
                                        placeholder="0.00"
                                        step="0.01"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="three wide field">
                                <button type="submit" className="ui left labeled icon button" onClick={this.handleFormSubmit}>
                                    <i className="save icon"></i>Line Item
                                </button>
                            </div>
                        </div>
                        <div className="inline fields">
                            <div className="five wide field">
                                <label htmlFor="name">Name</label>
                            </div>
                            <div className="two wide field">
                                <label htmlFor="period">period</label>
                            </div>
                            <div className="three wide field">
                                <label htmlFor="payment_date">due date</label>
                            </div>
                            <div className="two wide field">
                                <label htmlFor="amount_budgeted">Amount Budgeted</label>
                            </div>
                            <div className="two wide field">
                                <label htmlFor="amount_spent">Amount Spent</label>
                            </div>
                        </div>
                    </form>
                </div>
                <div className="ui segment">
                    {this.state.budgetLines.length ? (
                        <div>
                            {this.state.budgetLines.map(line => (
                                <div className="ui form" key={line._id}>
                                    <div className="inline fields">
                                        <div className="five wide field"><input value={line.name} /></div>
                                        <div className="two wide field"><input value={line.period} /></div>
                                        <div className="three wide field"><input value={line.payment_date} /></div>
                                        <div className="two wide field"><input value={line.amount_budgeted} /></div>
                                        <div className="two wide field"><input value={line.amount_spent} /></div>
                                        <div className="field"><Link to={"/postmovements/" + line._id} >&nbsp;Movements</Link></div>
                                        <div className="field"><Link to={"/posttransfers/" + line._id}>&nbsp;Transfers</Link></div>
                                    </div>
                                </div>

                            ))}  </div>
                    ) : (<h3>No Budget Lines added Yet</h3>)}
                </div>

            </div>

        )
    }
}

export default BudgetLines;