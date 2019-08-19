const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const movementSchema = new Schema({
    type_budgetline: { type: mongoose.Schema.Types.ObjectId, ref: "BudgetLine" },
    description: {
        type: String,
        required: true
    },
    movement_type: {
        type: String,
        required: true
    },
    amount: {
        type: Schema.Types.Decimal128,
        required: true
    },
    date: { type: Date, default: Date.now }
});
const Movement = mongoose.model("Movement", movementSchema);
module.exports = Movement;