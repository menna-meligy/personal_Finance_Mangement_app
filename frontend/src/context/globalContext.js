// // import React, { useContext, useState } from "react";
// // import axios from "axios";

// // const BASE_URL = "http://localhost:3000/api/v1/incomes";
// // const GlobalContext = React.createContext();

// // export const GlobalDataProvider = ({ children }) => {
// //   const [incomes, setIncomes] = useState([]);
// //   const [expenses, setExpenses] = useState([]);
// //   const [error, setError] = useState(null);
// //   //send the items to the database
// //   const addIncome = async (income) => {
// //     // const response = await axios.post(`${BASE_URL}add-income`,income);
// //     const response = await axios
// //       .post(`${BASE_URL}/add-income`, income)
// //       .catch((err) => {
// //         setError(err.response.data.message);
// //       });
// //     console.log("eeeeeeeeeee", response);
// //   };

// //   return (
// //     <GlobalContext.Provider value={{ addIncome }}>
// //       {children}
// //     </GlobalContext.Provider>
// //   );
// // };
// // //to have access to these context to send them there to the database and show them in the UI
// // export const useGlobalContext = () => {
// //   return useContext(GlobalContext);
// // };
// // // import React, { useContext, useState } from "react";
// // // import axios from "axios";

// // // const BASE_URL = "http://localhost:3000/api/v1/incomes";
// // // const GlobalContext = React.createContext();

// // // export const GlobalDataProvider = ({ children }) => {
// // //   const [incomes, setIncomes] = useState([]);
// // //   const [expenses, setExpenses] = useState([]);
// // //   const [error, setError] = useState(null);

// // //   const addIncome = async (income) => {
// // //     try {
// // //       const response = await axios.post(`${BASE_URL}add-income`, income);
// // //       console.log("Response:", response);
// // //     } catch (error) {
// // //       console.log("Error:", error);
// // //       setError(error.message);
// // //     }
// // //   };

// // //   return (
// // //     <GlobalContext.Provider value={{ addIncome }}>
// // //       {children}
// // //     </GlobalContext.Provider>
// // //   );
// // // };

// // // export const useGlobalContext = () => {
// // //   return useContext(GlobalContext);
// // // };

import React, { useContext, useState } from "react";
import axios from "axios";

const BASE_URL = "http://localhost:3000/api/v1/incomes";
const GlobalContext = React.createContext();

export const GlobalProvider = ({ children }) => {
  const [incomes, setIncomes] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [error, setError] = useState(null);
  //send the items to the database
  const addIncome = async (income) => {
    const { title, amount, date, category, description } = income;
    const newIncome = { title, amount, date, category, description };
    try {
      const response = await axios.post(`${BASE_URL}`, newIncome);
      console.log("Response:", response);
    } catch (error) {
      console.log("Error:", error.message);
      setError(error.message);
    }
    getIncomes();
  };

  //   const getIncomes = async (income) => {
  //     const response = await axios.get(`${BASE_URL}get-incomes`);
  //     setIncomes(response.data);
  //     console.log(response.data);
  //   };
  const getIncomes = async () => {
    const response = await axios.get(`${BASE_URL}`);
    setIncomes(response.data);
    // console.log(response.data);
  };

  const deleteIncome = async (id) => {
    const response = await axios.delete(`${BASE_URL}/${id}`);
    getIncomes();
  };

  return (
    <GlobalContext.Provider
      value={{ addIncome, getIncomes, incomes, deleteIncome }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
//to have access to these context to send them there to the database and show them in the UI
export const useGlobalContext = () => {
  return useContext(GlobalContext);
};
