import React from "react";
import { styled } from "styled-components";
import { InnerLayout } from "../../styles/Layouts";
import { useGlobalContext } from "../../context/globalContext";
import Form from "../../components/Form/Form";

function Incomes() {
  //destructure
  const { addIncome } = useGlobalContext();
  return (
    <IncomeStyled>
      <InnerLayout>
        <h1> Incomes </h1>
        <div className="income-content">
          <div className="form-container">
            <Form></Form>
          </div>
          <div className="incomes"></div>
        </div>
      </InnerLayout>
    </IncomeStyled>
  );
}
const IncomeStyled = styled.div``;
export default Incomes;
