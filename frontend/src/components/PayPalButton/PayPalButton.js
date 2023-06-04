import React from "react";
import ReactDOM from "react-dom";
import { PayPalButton } from "react-paypal-button-v2";

const PayPalButtonComponent = () => {
  const onSuccess = (details, data) => {
    // Payment successful
    console.log("Payment successful", details, data);
  };

  const onCancel = (data) => {
    // Payment cancelled
    console.log("Payment cancelled", data);
  };

  const onError = (err) => {
    // Payment failed
    console.error("Payment failed", err);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <div style={{ textAlign: "center" }}>
        <PayPalButton
          options={{
            clientId:
              "AZ5A_fFjO_2x9HOqPUpxfApi12ZIQEeh6SJgoBurecYWVxwtB_9MCrAFdMN9Jy0ie67sZa8pLd15Y4sA",
            currency: "USD",
          }}
          createOrder={(data, actions) => {
            return actions.order.create({
              purchase_units: [
                {
                  amount: {
                    currency_code: "USD",
                    value: "10.00",
                  },
                },
              ],
            });
          }}
          onSuccess={onSuccess}
          onCancel={onCancel}
          onError={onError}
        />
      </div>
    </div>
  );
};

export default PayPalButtonComponent;
