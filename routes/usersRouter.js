const express = require("express");
const userRouter = express.Router();
const User = require("../models/userSchema");
const {
  getUserById,
  postUser,
  getUsers,
} = require("../controllers/userController");

userRouter.route("/:user_id").get(getUserById);

userRouter.route("/").post(postUser).get(getUsers);

module.exports = userRouter;
