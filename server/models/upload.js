const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const uploadSchema = new Schema({
  image: {
    type: String,
  },
  format: {
    type: [String],
  },
});

const Upload = mongoose.model("Upload", uploadSchema);

module.exports = Upload;
