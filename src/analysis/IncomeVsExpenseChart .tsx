import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import axios from 'axios';

interface MonthlyFinanceData {
  month: string;
  income: number;
  expense: number;
}

const IncomeVsExpenseChart = () => {
  const [data, setData] = useState<MonthlyFinanceData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3002/totalincomeexpensebymonth');
        const transformedData: MonthlyFinanceData[] = Object.keys(response.data.totalIncomeExpenseByMonth).map((month) => ({
          month,
          income: response.data.totalIncomeExpenseByMonth[month].totalIncome,
          expense: response.data.totalIncomeExpenseByMonth[month].totalExpense,
        }));
        setData(transformedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="income" fill="#8884d8" name="Total Income" />
        <Bar dataKey="expense" fill="#82ca9d" name="Total Expense" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default IncomeVsExpenseChart;
