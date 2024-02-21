const seed = require("./seed.js");
const mongoose = require("../connection.js");
const devData = require("./index.js");

const runSeed = async () => {
  try {
    await seed(devData);
    await mongoose.connection.close();
  } catch (err) {
    console.log(err);
  }
};

runSeed();
