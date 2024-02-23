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
    res.status(400).send("Missing Username or Email");
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
    await Plant.findByIdAndDelete(plant_id);
    const user = await User.findOne({ username: username });

    user.plants.filter((plant) => {
      return plant._id.toString() !== plant_id;
    });
    await user.save();

    res.status(204).send();
  } catch (err) {
    res.status(404).send();
    next(err);
  }
};
module.exports = {
  getUserById,
  getPlantsByUserId,
  postUser,
  getUsers,
  deletePlant,
};
