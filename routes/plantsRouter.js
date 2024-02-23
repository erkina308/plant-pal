const express = require("express");
const plantsRouter = express.Router();
const Plant = require("../models/plantSchema");
const User = require("../models/userSchema");
const {
  postPlant,
  getPlants,
  deletePlant,
} = require("../controllers/plantControllers");

plantsRouter.route("/").post(postPlant).get(getPlants);

plantsRouter.route("/:plant_id").get(deletePlant);

module.exports = plantsRouter;
