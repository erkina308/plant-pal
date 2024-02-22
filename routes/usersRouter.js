const express = require("express");
const userRouter = express.Router();
const User = require("../models/userSchema");
const {
  getUserById,
  postUser,
  getUsers,
  getPlantsByUserId
} = require("../controllers/userController");

userRouter.route("/:username").get(getUserById);

userRouter.route("/").post(postUser).get(getUsers);

userRouter.route("/:username/plants").get(getPlantsByUserId);

module.exports = userRouter;
