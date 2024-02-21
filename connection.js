const mongoose = require("mongoose");
const express = require("express");
require("dotenv").config({
  path: `${__dirname}/.env.production`,
});

const mongoString = process.env.DATABASE_URL;

mongoose
  .connect(mongoString)
  .then(() => {
    console.log("Connected to MongoDB");
  })

  .catch((err) => {
    console.error("MongoDB connection error:", err.message);
  });

module.exports = { mongoose };
