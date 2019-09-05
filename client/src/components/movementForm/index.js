import React, { Component } from "react";
import { Link } from "react-router-dom";
import Moment from "moment";
import FormatNumber from "format-number";
import { getBudgetLine } from "../../utils/budgetline";
import { postMovements, getMovements, deleteMovements } from "../../utils/movements";

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
        //  console.log(this.props.match.params.id);
        getBudgetLine(this.props.match.params.id).then((results) => {
            // console.log(results.data);
            getMovements(this.props.match.params.id)
                .then(res => {
                    //     console.log(res.data);
                    this.setState({
                        movements: res.data,
                        budgetline: results.data[0],
                        type_budgetline: "",
                        description: "",
                        movement_type: "",
                        amount: "",
                        date_movement: "",
                        amount_budgeted: results.data[0].amount_budgeted.$numberDecimal,
                        amount_spent: results.data[0].amount_spent.$numberDecimal
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
        //console.log(this.props.match.params.id);
        postMovements({
            type_budgetline: this.props.match.params.id,
            description: this.state.description,
            movement_type: this.state.movement_type,
            amount: this.state.amount,
            date_movement: this.state.date_movement,
            type_item: this.state.budgetline.type_item,
            amount_spent: this.state.amount_spent
        }).then((res) => { this.loadMovements(); })
            .catch((err) => console.log(err));
    }

    deleteMovement = (id) => {
        deleteMovements(id).then(res => {
            this.loadBudgetLines();
        }).catch(err => console.log(err))
    }
    render() {
        return (
            <div className="container">
                <div className="ui sizer vertical segment">
                    <h1 className="ui large header">
                        <span className="ui blue header">Name: <span className="ui red header">&nbsp;{this.state.budgetline.name}&nbsp;</span>
                            Budgeted: <span className="ui red header">&nbsp;{FormatNumber({ prefix: "$" })(this.state.amount_budgeted)}&nbsp;</span>
                            Spent: <span className="ui red header">&nbsp;{FormatNumber({ prefix: "$" })(this.state.amount_spent)}</span>
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
                            <div className="five wide field"><label htmlFor="description">Movement Description</label></div>
                            <div className="two wide field"><label htmlFor="movement_type">Type</label></div>
                            <div className="three wide field"><label htmlFor="date_movement">Date of movement</label></div>
                            <div className="three wide field"><label htmlFor="amount">Amount</label></div>
                        </div>
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
                                    <option value="" disabled>select one</option>
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
                            <div className="three wide field">
                                <button type="submit" className="ui icon button" onClick={this.handleFormSubmit} data-tooltip="Save Movement">
                                    <i className="save icon"></i>
                                </button>
                            </div>
                        </div>

                    </form>
                </div>
                <div className="ui segment">
                    {this.state.movements.length ? (
                        <form className="ui form">
                            <div className="inline fields">
                                <div className="five wide field"><label htmlFor="description">Movement Description</label></div>
                                <div className="two wide field"><label htmlFor="movement_type">Type</label></div>
                                <div className="three wide field"><label htmlFor="date_movement">Date of movement</label></div>
                                <div className="three wide field"><label htmlFor="amount">Amount</label></div>
                            </div>
                            {this.state.movements.map(move => (
                                <div key={move._id}>
                                    <div className="inline fields">
                                        <div className="five wide field"><input type="text" value={move.description} /></div>
                                        <div className="two wide field"><input type="text" value={move.movement_type} /></div>
                                        <div className="three wide field"><input type="text" value={Moment(move.date_movement).format("l")} /></div>
                                        <div className="three wide field"><input value={FormatNumber({ prefix: "$" })(move.amount.$numberDecimal)} /></div>
                                        <button type="submit" className="ui icon button" onClick={() => this.deleteMovement(move._id)} data-tooltip="Delete Item">
                                            <i class="erase icon"></i>
                                        </button>
                                    </div>
                                    <div className="ui divider"></div>
                                </div>
                            ))} </form>
                    ) : (<h3>No movement lines for this line</h3>)}
                </div>
            </div>
        )
    }
}

export default Movements;