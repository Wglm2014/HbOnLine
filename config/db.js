const mongoose = require("mongoose");
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/hbonline_db";
const connectDb = async () => {
    try {
        mongoose.connect(MONGODB_URI, { useNewUrlParser: true });
    } catch (err) {
        console.error((err.message));
        process.exit(1);
    }
}
module.exports = connectDb;