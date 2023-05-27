import React, { useEffect, useState } from "react";
import axios from "axios";
import { LinearRegression } from "ml-regression";

const YourComponent = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/v1/zara/items"
        );
        const data = response.data;
        setItems(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const trainModel = () => {
    // Extract the necessary attributes from the API response
    const formattedData = items.map((item) => [item.id, item.price]);

    // Prepare input features (X) and target variable (y)
    const X = formattedData.map((item) => [item[0]]);
    const y = formattedData.map((item) => item[1]);

    // Create and train the linear regression model
    const model = new LinearRegression(X, y);

    // Example prediction
    const newItemId = 4;
    const newPrice = model.predict([newItemId]);

    console.log("Predicted price:", newPrice);
  };

  return (
    <div>
      <h1>Machine Learning Model Example</h1>
      <button onClick={trainModel}>Train Model</button>
    </div>
  );
};

export default YourComponent;
