const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const transferSchema = new Schema({
    type_budgetline: { type: mongoose.Schema.Types.ObjectId, ref: "BudgetLine" },
    description: {
        type: String,
        required: true
    },
    transfer_type: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    date: { type: Date, default: Date.now },
    type_budgetline_related: {
        type: String,
        required: true
    }
});

const Transfer = mongoose.model("Transfer", transferSchema);
module.exports = Transfer;