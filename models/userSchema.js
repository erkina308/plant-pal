const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  title: String,
  //   plants: [{ type: Schema.Types.ObjectId, ref: "Plant" }],
});

const User = mongoose.model("User", userSchema);

module.exports = User;
