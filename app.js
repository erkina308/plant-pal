const express = require("express");
const app = express();
const { connectDb } = require("./connection");
const apiRouter = require("./routes/apiRouter");
app.use(express.json());

app.use("/api", apiRouter);
connectDb();
// Error handling middleware
app.use((err, req, res, next) => {
  if (err instanceof MongooseError) {
    // Mongoose timeout error
    console.error("Mongoose timeout error:", err.message);
    res.status(500).send("Database operation timed out");
  } else {
    // Other types of errors
    console.error(err.stack);
    res.status(500).send("Something went wrong");
  }
});

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

// app.use((err, req, res, next) => {
//   if (err.errors.value === undefined) {
//     res.status(400).send(err.errors.message);
//   }
//   next(err);
// });

app.use((err, req, res, next) => {
  if (err.name === "MongoServerError" && err.code === 11000) {
    next(new Error("There was a duplicate key error"));
  }
  next(err);
});
module.exports = app;
