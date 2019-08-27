import React, { Component } from "react";
import { Link } from "react-router-dom";
import { getBudgetLine } from "../../utils/budgetline";
import { postMovements, getMovements } from "../../utils/movements";

class Movements extends Component {

    state = {
        movements: [],
        budgetline: {},
        type_budgetline: "",
        description: "",
        movement_type: "",
        amount: "",
        date_movement: ""
    }
    componentDidMount() { this.loadMovements(); }

    loadMovements = () => {
        getBudgetLine(this.props.match.params.id).then((results) => {
            getMovements(this.props.match.params.id)
                .then(res => {
                    this.setState({
                        movements: res.data,
                        budgetline: results,
                        type_budgetline: "",
                        description: "",
                        movement_type: "",
                        amount: "",
                        date_movement: ""
                    });
                })
                .catch(err => console.log(err));
        }).catch(err => console.log(err));
    }

    handleInputChange = e => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    };

    handleFormSubmit = e => {
        e.preventDefault();
        postMovements({
            type_budgetline: this.props.match.params.id,
            description: this.describe,
            movement_type: this.movement_type,
            amount: this.amount,
            date_movement: this.date_movement
        }).then((res) => { this.loadMovements(); })
            .catch((err) => console.log(err));
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <label className="budgetlinelabel">{this.state.budgetline.name}</label>
                        <label className="budgetlinelabel">{this.state.budgetline.amount_budgeted}</label>
                        <label className="budgetlinelabel">{this.state.budgetline.amount_spent}</label>
                        <Link to="/Dashboard">Back to Budget</Link>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <h1>Add Movements to Track Spenses </h1>
                        <form className="form">
                            <input
                                type="text"
                                value={this.state.description}
                                onChange={this.handleInputChange}
                                name="description"
                                placeholder="Movement description (requiered)"
                                className="budgetlineinput"
                                requied
                            />
                            <select value={this.state.movement_type} onChange={this.handleInputChange} name="movement_type" placeholder="payment/income" className="budgetlineinput" requied>
                                <option value="in">In</option>
                                <option value="out">Out</option>
                            </select>
                            <input
                                type="date"
                                value={this.state.date_movement}
                                onChange={this.handleInputChange}
                                name="date_movement"
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
                        <label htmlFor="movement_type" className="budgetlinelabel">income/payment</label>
                        <label htmlFor="payment_date" className="budgetlinelabel">due date</label>
                        <label htmlFor="amount" className="budgetlinelabel">Amount Budgeted</label>
                    </div>
                </div>
                <div className="row">
                    {this.state.movements.length ? (
                        <div>
                            {this.state.movements.map(move => (
                                <div className="col-12" key={move._id}>
                                    <label className="budgetlinelabel">{move.description}</label>
                                    <label className="budgetlinelabel">{move.movement_type}</label>
                                    <label className="budgetlinelabel">{move.payment_date}</label>
                                    <label className="budgetlinelabel">{move.amount}</label>
                                </div>
                            ))} </div>
                    ) : (<h3>Mo movement lines for this line</h3>)}
                </div>

            </div>

        )
    }
}

export default Movements;