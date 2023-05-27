const SpringFieldItem = require("../models/ZaraModel");

// Get all items
const getAll = async (req, res, next) => {
  try {
    const items = await SpringFieldItem.find();
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// Create a new item
const createItem = async (req, res, next) => {
  try {
    console.log("bbbbb", req.body);
    const newItem = new SpringFieldItem(req.body);
    await newItem.save();
    res.status(201).json(newItem);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get item details by image
const getItemByImage = async (req, res, next) => {
  try {
    const { image } = req.params;

    const item = await SpringFieldItem.findOne({ image });
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    res.status(200).json(item);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
// Get item details by ID
const getItemById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const item = await SpringFieldItem.findById(id);
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    res.status(200).json(item);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { getAll, createItem, getItemByImage, getItemById };
