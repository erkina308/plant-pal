const User = require("../models/userSchema");
const Plant = require("../models/plantSchema");
const getUserById = async (req, res, next) => {
  const { username } = req.params;
  try {
    const user = await User.findOne({ username: username }).populate("plants");
    await user.save();
    res.status(200).send({ user: user });
  } catch (err) {
    res.status(404).send("User does not exist");
    next(err);
  }
};
const postUser = async (req, res, next) => {
  const { username, email } = req.body;
  try {
    const user = await User.create({
      username: username,
      email: email,
    });
    res.status(201).send({ user: user });
  } catch (err) {
    if (!email) {
      res.status(400).send("Missing Email");
    } else if (!username) {
      res.status(400).send("Missing Username");
    }
    next(err);
  }
};
const getUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).send({ users: users });
  } catch (err) {
    // res.status(404).send("Invalid URL format");
    next(err);
  }
};

const getPlantsByUserId = async (req, res, next) => {
  const { username } = req.params;
  try {
    const user = await User.findOne({ username: username }).populate("plants");
    res.status(200).send({ plants: user.plants });
  } catch (err) {
    res.status(404).send("Error getting plants");
    next(err);
  }
};
const deletePlant = async (req, res, next) => {
  const { username, plant_id } = req.params;

  try {
    // const plant = await Plant.find({ _id: plant_id });
    // if (!plant.length) {
    //   return Promise.reject({ status: 404, text: `Plant doesn't exist` });
    // }

    await Plant.findByIdAndDelete(plant_id);
    const user = await User.findOne({ username: username });

    user.plants = user.plants.filter((plant) => {
      return plant._id.toString() !== plant_id;
    });

    await user.save();

    res.status(204).send();
  } catch (err) {
    res.status(404).send("Plant doesn't exist");
    next(err);
  }
};

const patchPlant = async (req, res, next) => {
  const { plant_id } = req.params
  const { water_plant, feed_plant } = req.body;

  try {

    const plant = await Plant.findById(plant_id);
    
    if (water_plant) {
      plant.waterDate = Date.now() + plant.waterInterval
    }
    if (feed_plant) {
      plant.foodDate = Date.now() + plant.foodInterval
    }
    await plant.save()
    const updatedPlant = await Plant.findById(plant_id)
    res.status(204).send({plant:updatedPlant});
  } catch (err) {
    res.status(404).send("Plant doesn't exist");
    next(err);
  }
};

module.exports = {
  getUserById,
  getPlantsByUserId,
  postUser,
  getUsers,
  deletePlant,
  patchPlant
};
