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
        console.log(this.props.match.params.id);
        getBudgetLine(this.props.match.params.id).then((results) => {
            console.log(results.data);
            getMovements(this.props.match.params.id)
                .then(res => {
                    this.setState({
                        movements: res.data,
                        budgetline: results.data[0],
                        type_budgetline: "",
                        description: "",
                        movement_type: "",
                        amount: "",
                        date_movement: ""
                    });
                }).catch(err => console.log(err));
        }).catch(err => {
            console.log("error");
            console.log(err)
        });
    }

    handleInputChange = e => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    };

    handleFormSubmit = e => {
        e.preventDefault();
        postMovements({
            type_budgetline: this.props.match.params.id,
            description: this.state.description,
            movement_type: this.state.movement_type,
            amount: this.state.amount,
            date_movement: this.state.date_movement,
            amount_spent: this.state.budgetline.amount_spent
        }).then((res) => { this.loadMovements(); })
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
                <div className="row text-center"><div className="col-12"><h1>Add Movements to Track Spenses </h1></div></div>
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
                                    <select value={this.state.movement_type} onChange={this.handleInputChange} name="movement_type" placeholder="payment/income" className="budgetlineinput" required>
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
                                <label htmlFor="date_movement" className="budgetlinelabel">movement date</label>
                                <label htmlFor="amount" className="budgetlinelabel">amount payed</label>
                            </div>
                        </div>
                    </div>
                    <div className="card-body">
                        <div className="row">
                            {this.state.movements.length ? (
                                <div>
                                    {this.state.movements.map(move => (
                                        <div className="col-12" key={move._id}>
                                            <label className="budgetlinelabel">{move.description}</label>
                                            <label className="budgetlinelabel">{move.movement_type}</label>
                                            <label className="budgetlinelabel">{move.date_movement}</label>
                                            <label className="budgetlinelabel">{move.amount}</label>
                                        </div>
                                    ))} </div>
                            ) : (<h3>No movement lines for this line</h3>)}
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}

export default Movements;