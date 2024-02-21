const express = require("express");
const { mongoose } = require("../connection.js");

const Plant = require("../models/plantSchema");
const User = require("../models/userSchema");

const postPlant = async (req, res, next) => {
  const { name, description, username } = req.body;
  try {
    const user1 = await User.findOne({ username: username });
    const user_id = user1._id;

    const plant = await Plant.create({
      name: name,
      description: description,
      user_id: user_id,
    });

    const user = await User.findById(user_id);
    user.plants.push(plant._id);
    await user.save();

    res.status(201).send(plant);
  } catch (err) {
    res.status(400).send("Missing Name, User or Description");
    next(err);
  }
};

const getPlants = async (req, res, next) => {
  try {
    const plants = await Plant.find();
    res.status(200).send(plants);
  } catch (err) {
    res.status(404).send("Invalid URL format");
    next(err);
  }
};

const getPlantsByUserId = async (req, res) => {
  const { username } = req.params;
  try {
    const user = await User.findOne({ username: username });
    const user_id = user._id;
    const plants = await Plant.find().where("user_id").equals(user_id);
    res.status(200).send(plants);
  } catch (err) {
    res.status(404).send("Error getting plants");
  }
};
module.exports = { postPlant, getPlants, getPlantsByUserId };
