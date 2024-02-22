const Plant = require("../models/plantSchema");
const User = require("../models/userSchema");
const postPlant = async (req, res, next) => {
  const { name, description, username, water_inc, food_inc } = req.body;
  console.log(water_inc, "<--- water inc in controller");
  console.log(food_inc, "<--- food inc in controller");
  try {
    const user1 = await User.findOne({ username: username });
    const user_id = user1._id;

    const plant = await Plant.create({
      name: name,
      description: description,
      user_id: user_id,
      foodDate: () => {
        return new Date(Date.now() + Number(food_inc) * 24 * 60 * 60 * 1000);
      },
      waterDate: () => {
        return new Date(Date.now() + Number(water_inc) * 24 * 60 * 60 * 1000);
      },
    });

    const user = await User.findById(user_id);
    user.plants.push(plant._id);
    await user.save();
    res.status(201).send(plant);
  } catch (err) {
    console.log(err, "from PC");
    res.status(400).send("Missing Name, User or Description");
    next(err);
  }
};

const getPlants = async (req, res, next) => {
  try {
    const plants = await Plant.find();
    res.status(200).send(plants);
  } catch (err) {
    // return Promise.reject({ status: 400, msg: "Invalid URL format" });
    next(err);
  }
};

const getPlantsByUserId = async (req, res, next) => {
  const { username } = req.params;
  try {
    const user = await User.findOne({ username: username }).populate("plants");
    const user_id = user._id;
    const plants = user.plants;
    res.status(200).send(plants);
  } catch (err) {
    res.status(404).send("Error getting plants");
    next(err);
  }
};
const deletePlant = async (req, res, next) => {
  const { plant_id } = req.params;
  try {
    // const plants = await Plant.find().where("user_id").equals(user_id);
    await Plant.findByIdAndDelete(plant_id);

    res.status(204).send();
  } catch (err) {
    res.status(400).send();
    next(err);
  }
};
// const patchPlant
module.exports = {
  postPlant,
  getPlants,
  getPlantsByUserId,
  deletePlant,
};
