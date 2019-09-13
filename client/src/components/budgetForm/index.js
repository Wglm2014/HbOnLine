import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Moment from "moment";
import FormatNumber from "format-number";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getBudgetLine, postBudgetLine, deleteBudgetLine, setIdBudget } from "../../actions/budgetline";

const BudgetLine = ({ setIdBudget, postBudgetLine, getBudgetLine, deleteBudgetLine, budgetline: { budgetLines, loading } }) => {
    useEffect(() => {
        getBudgetLine(null);
    }, [getBudgetLine]);

    const [formData, setFormData] = useState({
        name: "",
        type_item: "",
        period: "",
        payment_date: "",
        amount_budgeted: ""
    });

    const {
        name,
        type_item,
        period,
        payment_date,
        amount_budgeted
    } = formData;

    const inputChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFormSubmit = e => {
        e.preventDefault();
        let anualAmount = 0;
        switch (period) {
            case "every month":
                anualAmount = 12;
                break;
            case "every other month":
                anualAmount = 6;
                break;
            case "quaterly":
                anualAmount = 4;
                break;
            case "every 4 months":
                anualAmount = 3;
                break;
            case "twice a year":
                anualAmount = 2;
                break;
            case "once a year":
                anualAmount = 1;
                break;
            default:
        }
        anualAmount = amount_budgeted * anualAmount;
        postBudgetLine({
            name: formData.name,
            type_item: formData.type_item,
            period: formData.period,
            payment_date: formData.payment_date,
            amount_budgeted: anualAmount
        }).then(response => {
            setFormData({ ...formData, name: "", type_item: "", period: "", payment_date: "", amount_budgeted: "" });
            getBudgetLine(null);
        });

    }

    const deleteLine = idline => {
        console.log("before delete");
        deleteBudgetLine(idline).then(res => {
            console.log(res);
            setFormData({ ...formData, name: "", type_item: "", period: "", payment_date: "", amount_budgeted: "" });
            getBudgetLine(null);
        }).catch(err => {
            console.log(err);

        })

    }


    return (
        <Fragment>
            <div className="card mt-5">
                <div className="card-header text-center bg-color-secondary">
                    <h1 className="x-large">Create Your Budget Items</h1>
                </div>

                <div className="card-body mx-auto">
                    <form onSubmit={e => handleFormSubmit(e)} className="form-inline">
                        <input className="form-control description" type="text" value={name} onChange={e => inputChange(e)} name="name" placeholder="Budge Line Item (required)" required />

                        <select className="form-control" value={type_item} onChange={e => inputChange(e)} name="type_item" required>
                            <option value="" disabled>item type</option>
                            <option value="spence" >spence</option>
                            <option value="income">income</option>
                        </select>

                        <select className="form-control" value={period} onChange={e => inputChange(e)} name="period" required>
                            <option value="" disabled>select period</option>
                            <option value="every month" >every month</option>
                            <option value="every other month">every other month</option>
                            <option value="quaterly">quaterly</option>
                            <option value="every 4 months">every 4 months</option>
                            <option value="twice a year">twice a year</option>
                            <option value="once a year">once a year</option>
                        </select>

                        <input className="form-control text-center" type="date" value={payment_date} onChange={e => inputChange(e)} name="payment_date" placeholder="last day to pay" required />

                        <input className="form-control text-right" type="number" value={amount_budgeted} onChange={e => inputChange(e)} name="amount_budgeted" placeholder="0.00" step="0.01" required />

                        <button type="submit" className="btn btn-primary bg-color-secondary btn-xs" data-toggle="tooltip" data-placement="top" title="Add/save Line Item">
                            <i className="fa fa-plus-square" aria-hidden="true"></i>
                        </button>
                    </form>
                </div>
                <div className="card-body border-top border-bottom bg-color-light">
                    <div className="row p-0">
                        <div className="col-10">
                            <div className="row p-0">
                                <div className="col-4 m-0 pr-0 font-weight-bold" ><label htmlFor="name">Line Item</label></div>
                                <div className="col-1 m-0 p-0 text-center font-weight-bold"><label htmlFor="type_item">Type Item</label></div>
                                <div className="col-2 m-0 pr-0 text-center font-weight-bold"><label htmlFor="period">Period</label></div>
                                <div className="col-1 m-0 text-center p-0 font-weight-bold"><label htmlFor="payment_date">Due Date</label></div>
                                <div className="col-2 text-center m-0 pl-0 font-weight-bold"><label htmlFor="amount_budgeted">Budgeted</label></div>
                                <div className="col-1 text-right m-0 pl-0 font-weight-bold"><label htmlFor="amount_spent">Spent</label></div>
                                <div className="1"></div>
                            </div>
                        </div>
                    </div>

                </div>
                <div className="card-body">
                    {budgetLines.length ? (
                        <div >

                            {budgetLines.map(line => (
                                <div className="row m-0 p-0 mb-2" key={line._id}>
                                    <div className="col-10 m-0 p-0">
                                        <div className="row m-0 p-0 border">
                                            <div className="col-3 border-right m-0 pr-0"><p>{line.name} </p></div>
                                            <div className="col-1 border-right m-0 p-0 text-center" ><p>{line.type_item} </p></div>
                                            <div className="col-2 border-right m-0 pr-0"><p>{line.period} </p></div>
                                            <div className="col-2 border-right m-0 text-center p-0"><p>{Moment(line.payment_date).format("l")} </p></div>
                                            <div className="col-2 text-right border-right m-0 pl-0"><p>{FormatNumber({ prefix: "$" })(line.amount_budgeted.$numberDecimal)} </p></div>
                                            <div className="col-2 text-right m-0 pl-0"><p>{FormatNumber({ prefix: "$" })(line.amount_spent.$numberDecimal)} </p></div>
                                        </div>
                                    </div>
                                    <div className="col-2 m-0 p-0">
                                        <button type="submit" className="btn btn-primary" onClick={() => deleteLine(line._id)} data-toggle="tooltip" data-placement="top" title="delete line">
                                            <i className="fa fa-pencil-square" aria-hidden="true"></i>
                                        </button>
                                        <button type="submit" className="btn btn-danger" onClick={() => deleteLine(line._id)} data-toggle="tooltip" data-placement="top" title="Update line">
                                            <i className="fa fa-minus-square" aria-hidden="true"></i>
                                        </button>

                                        <Link to="/movementsform" onClick={() => { setIdBudget(line._id); getBudgetLine(line._id); }}
                                            className="btn btn-info" data-toggle="tooltip" data-placement="top" title="Add movements for this Line Item" >
                                            M
                                        </Link>

                                        <Link to="/transfesform" onClick={() => setIdBudget(line._id)}
                                            className="btn btn-info" data-toggle="tooltip" data-placement="top" title="Make Transfers Between Line Items">
                                            <i className="fa fa-exchange" aria-hidden="true"></i>
                                        </Link>
                                    </div>

                                </div>
                            ))}  </div>
                    ) : (<h3>No Budget Lines added Yet</h3>)}
                </div >
            </div >
        </Fragment >


    )
}


BudgetLine.propTypes = {
    postBudgetLine: PropTypes.func.isRequired,
    getBudgetLine: PropTypes.func.isRequired,
    deleteBudgetLine: PropTypes.func.isRequired,
    setIdBudget: PropTypes.func.isRequired,
    budgetline: PropTypes.object.isRequired
}
const mapStateToProps = state => ({
    budgetline: state.budgetline
});
export default connect(mapStateToProps,
    { postBudgetLine, getBudgetLine, deleteBudgetLine, setIdBudget })(BudgetLine);