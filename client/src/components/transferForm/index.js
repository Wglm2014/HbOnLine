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
        this.loadBudgetLines();
    }
    loadBudgetLines() {
        getBudgetLine(null).then(res => {
            this.setState()
        })
    }

    loadTransfers = () => {
        getBudgetLine(null).then(res => {
            let allBudgetLines = data.map(line => { return { value =line._id, display: `item:${line.name} budgeted:${amount_budgeted}` } });
            getBudgetLine(this.props.match.params.id).then((results) => {
                console.log(results.data);
                getTransfers(this.props.match.params.id)
                    .then(res => {
                        this.setState({
                            transfers: res.data,
                            budgetline: results.data[0],
                            budgetlines: allBudgetLines,
                            selectedline: "",
                            type_budgetline: "",
                            description: "",
                            transfer_type: "",
                            amount: "",
                            date_transfer: ""
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
            type_budgetline_related: this.state.selectedline

        }).then((res) => { this.loadTransfers(); })
            .catch((err) => console.log(err));
    }

    render() {
        return (
            <div className="container">
                <div className="card-header">
                    <div className="row">
                        <div className="col-12">
                            <h3 className="text-primary">Item Name: <span className="text-danger">&nbsp;{this.state.budgetline.name}&nbsp;</span>
                                Amount Budgeted: <span className="text-danger">&nbsp;{this.state.budgetline.amount_budgeted}&nbsp;</span>
                                Spent: <span className="text-danger">&nbsp;{this.state.budgetline.amount_spent}</span>
                            </h3>
                            <Link to="/Dashboard"><i className="fa fa-arrow-circle-left text-danger"></i>Back to Budget</Link>
                        </div>
                    </div>
                </div>
                <div className="row text-center"><div className="col-12"><h1>Add Transfers to Track Spenses </h1></div></div>
                <div className="card">

                    <div className="card-header">
                        <div className="row mt-5">
                            <div className="col-12">
                                <form className="form">
                                    <input
                                        type="text"
                                        value={this.state.description}
                                        onChange={this.handleInputChange}
                                        name="description"
                                        placeholder="Movement description (requiered)"
                                        className="budgetlineinput"
                                        required
                                    />
                                    <select value={this.state.transfer_type} onChange={this.handleInputChange} name="transfer_type" placeholder="payment/income" className="budgetlineinput" required>
                                        <option value="from">Transfer From</option>
                                        <option value="to">Transter To</option>
                                    </select>
                                    <select value={this.state.selectedline} onChange={this.handleInputChange} name="type_budgetline_related">
                                        {this.state.budgetlines.map((line => <option key={line._id} value={line._id}>line.display</option>))}
                                    </select>
                                    <input
                                        type="date"
                                        value={this.state.date_transfer}
                                        onChange={this.handleInputChange}
                                        name="date_transfer"
                                        placeholder="movement date"
                                        className="budgetlineinput"
                                        required
                                    />
                                    <input
                                        type="number"
                                        value={this.state.amount}
                                        onChange={this.handleInputChange}
                                        name="amount"
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
                                <label htmlFor="description" className="budgetlinelabel">description</label>
                                <label htmlFor="transfer_type" className="budgetlinelabel">budget line related</label>
                                <label htmlFor="date_transfer" className="budgetlinelabel">movement date</label>
                                <label htmlFor="amount" className="budgetlinelabel">amount payed</label>
                            </div>
                        </div>
                    </div>
                    <div className="card-body">
                        <div className="row">
                            {this.state.transfers.length ? (
                                <div>
                                    {this.state.transfers.map(trans => (
                                        <div className="col-12" key={trans._id}>
                                            <label className="budgetlinelabel">{trans.description}</label>
                                            <label className="budgetlinelabel">{trans.transfer_type}</label>
                                            <label className="budgetlinelabel">{trans.date_transfer}</label>
                                            <label className="budgetlinelabel">{trans.amount}</label>
                                        </div>
                                    ))} </div>
                            ) : (<h3>No transfers for this line</h3>)}
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}

export default Transfers;