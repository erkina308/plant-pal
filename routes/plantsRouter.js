const express = require("express");
const plantsRouter = express.Router();
const Plant = require("../models/plantSchema");
const User = require("../models/userSchema");
const {
  postPlant,
  getPlants,
  getPlantsByUserId,
  deletePlant,
} = require("../controllers/plantControllers");

plantsRouter.route("/").post(postPlant).get(getPlants);

plantsRouter.route("/:plant_id").delete(deletePlant);

plantsRouter.route("/:username").get(getPlantsByUserId);

module.exports = plantsRouter;
