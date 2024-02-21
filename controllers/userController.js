const express = require("express");
const { mongoose } = require("../connection.js");
const User = require("../models/userSchema");

const getUserById = async (req, res, next) => {
  const { username } = req.params;
  try {
    const user = await User.findOne({ username: username }).populate("plants");
    user.save();
    res.status(200).send(user);
  } catch (err) {
    res.status(404).send("User does not exist");
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
  }
};
const getUsers = async (req, res, next) => {
  try {
    const data = await User.find();
    res.status(200).send(data);
  } catch (err) {
    res.status(404).send("Invalid URL format");
  }
};

module.exports = { getUserById, postUser, getUsers };
