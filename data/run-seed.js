const plantData = require("./plants.json");
const userData = require("./users.json");
const seed = require("./seed.js");
const mongoose = require("../connection.js");

const runSeed = async () => {
  await mongoose.connect(process.env.DATABASE_URL);
  return seed(plantData, userData).then(() => mongoose.connection.close());
};

runSeed();
