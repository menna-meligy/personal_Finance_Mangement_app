const mongoose = require("mongoose");

const springFieldItemsSchema = new mongoose.Schema(
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

module.exports = mongoose.model("ReservedItem", springFieldItemsSchema);
