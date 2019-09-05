import React, { Component } from "react";
import { Link } from "react-router-dom";
import Moment from "moment";
import FormatNumber from "format-number";
import { postBudgetLine, getBudgetLine, putBudgetLine, deleteBudgetLine } from "../../utils/budgetline";

class BudgetLines extends Component {

    state = {
        budgetLines: [],
        name: "",
        type_item: "",
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
                //console.log(res.data);
                this.setState({
                    budgetLines: res.data,
                    name: "",
                    type_item: "",
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
            type_item: this.state.type_item,
            period: this.state.period,
            payment_date: this.state.payment_date,
            amount_budgeted: this.state.amount_budgeted
        }).then((res) => { this.loadBudgetLines(); })
            .catch((err) => console.log(err));
    }
    putLine = (id, name, payment_date) => {
        putBudgetLine({
            id, name, payment_date
        }).then(res => {
            this.loadBudgetLines();
        }).catch(err => console.log(err));
    }
    deleteLine = idline => {
        // alert(idline);
        deleteBudgetLine(idline).then(res => {
            alert("2", res);
            this.loadBudgetLines();
        }).catch(err => alert(err))
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="titles">
                        <h1 className="x-large">Create Your Budget Items</h1>
                    </div>
                </div>
                <div className="ui segment">
                    <form className="ui form">
                        <div className="inline fields">
                            <div className="five wide field"><label htmlFor="name">Name</label></div>
                            <div className="two wide field"><label htmlFor="type_item">Type Item</label></div>
                            <div className="three wide field"><label htmlFor="period">Period</label></div>
                            <div className="three wide field"><label htmlFor="payment_date">Due Date</label></div>
                            <div className="three wide field"><label htmlFor="amount_budgeted">Amount Budgeted</label></div>
                            <div className="three wide field"></div>
                        </div>
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
                            <div className="two wide field">
                                <select className="ui search dropdown" value={this.state.type_item} onChange={this.handleInputChange} name="type_item" required>
                                    <option value="" disabled>item type</option>
                                    <option value="spence" >spence</option>
                                    <option value="income">income</option>
                                </select>
                            </div>
                            <div className="three wide field">
                                <select className="ui search dropdown" value={this.state.period} onChange={this.handleInputChange} name="period" required>
                                    <option value="" disabled>select period</option>
                                    <option value="every month" >every month</option>
                                    <option value="every other month">every other month</option>
                                    <option value="quaterly">quaterly</option>
                                    <option value="every 4 months">every 4 months</option>
                                    <option value="twice a year">twice a year</option>
                                    <option value="once a year">once a year</option>
                                </select>
                            </div>
                            <div className="three wide field">
                                <input
                                    type="date"
                                    value={this.state.payment_date}
                                    onChange={this.handleInputChange}
                                    name="payment_date"
                                    placeholder="last day to pay"

                                    required
                                />

                            </div>
                            <div className="three wide field">
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
                                <button type="submit" className="ui icon button" onClick={this.handleFormSubmit} data-tooltip="Add Item">
                                    <i class="plus icon"></i>
                                </button>
                            </div>
                        </div>

                    </form>
                </div>
                <div className="ui segment">
                    {this.state.budgetLines.length ? (
                        <form className="ui form">
                            <div className="inline fields">
                                <div className="four wide field"><label htmlFor="name">Name</label></div>
                                <div className="two wide field"><label htmlFor="type_item">Type Item</label></div>
                                <div className="three wide field"><label htmlFor="period">Period</label></div>
                                <div className="two wide field"><label htmlFor="payment_date">Due Date</label></div>
                                <div className="two wide field"><label htmlFor="amount_budgeted">Budgeted</label></div>
                                <div className="two wide field"><label htmlFor="amount_spent">Spent</label></div>
                                <div className="one wide field"></div>
                                <div className="one wide field"></div>
                            </div>
                            <div className="ui divider"></div>

                            {this.state.budgetLines.map(line => (
                                <div key={line._id}>
                                    <div className="inline fields" >
                                        <div className="four wide field"><input value={line.name} /></div>
                                        <div className="two wide field"><input value={line.type_item} disabled /></div>
                                        <div className="three wide field"><input value={line.period} disabled /></div>
                                        <div className="two wide field"><input value={Moment(line.payment_date).format("l")} /></div>
                                        <div className="two wide field"><input value={FormatNumber({ prefix: "$" })(line.amount_budgeted.$numberDecimal)} disabled /></div>
                                        <div className="two wide field"><input value={FormatNumber({ prefix: "$" })(line.amount_spent.$numberDecimal)} disabled /></div>
                                        <Link to={"/postmovements/" + line._id} className="ui icon button" data-tooltip="Add Movements"><i className="tasks icon"></i></Link>
                                        <Link to={"/posttransfers/" + line._id} className="ui icon button" data-tooltip="Make Transfers"><i className="exchange alternate icon"></i></Link>
                                        <button type="submit" className="ui icon button" onClick={() => this.deleteLine(line._id)} data-tooltip="Delete Item">
                                            <i class="erase icon"></i>
                                        </button>
                                    </div>
                                    <div className="ui divider"></div>
                                </div>
                            ))}  </form>
                    ) : (<h3>No Budget Lines added Yet</h3>)}
                </div>

            </div>

        )
    }
}

export default BudgetLines;