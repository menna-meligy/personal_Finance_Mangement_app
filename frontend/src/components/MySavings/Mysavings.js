// import React, { useState, useEffect } from "react";
// import { Line } from "react-chartjs-2";
// import regression from "regression";

// import Expenses from "../Expenses/Expenses";
// import Incomes from "../Incomes/Incomes";
// import { useGlobalContext } from "../../context/globalContext";

// const Mysavings = () => {
//   const [goalSavings, setGoalSavings] = useState(0);
//   const [chartData, setChartData] = useState(null);
//   const [expenseCategories, setExpenseCategories] = useState([]);
//   const [expenseValues, setExpenseValues] = useState([]);
//   const { totalExpenses, totalIncome } = useGlobalContext();

//   useEffect(() => {
//     const expenseCategories = [
//       "Groceries",
//       "Shopping",
//       "Entertainment",
//       "Transportation",
//       "Internet",
//       "Rent",
//     ];
//     const expenseValues = [
//       /* Get the values for each category */
//     ];

//     const data = [
//       [totalExpenses, 1],
//       [totalIncome, 2],
//     ];

//     const result = regression.linear(data);
//     const [slope] = result.equation;
//     const yValues = [totalExpenses, totalIncome];

//     const chartData = {
//       labels: ["Expenses", "Income"],
//       datasets: [
//         {
//           label: "Savings Projection",
//           data: yValues,
//           fill: false,
//           borderColor: "rgba(75,192,192,1)",
//           tension: 0.1,
//         },
//       ],
//     };

//     setChartData(chartData);
//     setExpenseCategories(expenseCategories);
//     setExpenseValues(expenseValues);
//   }, [totalExpenses, totalIncome]);

//   const handleGoalSavingsChange = (event) => {
//     setGoalSavings(parseFloat(event.target.value));
//   };

//   const generateCustomizedPlan = () => {
//     const expensePercentages = expenseValues.map(
//       (value) => (value / totalExpenses) * 100
//     );
//     const plan = [];
//     let remainingSavings = goalSavings;

//     for (let i = 0; i < expenseCategories.length; i++) {
//       const category = expenseCategories[i];
//       const percentage = expensePercentages[i];
//       const amountToSave = (percentage / 100) * goalSavings;
//       const amountToSpend = expenseValues[i] - amountToSave;

//       if (amountToSpend < 0) {
//         plan.push(`Save $${Math.abs(amountToSpend)} more in ${category}`);
//         remainingSavings += Math.abs(amountToSpend);
//       } else {
//         plan.push(`Spend $${amountToSpend} on ${category}`);
//         remainingSavings -= amountToSpend;
//       }

//       if (remainingSavings <= 0) {
//         break;
//       }
//     }

//     if (remainingSavings > 0) {
//       plan.push(`Save the remaining $${remainingSavings}`);
//     }

//     return plan;
//   };

//   const customizedPlan = generateCustomizedPlan();

//   return (
//     <div>
//       <div>
//         <label htmlFor="goalSavings">Goal Savings:</label>
//         <input
//           type="number"
//           id="goalSavings"
//           value={goalSavings}
//           onChange={handleGoalSavingsChange}
//         />
//       </div>

//       <h2>Total Expenses: ${totalExpenses}</h2>
//       <h2>Total Income: ${totalIncome}</h2>

//       {chartData && <Line data={chartData} />}

//       <h2>Your Customized Plan:</h2>
//       <ul>
//         {customizedPlan.map((item, index) => (
//           <li key={index}>{item}</li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default Mysavings;
