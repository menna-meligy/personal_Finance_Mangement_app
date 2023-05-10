const mongoose = require("mongoose");

const ExpenseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxLength: 50,
    },
    amount: {
      type: Number,
      required: true,
      maxLength: 20,
      trim: true,
    },
    type: {
      type: String,
      default: "income",
    },
    date: {
      type: Date,
      required: true,
      trim: true,
    },
    Category: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: [true, "please enter a description"],
      maxLength: 20,
      trim: true,
    },
    cratedAt: {
      type: Date,
      default: Date.now(),
    },
  },
  { timestamps: true }
);
const model = mongoose.model("expense", ExpenseSchema);

module.exports = model;
