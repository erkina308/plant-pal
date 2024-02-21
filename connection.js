const mongoose = require("mongoose");
const express = require("express");
const app = require("./app.js");
require("dotenv").config();

const PORT = 9000;
const mongoString = process.env.DATABASE_URL;
mongoose
  .connect(mongoString)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => console.log(`Listening on ${PORT}...`));
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err.message);
  });

module.exports = { mongoose };
