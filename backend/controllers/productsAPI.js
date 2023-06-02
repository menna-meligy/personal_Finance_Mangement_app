const ProductItem = require("../models/ProductModel");

// Get all items
const getAll = async (req, res, next) => {
  try {
    const items = await ProductItem.find();
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// Create a new item
const createItem = async (req, res, next) => {
  try {
    console.log("bbbbb", req.body);
    const newItem = await ProductItem.create(req.body);
    console.log("new iten", newItem);

    res.status(201).json(newItem);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get item details by image
const getItemByImage = async (req, res, next) => {
  try {
    const { image } = req.params;

    const item = await ProductItem.findOne({ image });
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

    const item = await ProductItem.findOne(
      { itemId: id },
      {
        storeName: 1,
        category: 1,
        price: 1,
        description: 1,
        date: 1,
      }
    );
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }
    res.status(200).json(item);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
const deleteOne = async (req, res, next) => {
  try {
    console.log(req.params);
    const id = req.params.id;
    const item = await ProductItem.findOneAndDelete({ itemId: id });
    console.log("item deleted:", item);
    if (!item) {
      return res.status(404).json({ message: "plumper there is no item here" });
    }
    res.status(200).json({ item });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const deleteAll = async (req, res, next) => {
  try {
    await ProductItem.deleteMany({});
    res.status(200).json({ message: "All items deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  getAll,
  createItem,
  getItemByImage,
  getItemById,
  deleteOne,
  deleteAll,
};
