const express = require("express");
const Router = express.Router();
const incomeModel = require("../models/incomeModel");
exports.addIncome = async (req, res, next) => {
  console.log(req.body);
  const postData = req.body;
  let income = new incomeModel({
    title: postData.title,
    amount: postData.amount,
    category: postData.category,
    description: postData.description,
    date: postData.date,
  });
  income.save((err, incomeInstance) => {
    if (err) {
      res
        .status(404)
        .json({ message: "error creating post and there error is :", err });
    }
    res.status(200).json({ message: "post created", income: incomeInstance });
  });
};
