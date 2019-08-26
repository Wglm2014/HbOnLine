const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const transferSchema = new Schema({
    description: {
        type: String,
        required: true
    },
    movement_type: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    budget_line_from: {
        type: String,
        required: true
    },
    budget_line_to: {
        type: String,
        required: true
    },
    date: { type: Date, default: Date.now }
});

const Transfer = mongoose.model("Transfer", transferSchema);
module.exports = Transfer;