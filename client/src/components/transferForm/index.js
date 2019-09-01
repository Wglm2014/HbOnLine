import React, { Component } from "react";
import { Link } from "react-router-dom";
import { getBudgetLine } from "../../utils/budgetline";
import { postTransfers, getTransfers } from "../../utils/transfers";

class Transfers extends Component {

    state = {
        transfers: [],
        budgetline: {},
        budgetlines: [],
        selectedline: "",
        type_budgetline: "",
        description: "",
        transfer_type: "",
        amount: "",
        date_transfer: "",
        type_budgetline_related: ""
    }
    componentDidMount() {
        this.loadTransfers();
    }


    loadTransfers = () => {
        getBudgetLine(null).then(res => {
            let allBudgetLines = res.data.map(line => { return { value: line._id, display: `item:${line.name} budgeted:${line.amount_budgeted}` } });
            getBudgetLine(this.props.match.params.id).then((results) => {
                console.log(results.data);
                getTransfers(this.props.match.params.id)
                    .then(res => {
                        this.setState({
                            transfers: res.data,
                            budgetline: results.data[0],
                            budgetlines: allBudgetLines,
                            type_budgetline: "",
                            description: "",
                            transfer_type: "",
                            amount: "",
                            date_transfer: "",
                            type_budgetline_related: ""

                        });
                    }).catch(err => console.log(err));
            }).catch(err => {
                console.log("error");
                console.log(err)
            });
        }).catch(err => {
            console.log(err);
        });
    }

    handleInputChange = e => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    };

    handleFormSubmit = e => {
        e.preventDefault();
        postTransfers({
            type_budgetline: this.props.match.params.id,
            description: this.state.description,
            transfer_type: this.state.transfer_type,
            amount: this.state.amount,
            date_transfer: this.state.date_transfer,
            type_budgetline_related: this.state.type_budgetline_related

        }).then((res) => { this.loadTransfers(); })
            .catch((err) => console.log(err));
    }

    render() {
        return (
            <div className="container">
                <div className="ui sizer vertical segment">
                    <h1 className="ui large header">Item Name: <span className="ui red header">&nbsp;{this.state.budgetline.name}&nbsp;</span>
                        Amount Budgeted: <span className="ui red header">&nbsp;{this.state.budgetline.amount_budgeted}&nbsp;</span>
                        Spent: <span className="ui red header">&nbsp;{this.state.budgetline.amount_spent}</span>
                    </h1>
                    <h3><Link to="/Dashboard"><i className="arrow circle left icon"></i>Back to Budget</Link></h3>
                </div>

                <div className="ui sizer vertical segment">
                    <h1 className="ui center aligned header">Transfer from one line budgeted to another</h1>
                </div>

                <div className="ui segment">
                    <form className="ui form">
                        <div className="inline fields">
                            <div className="five wide field">
                                <input
                                    type="text"
                                    value={this.state.description}
                                    onChange={this.handleInputChange}
                                    name="description"
                                    placeholder="Movement description (requiered)"
                                    className="budgetlineinput"
                                    required
                                />
                            </div>
                            <div className="two wide field">
                                <select defaultValue={"from"} value={this.state.transfer_type} onChange={this.handleInputChange} name="transfer_type" placeholder="payment/income" className="budgetlineinput" required>
                                    <option value="from">From</option>
                                    <option value="to">To</option>
                                </select>
                            </div>
                            <div className="four wide field">
                                <select className="ui fluid search selection" value={this.state.type_budgetline_related} onChange={this.handleInputChange} name="type_budgetline_related">
                                    {this.state.budgetlines.map((line, i) => {
                                        if (i === 0)
                                            return <option selected="selected" key={line._id} value={line._id}>{line.display}</option>

                                        return <option key={line._id} value={line._id}>{line.display}</option>
                                    })}
                                </select>
                            </div>
                            <div className="three wide field">
                                <input
                                    type="date"
                                    value={this.state.date_transfer}
                                    onChange={this.handleInputChange}
                                    name="date_transfer"
                                    placeholder="movement date"
                                    className="budgetlineinput"
                                    required
                                />
                            </div>
                            <div className="three wide field">
                                <div className="ui right labeled input ">

                                    <label htmlFor="amount" className="ui label">$</label>
                                    <input
                                        type="number"
                                        value={this.state.amount}
                                        onChange={this.handleInputChange}
                                        name="amount"
                                        placeholder="0.00"
                                        step="0.01"
                                        className="budgetlineinput"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="three wide field">
                                <button type="submit" className="ui left labeled icon button" onClick={this.handleFormSubmit}>
                                    <i className="save icon"></i>transfer
                                </button>
                            </div>
                        </div>
                        <div className="inline fields">
                            <div className="four wide field">
                                <label htmlFor="description">description</label>
                            </div>
                            <div className="two wide field">
                                <label htmlFor="transfer_type">transfer type</label>
                            </div>
                            <div className="three wide field">
                                <label htmlFor="type_budgetline_related">releted item</label>
                            </div>
                            <div className="three wide field">
                                <label htmlFor="date_transfer">transfer date</label>
                            </div>
                            <div className="two wide field">
                                <label htmlFor="amount">amount payed</label>
                            </div>
                        </div>
                    </form>
                </div>
                <div className="ui segment">
                    {this.state.transfers.length ? (
                        <div>
                            {this.state.transfers.map(trans => (
                                <form className="ui form" key={trans._id}>
                                    <div className="inline fields">

                                        <div className="five wide field"><input value={trans.description} /></div>
                                        <div className="five wide field"><input value={trans.transfer_type} /></div>
                                        <div className="five wide field"><input value={trans.date_transfer} /></div>
                                        <div className="five wide field"><input value={trans.amount} /></div>
                                    </div>
                                </form>
                            ))} </div>
                    ) : (<h3>No transfers for this line</h3>)}
                </div>
            </div>


        )
    }
}

export default Transfers;