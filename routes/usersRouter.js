const express = require("express");
const userRouter = express.Router();
const User = require("../models/userSchema");
const {
  getUserById,
  postUser,
  getUsers,
  getPlantsByUserId,
  deletePlant,
  patchPlant
} = require("../controllers/userController");

userRouter.route("/:username").get(getUserById);

userRouter.route("/").post(postUser).get(getUsers);

userRouter.route("/:username/plants").get(getPlantsByUserId);

userRouter.route("/:username/plants/:plant_id").delete(deletePlant).patch(patchPlant);

module.exports = userRouter;
