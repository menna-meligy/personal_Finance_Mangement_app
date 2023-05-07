const { addIncome } = require("../controllers/income");
const router = require("express").Router();

router
  .post("/add-income", addIncome)
  .get("/get-incomes", getIncome)
  .delete("/delete-income/:id", deleteIncome)
  .put("/put-income", UpdateIncome)
  .post("/add-expense", addExpense)
  .get("/get-expenses", getExpense)
  .delete("/delete-expense/:id", deleteExpense)
  .put("/put-expense", UpdateExpense);
module.exports = router;
