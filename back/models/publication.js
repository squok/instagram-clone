const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const publicationSchema = Schema({
  idUser: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
    ref: "User",
  },
  file: {
    type: String,
    trim: true,
    require: true,
  },
  typeFile: {
    type: String,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Publication", publicationSchema);
