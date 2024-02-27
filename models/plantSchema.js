const mongoose = require("mongoose");
const { Schema } = mongoose;
const oneDayInMilliseconds = 24 * 60 * 60 * 1000;
//const currDate = Date.now();
const plantSchema = new Schema({
  name: String,
  species: String,
  description: String,
  image_url: {
    type: String,
    default: "https://i.ibb.co/xXMbNb3/defaultplant-480.png",
  },
  createdAtDate: {
    type: Number,
    default: () => Date.now(),
    immutable: true,
  },
  waterDate: {
    type: Number,
    default: () => Date.now() + 10 * (24 * 3600000),
    required: true,
  },
  waterInterval: {
    type: Number,
    default: () => 10 * oneDayInMilliseconds,
    required: true,
  },
  foodDate: {
    type: Number,
    default: () => Date.now() + 10 * oneDayInMilliseconds,
    required: true,
  },
  foodInterval: {
    type: Number,
    default: () => 10 * oneDayInMilliseconds,
    required: true,
  },
  user_id: { type: Schema.Types.ObjectId, ref: "User" },
});

const Plant = mongoose.model("Plant", plantSchema);

module.exports = Plant;
