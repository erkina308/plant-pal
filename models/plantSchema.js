const mongoose = require("mongoose");
const { Schema } = mongoose;

const plantSchema = new Schema({
  name: String,
  description: String,
  image_url: {
    type: String,
    default: "hi",
  },
  createdAtDate: {
    type: Date,
    default: () => new Date(Date.now()),
    immutable: true,
  },
  waterDate: {
    type: Date,
    required: true,
  },

  foodDate: {
    type: Date,
    required: true,
  },
  updatedDate: {
    type: Date,
    default: () => new Date(Date.now()),
  },
  user_id: { type: Schema.Types.ObjectId, ref: "User" },
});

const Plant = mongoose.model("Plant", plantSchema);

module.exports = Plant;
