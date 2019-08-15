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
        type: Schema.Types.Decimal128,
        required: true
    }
});
const Movement = mongoose.model("Movement", movementSchema);
module.exports = Movement;