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
                <div className="ui sizer vertical segment">
                    <h1 className="ui large header">
                        <span className="ui blue header">Line Item Name: <span className="ui red header">&nbsp;{this.state.budgetline.name}&nbsp;</span>
                            Amount Budgeted: <span className="ui red header">&nbsp;{this.state.budgetline.amount_budgeted}&nbsp;</span>
                            Spent: <span className="ui red header">&nbsp;{this.state.budgetline.amount_spent}</span>
                        </span>
                    </h1>
                    <h3><Link to="/Dashboard"><i className="arrow circle left icon"></i>Back to Budget</Link></h3>
                </div>
                <div className="ui sizer vertical segment">
                    <h1 className="ui center aligned header">Add Movements to Track Spenses </h1>
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
                                    required
                                /></div>
                            <div className="two wide field">
                                <select value={this.state.movement_type} onChange={this.handleInputChange} name="movement_type" placeholder="payment/income" className="budgetlineinput" required>
                                    <option value="in">In</option>
                                    <option value="out">Out</option>
                                </select>
                            </div>
                            <div className="three wide field">
                                <input
                                    type="date"
                                    value={this.state.date_movement}
                                    onChange={this.handleInputChange}
                                    name="date_movement"
                                    placeholder="movement date"
                                    required
                                />
                            </div>
                            <div className="two wide field">
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
                            <div className="three wide field">
                                <button type="submit" className="ui left labeled icon button" onClick={this.handleFormSubmit}>
                                    <i className="save icon"></i>movement
                                </button>
                            </div>
                        </div>
                        <div className="inline fields">
                            <div className="five wide field">
                                <label htmlFor="description">Movement Description</label>
                            </div>
                            <div className="two wide field">
                                <label htmlFor="movement_type">Type</label>
                            </div>
                            <div className="three wide field">
                                <label htmlFor="date_movement">Date of movement</label>
                            </div>
                            <div className="three wide field">
                                <label htmlFor="amount">Amount</label>
                            </div>
                        </div>
                    </form>
                </div>
                <div className="ui segment">
                    {this.state.movements.length ? (
                        <div>
                            {this.state.movements.map(move => (
                                <form className="ui form" key={move._id}>
                                    <div className="inline fields">
                                        <div className="five wide field"><input value={move.description} /></div>
                                        <div className="two wide field"><input value={move.movement_type} /></div>
                                        <div className="three wide field"><input value={move.date_movement} /></div>
                                        <div className="three wide field"><input value={move.amount} /></div>
                                    </div>
                                </form>
                            ))} </div>
                    ) : (<h3>No movement lines for this line</h3>)}
                </div>
            </div>
        )
    }
}

export default Movements;