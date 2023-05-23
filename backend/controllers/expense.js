const expenseSchema = require("../models/incomeModel");

exports.addExpense = async (req, res) => {
  const { title, amount, category, deescription, data } = req.body;

  const income = Income({
    title,
    amount,
    category,
    deescription,
    data,
  });

  try {
    //validations

    if (!title || !amount || !category || !deescription || data) {
      return res.status(400).json({ message: "some fields are required" });
    }

    if (amount <= 0 || !amount === "number") {
      return res.status(400).json({ message: "amount should be a number" });
    }

    await income.save();
    res.status(200).json({ message: " Expense added successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error saving Expense" });
  }
};

// Create a new income
exports.createExpense = async (req, res) => {
  try {
    const income = new expenseSchema(req.body);
    await income.save();
    res.status(201).json({ msg: "Expense created ", dataCreated: income });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all incomes
exports.getAllExpenses = async (req, res) => {
  try {
    const incomes = await expenseSchema.find();
    res.status(200).json({ msg: "all Expenses", data: incomes });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single income by id
exports.getExpenseById = async (req, res) => {
  try {
    const income = await expenseSchema.findById(req.params.id);
    if (!income) {
      return res
        .status(404)
        .json({ msg: "Expense not found with id " + req.params.id });
    }
    res.status(200).json(income);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update an income by id
exports.updateExpense = async (req, res) => {
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
    const income = await expenseSchema.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!income) {
      return res
        .status(404)
        .json({ msg: "there is no Expense with id " + req.params });
    }
    res.status(200).json({ msg: "updated successfully", dataUpdated: income });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete an income by id
exports.deleteExpense = async (req, res) => {
  try {
    const income = await expenseSchema.findByIdAndDelete(req.params.id);
    if (!income) {
      return res
        .status(404)
        .json({ msg: "Invalid Expense with id " + req.params.id });
    }
    res.status(200).json({ msg: "delted", dataDeleted: income });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
