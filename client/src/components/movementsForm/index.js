import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Moment from "moment";
import FormatNumber from "format-number";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getBudgetLine } from "../../actions/budgetline";
import { postMovements, getMovements, deleteMovements } from "../../actions/movements";
import spinner from "../spinner";

const Movements = ({ getBudgetLine, postMovements, getMovements, deleteMovements, budgetline: { idBudgetLine, budgetLine, loading }, movements: { Movements } }) => {

    useEffect(() => {
        alert(idBudgetLine);
        if (idBudgetLine) {
            //alert(idBudgetLine);
            getBudgetLine(idBudgetLine);
            getMovements(idBudgetLine);
        }

    }, [getMovements, getBudgetLine]);

    const [formData, setFormData] = useState({
        description: "",
        movement_type: "",
        amount: "",
        date_movement: ""
    });
    const {
        description,
        movement_type,
        amount,
        date_movement
    } = formData;


    const inputChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };


    const handleFormSubmit = e => {
        e.preventDefault();
        //console.log(this.props.match.params.id);
        postMovements({
            type_budgetline: idBudgetLine,
            description: description,
            movement_type: movement_type,
            amount: amount,
            date_movement: date_movement,
            type_item: budgetLine.type_item,
            amount_spent: budgetLine.amount_spent.$numberDecimal
        }).then(() => {
            getBudgetLine(idBudgetLine).then(() => getMovements(idBudgetLine)).catch(err => console.log(err));
        }).catch((err) => console.log(err));
    }

    const deleteMovement = (e, id) => {
        e.preventDefault();
        //alert(id);
        // alert(budgetLine._id);
        deleteMovements(id).then(() => getBudgetLine(idBudgetLine).then(() => { getMovements(idBudgetLine); alert("came back"); })).catch(err => console.log(err))
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
                    <select className="form-control" value={movement_type} onChange={e => inputChange(e)} name="movement_type" placeholder="payment/income" required>
                        <option value="" disabled>select one</option>
                        <option value="in">In</option>
                        <option value="out">Out</option>
                    </select>
                    <input className="form-control" type="date" value={date_movement} onChange={e => inputChange(e)} name="date_movement" placeholder="movement date" required />
                    <input className="form-control" type="number" value={amount} onChange={e => inputChange(e)} name="amount" placeholder="0.00" step="0.01" required />
                    <button type="submit" className="btn bg-color-secondary btn-xs" data-tooltip="Add Item"><i className="fa fa-plus-square" aria-hidden="true"></i></button>
                </form>
            </div>
            <div className="card-body border-top border-bottom bg-light">
                <div className="row">
                    <div className="col-10">
                        <div className="row font-weight-bold">
                            <div className="col-4 m-0 pr-0" ><label htmlFor="name">Description</label></div>
                            <div className="col-2 m-0 p-0 text-center"><label htmlFor="type_item">Movement Type</label></div>
                            <div className="col-2 m-0 pr-0"><label htmlFor="period">Movement Date</label></div>
                            <div className="col-2 m-0 text-center p-0"><label htmlFor="payment_date">Amount</label></div>
                            <div className="1"></div>
                        </div>
                    </div>
                </div>

            </div>
            <div className="card-body">
                {Movements.length ? (
                    <form className="ui form">

                        {Movements.map(move => (
                            <div key={move._id}>
                                <div className="row">
                                    <div className="col-10">
                                        <div className="row border">
                                            <div className="col-4 border-right"><p>{move.description} </p></div>
                                            <div className="col-2 border-right text-center"><p>{move.movement_type} </p></div>
                                            <div className="col-2 border-right"><p>{Moment(move.date_movement).format("l")} </p></div>
                                            <div className="col-2 border-right"><p>{FormatNumber({ prefix: "$" })(move.amount.$numberDecimal)} </p></div>
                                        </div>
                                    </div>
                                    <div className="col-2">
                                        <button type="submit" className="btn btn-danger" onClick={(e) => deleteMovement(e, move._id, move.type_budgetline)} data-toggle="tooltip" data-placement="top" title="delete movement line">
                                            <i className="fa fa-minus-square" aria-hidden="true"></i>
                                        </button>
                                        <button type="submit" className="btn bg-color-secondary" onClick={(e) => deleteMovement(e, move._id, move.type_budgetline)} data-toggle="tooltip" data-placement="top" title="Edit movement line">
                                            <i className="fa fa-pencil-square" aria-hidden="true"></i>
                                        </button>
                                    </div>

                                </div>
                            </div>
                        ))} </form>
                ) : (<h3>No movement lines for this line</h3>)}
            </div>
        </div >

    )
}


Movements.propTypes = {
    getBudgetLine: PropTypes.func.isRequired,
    postMovements: PropTypes.func.isRequired,
    getMovements: PropTypes.func.isRequired,
    deleteMovements: PropTypes.func.isRequired,
    idbudgetline: PropTypes.object.isRequired,
    movements: PropTypes.object.isRequired
}
const mapStateToProps = state => ({
    budgetline: state.budgetline,
    movements: state.movements
});
export default connect(mapStateToProps,
    { postMovements, getMovements, deleteMovements, getBudgetLine })(Movements);