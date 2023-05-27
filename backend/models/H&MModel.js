const mongoose = require("mongoose");

const H_MItemSchema = new mongoose.Schema(
  {
    id: { type: Number },
    price: { type: Number },
    number: { type: String },
    rank: { type: Number },
    category: { type: String },
    description: { type: String },
    image: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("H_MItem", H_MItemSchema);
