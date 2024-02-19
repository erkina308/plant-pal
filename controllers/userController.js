const express = require("express");
const mongoose = require("mongoose");
const User = require("../models/userSchema");
const getUserById = async (req, res, next) => {
  const { user_id } = req.params;
  try {
    const user = await User.findById(user_id).populate("plants");
    user.save();
    res.status(200).send(user);
  } catch (err) {
    console.log(err);
    res.status(500).send("Error getting user");
  }
  next();
};
const postUser = async (req, res) => {
  const { username, email } = req.body;
  try {
    const data = await User.create({
      username: username,
      email: email,
    });
    res.status(201).send(data);
  } catch (err) {
    console.log(err);
    res.status(500).send("Error creating user");
  }
};
const getUsers = async (req, res) => {
  try {
    const data = await User.find();
    res.status(200).send(data);
  } catch (err) {
    console.log(err);
    res.status(500).send("Error getting users");
  }
};

module.exports = { getUserById, postUser, getUsers };
