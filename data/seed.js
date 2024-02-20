require("dotenv").config();
const mongoose = require("mongoose");
const Plant = require("../models/plantSchema.js");
const User = require("../models/userSchema.js");
const plantData = require("./plants.json");
const userData = require("./users.json");

const seed = async () => {
  try {
    await User.deleteMany();
    await Plant.deleteMany();

    const users = await User.create(userData);
    // const plantPromises = plantData.map(async (plant, index) => {

    // })
    const plant1 = await Plant.create({
      name: plantData[0].name,
      description: plantData[0].description,
      user_id: users[0]._id,
    });
    const plant2 = await Plant.create({
      name: plantData[1].name,
      description: plantData[1].description,
      user_id: users[0]._id,
    });
    const plant3 = await Plant.create({
      name: plantData[2].name,
      description: plantData[2].description,
      user_id: users[1]._id,
    });
    const plant4 = await Plant.create({
      name: plantData[3].name,
      description: plantData[3].description,
      user_id: users[1]._id,
    });
    const plant5 = await Plant.create({
      name: plantData[4].name,
      description: plantData[4].description,
      user_id: users[1]._id,
    });
    const user0 = await User.findById(users[0]._id);
    if (user0) {
      user0.plants = [plant1._id, plant2._id];
      await user0.save();
    } else {
      console.error("User 0 not found");
    }

    const user1 = await User.findById(users[1]._id);

    if (user1) {
      user1.plants = [plant3._id, plant4._id, plant5._id];
      await user1.save();
    } else {
      console.error("User 1 not found");
    }
  } catch (err) {
    console.error("Error occurred during seeding", error);
  }
};

module.exports = { seed };
