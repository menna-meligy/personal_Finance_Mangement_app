//API integration and rendering
import React, { useEffect, useState } from "react";
import axios from "axios";
import { PayPalButton } from "react-paypal-button-v2";

const ProductDetails = () => {
  const API_KEY = "YOUR_API_KEY";
  const productUrl = "URL_OF_PRODUCT_DETAIL_PAGE";

  const [productData, setProductData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get(
  //         `https://api.shoppingscraper.com/page/?api_key=${API_KEY}&url=${productUrl}`
  //       );
  //       const { data } = response.data;
  //       setProductData(data);
  //       setLoading(false);
  //     } catch (error) {
  //       setError(error.message);
  //       setLoading(false);
  //     }
  //   };

  //   fetchData();
  // }, []);

  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  // if (error) {
  //   return <div>Error: {error}</div>;
  // }

  return (
    <div>
      <PayPalButton />
    </div>
  );
};

export default ProductDetails;
