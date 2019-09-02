const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const movementSchema = new Schema({
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
    date_movement: { type: Date, default: Date.now },
    type_budgetline: { type: mongoose.Schema.Types.ObjectId, ref: "BudgetLine" }
});
const Movement = mongoose.model("Movement", movementSchema);
module.exports = Movement;