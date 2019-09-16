import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Moment from "moment";
import FormatNumber from "format-number";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getBudgetLine } from "../../actions/budgetline";
import { postTransfers, getTransfers, deleteTransfers } from "../../actions/transfers";
import spinner from "../spinner";

const Transfers = ({ getBudgetLine, postTransfers, getTransfers, deleteTransfers, budgetline: { idBudgetLine, budgetLine, budgetLines, loading }, transfers: { Transfers } }) => {

    useEffect(() => {
        //  alert(idBudgetLine);
        if (idBudgetLine) {
            //alert(idBudgetLine);
            getBudgetLine(idBudgetLine);
            getBudgetLine(null);
            getTransfers(idBudgetLine);
        }

    }, [getTransfers, getBudgetLine]);

    const [formData, setFormData] = useState({
        description: "",
        transfer_type: "",
        amount: "",
        date_transfer: "",
        type_budgetline_related: ""
    });
    const {
        description,
        transfer_type,
        amount,
        date_transfer,
        type_budgetline_related
    } = formData;


    const inputChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });

    };


    const handleFormSubmit = e => {
        e.preventDefault();

        // console.log(budgetLines);
        const budgetLineRelared = budgetLines.filter((line) => {
            if (line._id === type_budgetline_related) { return line }
        });

        // console.log(budgetLineRelared[0].amount_budgeted.$numberDecimal);;
        postTransfers({
            description: description,
            transfer_type: transfer_type,
            amount: amount,
            date_transfer: date_transfer,
            amount_budgeted: budgetLine.amount_budgeted.$numberDecimal,
            amount_budgeted_related: budgetLineRelared[0].amount_budgeted.$numberDecimal,
            type_budgetline: idBudgetLine,
            typ_budgetline_related: budgetLineRelared[0].amount_budgeted._id
        }).then(() => {
            setFormData({ ...formData, description: "", transfer_type: "", amount: "", date_transfer: "", type_budgetline_related: "" });
            getBudgetLine(idBudgetLine).then(() =>
                getTransfers(idBudgetLine)).catch(err => console.log(err));
        }).catch((err) => console.log(err));
    }

    const deleteTransfer = (e, id) => {
        e.preventDefault();
        //alert(id);
        // alert(budgetLine._id);
        deleteTransfers(id).then(() => getBudgetLine(idBudgetLine).then(() => { getTransfers(idBudgetLine); })).catch(err => console.log(err))
    }
    //console.log(budgetLine);
    return (

        <div className="card mt-5">
            {!budgetLine ? (<spinner />) : (<div className="card-header bg-color-secondary">
                <div className="row">
                    <div className="col-6"><h3>Line Item: <span className="text-light"> {budgetLine.name}</span></h3></div>
                    <div className="col-3"><h3>Budgeted: <span className="text-light">{FormatNumber({ prefix: "$" })(budgetLine.amount_budgeted.$numberDecimal)}</span></h3></div>
                    <div className="col-3"><h3>Spent: <span className="text-light">{FormatNumber({ prefix: "$" })(budgetLine.amount_spent.$numberDecimal)}</span></h3></div>
                </div>
                <div className="row">
                    <div className="col-12 text-left">
                        <h2><Link to="/Dashboard" className="text-color-dark"><i className="fa fa-arrow-circle-left  border-dark" aria-hidden="true"></i>Back to Budget</Link></h2>
                    </div>
                </div>
            </div>)}

            <div className="card-body mx-auto">

                <form onSubmit={e => handleFormSubmit(e)} className="form-inline">
                    <input className="form-control" type="text" value={description} onChange={e => inputChange(e)} name="description" placeholder="Movement description (requiered)" required />
                    <select className="form-control" value={transfer_type} onChange={e => inputChange(e)} name="transfer_type" placeholder="payment/income" required>
                        <option value="" disabled>select one</option>
                        <option value="from">from</option>
                        <option value="to">to</option>
                    </select>
                    <select className="form-control" value={type_budgetline_related} onChange={e => inputChange(e)}
                        name="type_budgetline_related">
                        <option value="" disabled>select budget line</option>
                        {budgetLines.map((line) => {
                            return <option key={line._id} value={line._id}>
                                {line.name} budgeted: {FormatNumber({ prefix: "$" })(line.amount_budgeted.$numberDecimal)} spent: {FormatNumber({ prefix: "$" })(line.amount_spent.$numberDecimal)}
                            </option>
                        })}
                    </select>
                    <input className="form-control" type="date" value={date_transfer} onChange={e => inputChange(e)} name="date_transfer" placeholder="movement date" required />
                    <input className="form-control" type="number" value={amount} onChange={e => inputChange(e)} name="amount" placeholder="0.00" step="0.01" required />
                    <button type="submit" className="btn bg-color-secondary btn-xs"
                        data-tooltip="Add Item">
                        <i className="fa fa-plus-square" aria-hidden="true"></i>
                    </button>
                </form>
            </div>
            <div className="card-body border-top border-bottom bg-light">
                <div className="row">
                    <div className="col-10">
                        <div className="row font-weight-bold">
                            <div className="col-4 m-0 pr-0" ><label htmlFor="name">Description</label></div>
                            <div className="col-2 m-0 p-0 text-center"><label htmlFor="transfer_type">Transfer Type</label></div>
                            <div className="col-2 m-0 pr-0"><label htmlFor="date_transfer">Transfer Date</label></div>
                            <div className="col-2 m-0 text-center p-0"><label htmlFor="amount">Amount</label></div>
                            <div className="1"></div>
                        </div>
                    </div>
                </div>

            </div>
            <div className="card-body">
                {Transfers.length ? (
                    <form className="ui form">

                        {Transfers.map(trans => (
                            <div key={trans._id}>
                                <div className="row">
                                    <div className="col-10">
                                        <div className="row border">
                                            <div className="col-4 border-right"><p>{trans.description} </p></div>
                                            <div className="col-2 border-right text-center"><p>{trans.transfer_type} </p></div>
                                            <div className="col-4 border-right">{trans.type_budgetline_related.name}</div>
                                            <div className="col-2 border-right"><p>{Moment(trans.date_transfer).format("l")} </p></div>
                                            <div className="col-2 border-right"><p>{FormatNumber({ prefix: "$" })(trans.amount.$numberDecimal)} </p></div>
                                        </div>
                                    </div>
                                    <div className="col-2">
                                        <button type="submit" className="btn btn-danger" onClick={(e) => deleteTransfer(e, trans._id, trans.type_budgetline)} data-toggle="tooltip" data-placement="top" title="delete movement line">
                                            <i className="fa fa-minus-square" aria-hidden="true"></i>
                                        </button>
                                        <button type="submit" className="btn bg-color-secondary" onClick={(e) => deleteTransfer(e, trans._id, trans.type_budgetline)} data-toggle="tooltip" data-placement="top" title="Edit movement line">
                                            <i className="fa fa-pencil-square" aria-hidden="true"></i>
                                        </button>
                                    </div>

                                </div>
                            </div>
                        ))} </form>
                ) : (<h3>No transfer lines for this line</h3>)}
            </div>
        </div >

    )
}


Transfers.propTypes = {
    getBudgetLine: PropTypes.func.isRequired,
    postTransfers: PropTypes.func.isRequired,
    getTransfers: PropTypes.func.isRequired,
    deleteTransfers: PropTypes.func.isRequired,
    transfers: PropTypes.object.isRequired
}
const mapStateToProps = state => ({
    budgetline: state.budgetline,
    transfers: state.transfers
});
export default connect(mapStateToProps,
    { postTransfers, getTransfers, deleteTransfers, getBudgetLine })(Transfers);