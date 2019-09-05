import React, { Component } from "react";
import { Link } from "react-router-dom";
import Moment from "moment";
import FormatNumber from "format-number";
import { getBudgetLine } from "../../utils/budgetline";
import { postTransfers, getTransfers, deleteTransfers } from "../../utils/transfers";

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
        type_budgetline_related: "",
        amount_budgeted: "",
        amount_budgeted_related: ""
    }
    componentDidMount() {
        this.loadTransfers();
    }


    loadTransfers = () => {
        getBudgetLine(null).then(res => {
            console.log(res);
            let allBudgetLines = res.data.map(line => { return { value: line._id, dataBudgeted: line.amount_budgeted, display: `${line.name} budgeted: ${FormatNumber({ prefix: "$" })(line.amount_budgeted.$numberDecimal)} spent: ${FormatNumber({ prefix: "$" })(line.amount_spent.$numberDecimal)}` } });
            console.log("1", this.props.match.params.id);
            getBudgetLine(this.props.match.params.id).then((results) => {
                console.log(results.data);
                console.log("2", this.props.match.params.id);
                getTransfers(this.props.match.params.id)
                    .then(res => {
                        console.log("3", res);
                        this.setState({
                            transfers: res.data,
                            budgetline: results.data[0],
                            budgetlines: allBudgetLines,
                            type_budgetline: "",
                            description: "",
                            transfer_type: "",
                            amount: "",
                            date_transfer: "",
                            type_budgetline_related: "",
                            amount_budgeted: results.data[0].amount_budgeted.$numberDecimal,
                            amount_spent: results.data[0].amount_spent.$numberDecimal,
                            amount_budgeted_related: ""
                        });
                    }).catch(err => console.log(err));
            }).catch(err => {
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

    getBudgetLineById = (arr, id) => {
        return arr.filter(
            function (arr) { return arr.value === id }
        );
    }

    handleFormSubmit = e => {
        e.preventDefault();
        console.log(this.props.match.params.id, this.state.type_budgetline_related);
        const selectedLine = this.getBudgetLineById(this.state.budgetlines, this.state.type_budgetline_related);
        console.log(selectedLine[0]);
        postTransfers({
            description: this.state.description,
            transfer_type: this.state.transfer_type,
            amount: this.state.amount,
            date_transfer: this.state.date_transfer,
            type_budgetline: this.props.match.params.id,
            type_budgetline_related: this.state.type_budgetline_related,
            amount_budgeted: this.state.amount_budgeted,
            amount_budgeted_related: selectedLine[0].dataBudgeted.$numberDecimal
        }).then((res) => { this.loadTransfers(); })
            .catch((err) => console.log(err));
    }

    deleteTransfer = (id) => {
        deleteTransfers(id).then(res => {
            this.loadBudgetLines();
        }).catch(err => console.log(err))
    }

    render() {
        return (
            <div className="container">
                <div className="ui sizer vertical segment">
                    <h1 className="ui large header">Name: <span className="ui red header">&nbsp;{this.state.budgetline.name}&nbsp;</span>
                        Budgeted: <span className="ui red header">&nbsp;{FormatNumber({ prefix: "$" })(this.state.amount_budgeted)}&nbsp;</span>
                        Spent: <span className="ui red header">&nbsp;{FormatNumber({ prefix: "$" })(this.state.amount_spent)}</span>
                    </h1>
                    <h3><Link to="/Dashboard"><i className="arrow circle left icon"></i>Back to Budget</Link></h3>
                </div>

                <div className="ui sizer vertical segment">
                    <h1 className="ui center aligned header">Transfer from one line budgeted to another</h1>
                </div>

                <div className="ui segment">
                    <form className="ui form">
                        <div className="inline fields">
                            <div className="five wide field"><label htmlFor="description">description</label></div>
                            <div className="two wide field"><label htmlFor="transfer_type">transfer type</label></div>
                            <div className="four wide field"><label htmlFor="type_budgetline_related">releted item</label></div>
                            <div className="three wide field"><label htmlFor="date_transfer">transfer date</label></div>
                            <div className="three wide field"><label htmlFor="amount">amount transfer</label></div>
                            <div className="two wide field"><label></label></div>
                        </div>
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
                            <div className="three wide field">
                                <select value={this.state.transfer_type} onChange={this.handleInputChange} name="transfer_type" className="ui selection dropdown" required>
                                    <option value="" disabled>select one</option>
                                    <option value="from">From</option>
                                    <option value="to">To</option>
                                </select>
                            </div>
                            <div className="four wide field">
                                <select className="ui search dropdown" value={this.state.type_budgetline_related} onChange={this.handleInputChange} name="type_budgetline_related">
                                    <option value="" disabled>select budget line</option>
                                    {this.state.budgetlines.map((line, i) => {
                                        return <option key={line.value} value={line.value}>{line.display}</option>
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
                                        required
                                    />
                                </div>
                            </div>
                            <div className="two wide field">
                                <button type="submit" className="ui icon button" onClick={this.handleFormSubmit} data-tooltip="Add Transfer">
                                    <i className="plus icon"></i>
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
                <div className="ui segment">
                    {this.state.transfers.length ? (
                        <form className="ui form">
                            <div className="inline fields">
                                <div className="five wide field"><label htmlFor="description">description</label></div>
                                <div className="two wide field"><label htmlFor="transfer_type">transfer type</label></div>
                                <div className="five wide field"><label htmlFor="type_budgetline_related">releted item</label></div>
                                <div className="two wide field"><label htmlFor="date_transfer">transfer date</label></div>
                                <div className="two wide field"><label htmlFor="amount">amount transfer</label></div>
                            </div>
                            {this.state.transfers.map(trans => (
                                <div key={trans._id}>
                                    <div className="inline fields" >
                                        <div className="five wide field"><input type="text" value={trans.description} /></div>
                                        <div className="two wide field"><input type="text" value={trans.transfer_type} /></div>
                                        <div className="five wide field"><input type="text" value={trans.type_budgetline_related.name} /></div>
                                        <div className="two wide field"><input value={Moment(trans.date_transfer).format("l")} /></div>
                                        <div className="two wide field"><input step="0.01" value={FormatNumber({ prefix: "$" })(trans.amount.$numberDecimal)} /></div>
                                        <button type="submit" className="ui icon button" onClick={() => this.deleteTransfer(trans._id)} data-tooltip="Delete Item">
                                            <i class="erase icon"></i>
                                        </button>
                                    </div>
                                    <div className="ui divider"></div>
                                </div>
                            ))} </form>
                    ) : (<h3>No transfers for this line</h3>)}
                </div>
            </div>


        )
    }
}

export default Transfers;