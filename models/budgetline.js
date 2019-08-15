const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const budgetLineSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    amount: {
        type: Schema.Types.Decimal128,
        required: true
    }
});

const BudgetLine = mongoose.model("BudgetLine", budgetLineSchema);

module.exports = BudgetLine;