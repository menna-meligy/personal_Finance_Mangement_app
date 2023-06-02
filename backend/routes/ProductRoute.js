const {
  getAll,
  createItem,
  getItemByImage,
  getItemById,
  deleteOne,
  deleteAll,
} = require("../controllers/productsAPI");
const router = require("express").Router();

router.post("/items", createItem);
router.get("/items", getAll);

// Get item details by image
router.get("/items/image/:image", getItemByImage);

// Get item details by ID
router.get("/items/:id", getItemById);

router.delete("/items/:id", deleteOne);
router.delete("/items/", deleteAll);
module.exports = router;
