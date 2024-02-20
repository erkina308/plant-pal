const express = require("express");
const mongoose = require("mongoose");
const app = express();
const apiRouter = require("./routes/apiRouter");
app.use(express.json());

require("dotenv").config();

const PORT = 9000;
const mongoString = process.env.DATABASE_URL;
mongoose
  .connect(mongoString)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () =>
      console.log(`Server running on http://localhost:9000`)
    );
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err.message);
  });

app.use("/api", apiRouter);

app.use((err, req, res, next) => {
  if (err.status === 404) {
    res.status(404).send({ msg: err.msg });
  }
  next(err);
});
app.use((err, req, res, next) => {
  if (err.status === 500) {
    res.status(500).send({ msg: err.msg });
  }
  next(err);
});
app.use((err, req, res, next) => {
  if (err.status === 400) {
    res.status(400).send({ msg: err.msg });
  }
  next(err);
});

app.use((err, req, res, next) => {
  if (err.errors.value === undefined) {
    res.status(400).send(err.errors.message);
  }
  next(err);
});

app.use((err, req, res, next) => {
  if (error.name === "MongoServerError" && error.code === 11000) {
    next(new Error("There was a duplicate key error"));
  }
  next(err);
});

module.exports = app;
