const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const budgetLineSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    period: {
        type: String,
        required: true,
        default: "month"
    },
    payment_date: {
        type: Date,
        required: true
    },
    amount_budgeted: {
        type: Number,
        required: true
    },
    amount_spent: {
        type: Number,
        required: true,
    },
    date: { type: Date, default: Date.now },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
});

const BudgetLine = mongoose.model("BudgetLine", budgetLineSchema);

module.exports = BudgetLine;