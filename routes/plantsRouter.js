const express = require("express");
const plantsRouter = express.Router();
const Plant = require("../models/plantSchema");
const User = require("../models/userSchema");
const {
  postPlant,
  getPlants,
  getPlantsByUserId,
} = require("../controllers/plantControllers");

plantsRouter.route("/").post(postPlant).get(getPlants);

plantsRouter.route("/:username").get(getPlantsByUserId);

module.exports = plantsRouter;
