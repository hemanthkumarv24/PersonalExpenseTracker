import React, { useEffect, useState } from "react";
import { Card, Col, Row } from "antd";
import IncomeBased from "./IncomeBased";
import ExpenseBased from "./ExpenseBased";
import axios from "axios"; // Import axios for API requests

const Cards = () => {
  const [financialData, setFinancialData] = useState({
    Income: { totalIncome: 0 },
    Expense: { totalExpense: 0 },
    Balance: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("URL_OF_YOUR_API");
        // Round balance to 2 decimal points
        response.data.Balance = parseFloat(response.data.Balance.toFixed(2));
        setFinancialData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Row gutter={[5, 5]}>
        <Col xs={24} sm={24} md={12} lg={8} xl={8}>
          <Card
            style={{
              width: "100%",
              textAlign: "center",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              background: "#fff",
            }}
          >
            <h1 style={{ margin: 0, fontWeight: 600, color: "#38a6e7" }}>
              {financialData.Income.totalIncome}
            </h1>

            <p style={{ color: "#07273a", fontWeight: 600, fontSize: "18px", margin: 0 }}>
              Total Income
            </p>
          </Card>
        </Col>
        <Col xs={24} sm={24} md={12} lg={8} xl={8}>
          <Card
            style={{
              width: "100%",
              textAlign: "center",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              background: "#fff",
            }}
          >
            <h1 style={{ margin: 0, fontWeight: 600, color: "#38a6e7" }}>
              {financialData.Expense.totalExpense}
            </h1>
            <p style={{ color: "#07273a", fontWeight: 600, fontSize: "18px", margin: 0 }}>
              Total Expenditure
            </p>
          </Card>
        </Col>
        <Col xs={24} sm={24} md={12} lg={8} xl={8}>
          <Card
            style={{
              width: "100%",
              textAlign: "center",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              background: "#fff",
            }}
          >
            <h1 style={{ margin: 0, fontWeight: 600, color: "#38a6e7" }}>
              {financialData.Balance}
            </h1>
            <p style={{ color: "#07273a", fontWeight: 600, fontSize: "18px", margin: 0 }}>
              Remaining Balance
            </p>
          </Card>
        </Col>
      </Row>

      <Row gutter={[5, 5]} style={{ marginTop: "5px" }}>
        <Col xs={24} sm={24} md={12} lg={8} xl={8}>
          <IncomeBased />
        </Col>
        <Col xs={24} sm={24} md={12} lg={8} xl={8}>
          <ExpenseBased />
        </Col>
      </Row>
    </>
  );
};

export default Cards;
