const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
  fullName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    index: true,
  },
  hash: {
    type: String,
    required: true,
  },
  themeColor: {
    type: String,
    trim: true,
    default: "white"
  },
});
module.exports = model("User", UserSchema);
