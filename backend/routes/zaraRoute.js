const {
  getAll,
  createItem,
  getItemByImage,
  getItemById,
} = require("../controllers/zaraAPI");
const router = require("express").Router();

router.post("/items", createItem);
router.get("/items", getAll);

// Get item details by image
router.get("/items/image/:image", getItemByImage);

// Get item details by ID
router.get("/items/:id", getItemById);

module.exports = router;
