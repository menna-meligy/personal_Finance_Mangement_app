import React, { useContext, useState } from "react";
import axios from "axios";

const BASE_URL = "http://localhost:3000/api/v1/incomes";
const GlobalContext = React.createContext();

export const GlobalDataProvider = ({ children }) => {
  const [incomes, setIncomes] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [error, setError] = useState(null);
  //send the items to the database
  const addIncome = async (income) => {
    // const response = await axios.post(`${BASE_URL}add-income`,income);
    const response = await axios.post(`${BASE_URL}/`, income).catch((err) => {
      setError(err.response.data.message);
    });
  };

  return (
    <GlobalContext.Provider value={{ addIncome }}>
      {children}
    </GlobalContext.Provider>
  );
};
//to have access to these context to send them there to the database and show them in the UI
export const useGlobalContext = () => {
  return useContext(GlobalContext);
};
