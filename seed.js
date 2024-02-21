require("dotenv").config();
const mongoose = require("mongoose");
const Plant = require("./models/plantSchema");
const User = require("./models/userSchema");
const plantData = require("./plants.json");
const userData = require("./users.json");

const PORT = 9000;
const mongoString = process.env.DATABASE_URL;
mongoose
  .connect(mongoString)



const seed = async () => {
  try {
    await User.deleteMany();
    await Plant.deleteMany();

    const users = await User.create(userData);

    const plant1 = await Plant.create({
      name: plantData[0].name,
      description: plantData[0].description,
      user_id: users[0]._id,
    });
    const plant2 = await Plant.create({
      name: plantData[1].name,
      description: plantData[1].description,
      user_id: users[0]._id,
    });
    const plant3 = await Plant.create({
      name: plantData[2].name,
      description: plantData[2].description,
      user_id: users[1]._id,
    });
    const plant4 = await Plant.create({
      name: plantData[3].name,
      description: plantData[3].description,
      user_id: users[1]._id,
    });
    const plant5 = await Plant.create({
      name: plantData[4].name,
      description: plantData[4].description,
      user_id: users[1]._id,
    });


    const user0 = await User.findById(users[0]._id)
    console.log(user0)
    user0.plants = [plant1._id, plant2._id]
    user0.save()

    const user1 = await User.findById(users[1]._id)
    user1.plants = [plant3._id, plant4._id, plant5._id]
    user1.save()

  } catch (err) {
    console.log(err);
  }
};

seed()