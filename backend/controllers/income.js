const Income = require("../models/incomeModel");

// Create a new income
exports.createIncome = async (req, res) => {
  try {
    const income = new Income(req.body);
    await income.save();
    res.status(201).json({ msg: "income created ", dataCreated: income });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all incomes
exports.getAllIncomes = async (req, res) => {
  try {
    const incomes = await Income.find();
    res.status(200).json({ msg: "all incomes", data: incomes });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single income by id
exports.getIncomeById = async (req, res) => {
  try {
    const income = await Income.findById(req.params.id);
    if (!income) {
      return res
        .status(404)
        .json({ msg: "income not found with id " + req.params.id });
    }
    res.status(200).json(income);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update an income by id
exports.updateIncome = async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = [
    "title",
    "amount",
    "type",
    "date",
    "Category",
    "description",
  ];
  const isValidUpdate = updates.every((update) =>
    allowedUpdates.includes(update)
  );
  if (!isValidUpdate) {
    return res.status(400).json({ error: "Invalid updates!" });
  }
  try {
    const income = await Income.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!income) {
      return res
        .status(404)
        .json({ msg: "there is no income with id " + req.params });
    }
    res.status(200).json({ msg: "updated successfully", dataUpdated: income });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete an income by id
exports.deleteIncome = async (req, res) => {
  try {
    const income = await Income.findByIdAndDelete(req.params.id);
    if (!income) {
      return res
        .status(404)
        .json({ msg: "Invalid income with id " + req.params.id });
    }
    res.status(200).json({ msg: "delted", dataDeleted: income });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
