const express = require("express");
const userRouter = express.Router();
const User = require("../models/userSchema");


userRouter.route("/:_id")
.get(async (req, res) => {
  const { _id } = req.params;
  const id = _id;
  try {
    const user = await User.findById(id)
    .populate("plants")
    user.save()
    res.status(200).send(user);
  } catch (err) {
    console.log(err);
    res.status(500).send("Error getting user");
  }
});


userRouter.route("/")
  .post(async (req, res) => {
    const { username, email } = req.body;
    try {
      const data = await User.create({
        username: username,
        email: email
      });
      res.status(201).send(data);
    } catch (err) {
      console.log(err);
      res.status(500).send("Error creating user");
    }
  })
  .get(async (req, res) => {
    try {
      const data = await User.find();
      res.status(200).send(data);
    } catch (err) {
      console.log(err);
      res.status(500).send("Error getting users");
    }
  });


userRouter
  .route("/:id/plants")
  .get(async (req, res) => {})
  .post(async (req, res) => {});


userRouter
  .route("/:id/plants/:id")
  .get(async (req, res) => {})
  .patch(async (req, res) => {})
  .delete(async (req, res) => {});

module.exports = userRouter;

