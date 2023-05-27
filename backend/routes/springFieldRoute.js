const { getAll, createItem } = require("../controllers/springFieldAPI");

const router = require("express").Router();

router.post("/items", createItem);
router.get("/items", getAll);
module.exports = router;
