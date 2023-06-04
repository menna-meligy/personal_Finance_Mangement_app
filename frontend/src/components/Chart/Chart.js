import React from "react";
import {
  Chart as ChartJs,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";

import { Line } from "react-chartjs-2";
import styled from "styled-components";
import { useGlobalContext } from "../../context/globalContext";
import { dateFormat } from "../../utils/dateFormat";
//registering them for using
ChartJs.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

function Chart() {
  //destructuring incomes and expenses from useGlobalContext
  const { incomes, expenses } = useGlobalContext();

  const data = {
    //labels : is the x axis for the chart which is the date , we get the date from
    labels: incomes.map((income) => {
      const { date } = income;
      return dateFormat(date);
    }),
    //datasets : are the y axis for the chart which is the date , which is the incomes and expenses , so we are looping through them =>
    //while destructuring the amount
    datasets: [
      {
        label: "Income",
        data: [
          ...incomes.map((income) => {
            const { amount } = income;
            return amount;
          }),
        ],
        backgroundColor: "green",
        tension: 0.2,
      },
      {
        label: "Expenses",
        data: [
          ...expenses.map((expense) => {
            const { amount } = expense;
            return amount;
          }),
        ],
        backgroundColor: "red",
        tension: 0.2,
      },
    ],
  };

  return (
    <ChartStyled>
      <Line data={data} />
    </ChartStyled>
  );
}

const ChartStyled = styled.div`
  background: #fcf6f9;
  border: 2px solid #ffffff;
  box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
  padding: 1rem;
  border-radius: 20px;
  height: 100%;
`;

export default Chart;
// import React, { useEffect, useRef } from "react";
// import {
//   Chart as ChartJs,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend,
// } from "chart.js";
// import { Line } from "react-chartjs-2";
// import styled from "styled-components";
// import { useGlobalContext } from "../../context/globalContext";
// import { dateFormat } from "../../utils/dateFormat";
// import regression from "regression";

// // Register the required plugins and scales
// ChartJs.register(
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend
// );

// function Chart() {
//   const { incomes, expenses } = useGlobalContext();
//   const chartRef = useRef(null);

//   useEffect(() => {
//     if (chartRef.current && chartRef.current.chartInstance) {
//       const chartInstance = chartRef.current.chartInstance;
//       const ctx = chartInstance.ctx;

//       // Calculate the regression line data
//       const dataPoints = incomes.map((income) => {
//         const { amount, date } = income;
//         return [new Date(date).getTime(), amount];
//       });

//       const result = regression.linear(dataPoints);
//       const regressionLine = result.points.map(([x, y]) => ({
//         x,
//         y,
//       }));

//       // Draw the regression line
//       ctx.beginPath();
//       ctx.strokeStyle = "blue";
//       ctx.lineWidth = 2;
//       regressionLine.forEach(({ x, y }, index) => {
//         if (index === 0) {
//           ctx.moveTo(x, y);
//         } else {
//           ctx.lineTo(x, y);
//         }
//       });
//       ctx.stroke();
//     }
//   }, [incomes]);

//   const data = {
//     labels: incomes.map((income) => {
//       const { date } = income;
//       return dateFormat(date);
//     }),
//     datasets: [
//       {
//         label: "Income",
//         data: incomes.map((income) => {
//           const { amount } = income;
//           return amount;
//         }),
//         backgroundColor: "green",
//         tension: 0.2,
//       },
//       {
//         label: "Expenses",
//         data: expenses.map((expense) => {
//           const { amount } = expense;
//           return amount;
//         }),
//         backgroundColor: "red",
//         tension: 0.2,
//       },
//     ],
//   };

//   return (
//     <ChartStyled>
//       <Line
//         ref={chartRef}
//         data={data}
//         options={{
//           animation: false,
//           scales: {
//             x: {
//               type: "time",
//               time: {
//                 unit: "month",
//               },
//               title: {
//                 display: true,
//                 text: "Date",
//               },
//             },
//             y: {
//               title: {
//                 display: true,
//                 text: "Amount",
//               },
//             },
//           },
//         }}
//       />
//     </ChartStyled>
//   );
// }

// const ChartStyled = styled.div`
//   background: #fcf6f9;
//   border: 2px solid #ffffff;
//   box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
//   padding: 1rem;
//   border-radius: 20px;
//   height: 100%;
// `;

// export default Chart;
