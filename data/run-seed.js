const seed = require("./seed.js");
const { mongoose } = require("../connection.js");
const devData = require("./index.js");

const runSeed = () => {
  seed(devData).then(() => {
    mongoose.connection.close();
  });
};

runSeed();
