import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ReferenceLine, ResponsiveContainer } from 'recharts';
import { Card } from 'antd';
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
    <Card
      title={
        <div
          style={{
            color: '#07273a',
            fontSize: '14px',
            fontWeight: 700,
            width: '100%',
            overflowX: 'scroll',
          }}
        >
          Income vs. Expense Comparison
        </div>
      }
      style={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', background: '#fff', overflowX: 'auto' }}
    >
      <div style={{ width: '100%', overflowX: 'auto', overflowY: 'hidden' }}>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="income" fill="#8884d8" name="Total Income" />
            <Bar dataKey="expense" fill="#82ca9d" name="Total Expense" />
            <ReferenceLine y={0} stroke="#000" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

export default IncomeVsExpenseChart;
