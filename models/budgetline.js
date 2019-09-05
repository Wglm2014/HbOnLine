const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const budgetLineSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    type_item: {
        type: String,
        default: "spence"
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
        type: Schema.Types.Decimal128,
        required: true
    },
    amount_spent: {
        type: Schema.Types.Decimal128,
        required: true,
    },
    date: { type: Date, default: Date.now },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
});

const BudgetLine = mongoose.model("BudgetLine", budgetLineSchema);

module.exports = BudgetLine;