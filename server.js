const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes");
const PORT = process.env.PORT || 3002;
const app = express();
require("dotenv").config();

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/hbonline_db";
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useCreateIndex: true });

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(static("client/build"));
}

app.use(routes);

app.listen(PORT, function () {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});
