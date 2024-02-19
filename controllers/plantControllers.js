const express = require("express");
const mongoose = require("mongoose");
const Plant = require("../models/plantSchema");
const User = require("../models/userSchema");

const postPlant = async (req, res) => {
  const { name, description, user_id } = req.body;
  try {
    const plant = await Plant.create({
      name: name,
      description: description,
      user_id: user_id,
    });

    const user = await User.findById(user_id);
    user.plants.push(plant._id);
    user.save();

    res.status(200).send(plant);
  } catch (err) {
    console.log(err);
    res.status(500).send("Error getting user");
  }
};

const getPlants = async (req, res) => {
  try {
    const plants = await Plant.find();
    res.status(200).send(plants);
  } catch (err) {
    console.log(err);
    res.status(500).send("Error getting plant");
  }
};

const getPlantsByUserId = async (req, res) => {
  const { user_id } = req.params;
  try {
    const plants = await Plant.find().where("user_id").equals(user_id);
    res.status(200).send(plants);
  } catch (err) {
    console.log(err);
    res.status(500).send("Error getting plants");
  }
};
module.exports = { postPlant, getPlants, getPlantsByUserId };
