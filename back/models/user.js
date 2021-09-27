const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = Schema({
  name: {
    type: String,
    require: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    trim: true,
    unique: true,
  },
  avatar: {
    type: String,
    trim: true,
  },
  siteWeb: {
    type: String,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  password: {
    type: String,
    require: true,
    trim: true,
  },
  createAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("User", userSchema);
