const express = require("express");
const router = express.Router();
const {
  createIncome,
  updateIncome,
  getAllIncomes,
  getIncomeById,
  deleteIncome,
} = require("./../controllers/income");
router.route("/").get(getAllIncomes).post(createIncome);
router
  .route("/:id")
  .patch(updateIncome)
  .delete(deleteIncome)
  .get(getIncomeById);

module.exports = router;
