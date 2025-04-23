const mongoose = require("mongoose");
const validator = require("validator");
const ObjectId = mongoose.Types.ObjectId;

const clothingItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  weather: { type: String, emun: ["hot", "warm", "cold"], required: true },
  imageUrl: {
    type: String,
    required: true,
    validate: {
      validator(value) {
        return validator.isURL(value);
      },
      message: "You must enter a valid URL",
    },
  },
  owner: { type: ObjectId, ref: "user", required: true },
  likes: { type: [{ type: ObjectId, ref: "user" }], default: [] },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("clothingItem", clothingItemSchema);
