const Plant = require("../models/plantSchema");
const User = require("../models/userSchema");

const postPlant = async (req, res, next) => {
  const {
    name,
    species,
    description,
    username,
    food_inc,
    water_inc,
    image_url,
  } = req.body;
  console.log(req.body.species);
  try {
    const user1 = await User.findOne({ username: username });
    const user_id = user1._id;
      console.log(user1._id, "_ID")
    const plant = await Plant.create({
      name: name,
      species: species,
      description: description,
      user_id: user_id,
      image_url: image_url,
      waterDate: Date.now() + Number(water_inc) * (24 * 3600000),
      waterInterval: Number(water_inc) * (24 * 3600000),
      foodDate: Date.now() + Number(food_inc) * (24 * 3600000),
      foodInterval: Number(food_inc) * (24 * 3600000),
    });

    const user = await User.findById(user_id);
    user.plants.push(plant._id);
    console.log(plant, "Plant")

    await user.save();
    res.status(201).send({ plant: plant });
  } catch (err) {
    if (
      !name ||
      !species ||
      !description ||
      !username ||
      !food_inc ||
      !water_inc ||
      !image_url
    ) {
      res.status(400).send("Missing Input Value");
    }
    next(err);
  }
};

const getPlants = async (req, res, next) => {
  try {
    const plants = await Plant.find();
    res.status(200).send({ plants: plants });
  } catch (err) {
    next(err);
  }
};

const getPlantById = async (req, res, next) => {
  const { plant_id } = req.params;
  try {
    const plant = await Plant.findById(plant_id);
    if (!plant) {
      return res.status(404).send({ err: "plant ID not found" });
    }
    res.status(200).send({ plant: plant });
  } catch (err) {
    res.status(404).send("Error getting plants");
    next(err);
  }
};

module.exports = {
  postPlant,
  getPlants,
  getPlantById,
};
