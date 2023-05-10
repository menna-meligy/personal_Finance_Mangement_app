// // // import React, { useContext, useState } from "react";
// // // import axios from "axios";

// // // const BASE_URL = "http://localhost:3000/api/v1/incomes";
// // // const GlobalContext = React.createContext();

// // // export const GlobalDataProvider = ({ children }) => {
// // //   const [incomes, setIncomes] = useState([]);
// // //   const [expenses, setExpenses] = useState([]);
// // //   const [error, setError] = useState(null);
// // //   //send the items to the database
// // //   const addIncome = async (income) => {
// // //     // const response = await axios.post(`${BASE_URL}add-income`,income);
// // //     const response = await axios
// // //       .post(`${BASE_URL}/add-income`, income)
// // //       .catch((err) => {
// // //         setError(err.response.data.message);
// // //       });
// // //     console.log("eeeeeeeeeee", response);
// // //   };

// // //   return (
// // //     <GlobalContext.Provider value={{ addIncome }}>
// // //       {children}
// // //     </GlobalContext.Provider>
// // //   );
// // // };
// // // //to have access to these context to send them there to the database and show them in the UI
// // // export const useGlobalContext = () => {
// // //   return useContext(GlobalContext);
// // // };
// // // // import React, { useContext, useState } from "react";
// // // // import axios from "axios";

// // // // const BASE_URL = "http://localhost:3000/api/v1/incomes";
// // // // const GlobalContext = React.createContext();

// // // // export const GlobalDataProvider = ({ children }) => {
// // // //   const [incomes, setIncomes] = useState([]);
// // // //   const [expenses, setExpenses] = useState([]);
// // // //   const [error, setError] = useState(null);

// // // //   const addIncome = async (income) => {
// // // //     try {
// // // //       const response = await axios.post(`${BASE_URL}add-income`, income);
// // // //       console.log("Response:", response);
// // // //     } catch (error) {
// // // //       console.log("Error:", error);
// // // //       setError(error.message);
// // // //     }
// // // //   };

// // // //   return (
// // // //     <GlobalContext.Provider value={{ addIncome }}>
// // // //       {children}
// // // //     </GlobalContext.Provider>
// // // //   );
// // // // };

// // // // export const useGlobalContext = () => {
// // // //   return useContext(GlobalContext);
// // // // };

// import React, { useContext, useState } from "react";
// import axios from "axios";

// const BASE_URL = "http://localhost:3000/api/v1/";
// const GlobalContext = React.createContext();

// export const GlobalProvider = ({ children }) => {
//   const [incomes, setIncomes] = useState([]);
//   const [expenses, setExpenses] = useState([]);
//   const [error, setError] = useState(null);
//   //send the items to the database
//   const addIncome = async (income) => {
//     const { title, amount, date, category, description, type } = income;
//     const newIncome = { title, amount, date, category, description, type };
//     try {
//       const response = await axios.post(`${BASE_URL}add-income`, newIncome);
//       console.log("Response:", response);
//     } catch (error) {
//       console.log("Error:", error.message);
//       setError(error.message);
//     }

//     getIncomes();
//   };

//   //   const getIncomes = async (income) => {
//   //     const response = await axios.get(`${BASE_URL}get-incomes`);
//   //     setIncomes(response.data);
//   //     console.log(response.data);
//   //   };
//   const getIncomes = async () => {
//     const response = await axios.get(`${BASE_URL}get-incomes`);
//     setIncomes(response.data);
//     // console.log(response.data);
//   };

//   const deleteIncome = async (id) => {
//     const response = await axios.delete(`${BASE_URL}/${id}`);
//     getIncomes();
//   };

//   const totalIncome = () => {
//     let totalIncome = 0;
//     incomes.forEach((income) => {
//       totalIncome += income.amount;
//     });
//     return totalIncome;
//   };

//   const totalExpenses = () => {
//     let totalExpenses = 0;
//     incomes.forEach((expense) => {
//       totalExpenses += expense.amount;
//     });
//     return totalExpenses;
//   };

//   //console.log(totalIncome());
//   const addExpense = async (income) => {
//     const response = await axios
//       .post(`${BASE_URL}add-expense`, income)
//       .catch((err) => {
//         setError(err.response.data.message);
//       });
//     getExpenses();
//   };

//   const getExpenses = async () => {
//     const response = await axios.get(`${BASE_URL}`);
//     setExpenses(response.data);
//     console.log(response.data);
//   };

//   const deleteExpense = async (id) => {
//     const res = await axios.delete(`${BASE_URL}/${id}`);
//     getExpenses();
//   };

//   const totalBalance = () => {
//     return totalIncome() - totalExpenses();
//   };

//   return (
//     <GlobalContext.Provider
//       value={{
//         addIncome,
//         getIncomes,
//         incomes,
//         deleteIncome,
//         totalIncome,
//         totalExpenses,
//         getExpenses,
//         deleteExpense,
//         addExpense,
//         totalBalance,
//         error,
//       }}
//     >
//       {children}
//     </GlobalContext.Provider>
//   );
// };
// //to have access to these context to send them there to the database and show them in the UI
// export const useGlobalContext = () => {
//   return useContext(GlobalContext);
// };
import React, { useContext, useState } from "react";
import axios from "axios";

const BASE_URL = "http://localhost:3000/api/v1/";

const GlobalContext = React.createContext();

export const GlobalProvider = ({ children }) => {
  const [incomes, setIncomes] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [error, setError] = useState(null);

  //calculate incomes
  const addIncome = async (income) => {
    const newIcome = {
      title: "Salary 9",
      amount: 5000,
      type: "income 4",
      date: "2022-05-02T00:00:00.000Z",
      category: "Job",
      description: "Monthly salary",
    };

    const response = await axios
      .post(`${BASE_URL}add-income`, income)
      .catch((err) => {
        setError(err.response.data.message);
      });
    getIncomes();
  };

  const getIncomes = async () => {
    const response = await axios.get(`${BASE_URL}get-incomes`);
    setIncomes(response.data);
    console.log(response.data);
  };

  const deleteIncome = async (id) => {
    const res = await axios.delete(`${BASE_URL}delete-income/${id}`);
    getIncomes();
  };

  const totalIncome = () => {
    let totalIncome = 0;
    incomes.forEach((income) => {
      totalIncome = totalIncome + income.amount;
    });

    return totalIncome;
  };

  //calculate incomes
  const addExpense = async (income) => {
    const response = await axios
      .post(`${BASE_URL}add-expense`, income)
      .catch((err) => {
        setError(err.response.data.message);
      });
    getExpenses();
  };

  const getExpenses = async () => {
    const response = await axios.get(`${BASE_URL}get-expenses`);
    setExpenses(response.data);
    console.log(response.data);
  };

  const deleteExpense = async (id) => {
    const res = await axios.delete(`${BASE_URL}delete-expense/${id}`);
    getExpenses();
  };

  const totalExpenses = () => {
    let totalIncome = 0;
    expenses.forEach((income) => {
      totalIncome = totalIncome + income.amount;
    });

    return totalIncome;
  };

  const totalBalance = () => {
    return totalIncome() - totalExpenses();
  };
  // history for both incomes and expenses in order
  const transactionHistory = () => {
    const history = [...incomes, ...expenses];
    history.sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

    return history.slice(0, 3);
  };

  return (
    <GlobalContext.Provider
      value={{
        addIncome,
        getIncomes,
        incomes,
        deleteIncome,
        expenses,
        totalIncome,
        addExpense,
        getExpenses,
        deleteExpense,
        totalExpenses,
        totalBalance,
        transactionHistory,
        error,
        setError,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};
