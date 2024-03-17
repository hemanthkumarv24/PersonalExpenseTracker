import { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ReferenceLine } from "recharts";
import { Card } from "antd";
import axios from "axios"; // Import axios for API requests
import React from "react";

interface MonthlyExpensesData {
  month: string;
  "Total Expenses": number;
}

const ExpensesByMonthChart = () => {
  const [monthlyExpensesData, setMonthlyExpensesData] = useState<MonthlyExpensesData[]>([]);
  const [averageExpense, setAverageExpense] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3002/totalexpensesbymonth");
        const data = response.data.totalExpensesByMonth;
        const dataFromReport = Object.keys(data).map((month) => {
          return {
            month,
            "Total Expenses": data[month],
          };
        });
        setMonthlyExpensesData(dataFromReport);

        // Calculate average expense
        const totalExpense = dataFromReport.reduce((acc, curr) => acc + curr["Total Expenses"], 0);
        const avgExpense = totalExpense / dataFromReport.length;
        setAverageExpense(avgExpense);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <Card
      title={
        <div
          style={{
            color: "#07273a",
            fontSize: "20px",
            fontWeight: 700,
            width: "100%",
            overflowX: "hidden",
          }}
        >
          Total Expenses by Month
        </div>
      }
      style={{ boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", background: "#fff", overflowX: "auto" }}
    >
      <div style={{ width: "100%", overflowX: "auto", overflowY: "hidden" }}>
        <BarChart
          width={500}
          height={300}
          data={monthlyExpensesData}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="Total Expenses" fill="#82ca9d" />
          <ReferenceLine y={averageExpense} label="Avg Expense" stroke="red" strokeDasharray="3 3" />
        </BarChart>
      </div>
    </Card>
  );
};

export default ExpensesByMonthChart;
