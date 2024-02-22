const User = require("../models/userSchema");

const getUserById = async (req, res, next) => {
  const { username } = req.params;
  try {
    const user = await User.findOne({ username: username }).populate("plants");
    await user.save();
    res.status(200).send(user);
  } catch (err) {
    res.status(404).send("User does not exist");
    next(err);
  }
};
const postUser = async (req, res, next) => {
  const { username, email } = req.body;
  try {
    const data = await User.create({
      username: username,
      email: email,
    });
    res.status(201).send(data);
  } catch (err) {
    res.status(400).send("Missing Username or Email");
    next(err);
  }
};
const getUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).send(users);
  } catch (err) {
    // res.status(404).send("Invalid URL format");
    next(err);
  }
};

const getPlantsByUserId = async (req, res, next) => {
  const { username } = req.params;
  try {
    const user = await User.findOne({ username: username }).populate("plants");
    res.status(200).send(user.plants);
  } catch (err) {
    res.status(404).send("Error getting plants");
    next(err);
  }
};

module.exports = { getUserById, getPlantsByUserId, postUser, getUsers };
