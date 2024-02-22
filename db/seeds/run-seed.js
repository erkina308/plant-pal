const seed = require("./seed.js");
const devData = require("../data/test/index.js");

const runSeed = () => {
  seed(devData).then(() => {
    mongoose.connection.close();
  });
};

runSeed();
