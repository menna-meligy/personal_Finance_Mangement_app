const mongoose = require("mongoose");

const ExpenseSchema = new mongoose.Schema(
  {
    market_Name: {
      type: String,
      required: true,
      trim: true,
      maxLength: 50,
    },
    item_id: {
      type: Number,
      required: true,
      maxLength: 20,
      trim: true,
    },
    type: {
      type: String,
      default: "expense",
    },
    amount: {
      type: Number,
      required: true,
      maxLength: 20,
      trim: true,
    },
    item_name: {
      type: String,
      required: true,
      maxLength: 20,
      trim: true,
    },
    date: {
      type: Date,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      maxLength: 20,
      trim: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Expense", ExpenseSchema);
