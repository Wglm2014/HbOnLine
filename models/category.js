const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const categorySchema = new Schema({
    name: {
        type: String,
        requiered: true
    },
    description: {
        type: String,
        requiered: true
    },
    super_category: {
        type: String,
        requiered: false
    }
});

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;

