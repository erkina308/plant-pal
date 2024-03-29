const mongoose = require("mongoose");

const { Schema } = mongoose;

const userSchema = new Schema({
  username: { type: String, unique: true, required: true },
  email: {
    type: String,
    required: true,
  },
  plants: [{ type: Schema.Types.ObjectId, ref: "Plant" }],
});

const User = mongoose.model("User", userSchema);

module.exports = User;
