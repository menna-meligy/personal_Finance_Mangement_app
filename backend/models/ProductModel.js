const mongoose = require("mongoose");

const productItemSchema = new mongoose.Schema(
  {
    image: { type: String },
    itemId: { type: String },
    storeName: { type: String },
    category: { type: String },
    price: { type: Number },
    description: { type: String },
    date: { type: Date },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ProductItem", productItemSchema);
