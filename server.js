const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes");
const connectDB = require("./config/db");
const PORT = process.env.PORT || 3001;
const app = express();

connectDB();
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
