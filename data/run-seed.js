const seed = require("./seed.js");
const mongoose = require("../connection.js");
const devData = require("./index.js");

const runSeed = async () => {
  await seed(devData).then(async () => {
    await mongoose.connection.close();
  });
};

runSeed();
