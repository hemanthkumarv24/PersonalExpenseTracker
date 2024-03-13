import React, { useState } from 'react';
import { Input, Button, List, Typography, Select } from 'antd';
import axios from 'axios';

const { Text } = Typography;
const { Option } = Select;

interface Expense {
  id: number;
  amount: number;
  description: string;
  category: string;
}

const ExpenseTracker: React.FC = () => {
  const [amount, setAmount] = useState<number | ''>('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [totalExpenses, setTotalExpenses] = useState<number>(0);

  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value;
    // Ensure input is a valid number or empty string
    if (!isNaN(Number(input)) || input === '') {
      setAmount(input === '' ? '' : Number(input));
    }
  };

  const handleDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(event.target.value);
  };

  const handleCategoryChange = (value: string) => {
    setCategory(value);
  };

  const handleAddExpense = async () => {
    if (amount !== '' && description !== '' && category !== '') {
      const newExpense: Expense = {
        id: expenses.length + 1,
        amount: Number(amount),
        description: description,
        category: category,
      };

      // Make a post request to save the expense data
      try {
        await axios.post('http://localhost:3002/expenses', newExpense);
        setExpenses([...expenses, newExpense]);
        setTotalExpenses(prevTotal => prevTotal + Number(amount));
        setAmount('');
        setDescription('');
        setCategory('');
      } catch (error) {
        console.error('API Error:', error);
        // Handle error, you might want to display an error message to the user
      }
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto' }}>
      <h1>Personal Expense Tracker</h1>
      <div style={{ marginBottom: '20px' }}>
        <Select
          style={{ width: '100%', marginBottom: '10px' }}
          placeholder="Select a category"
          value={category}
          onChange={handleCategoryChange}
        >
          <Option value="Food">Food</Option>
          <Option value="Transportation">Transportation</Option>
          <Option value="Entertainment">Entertainment</Option>
          <Option value="Utilities">Utilities</Option>
          <Option value="Entertainment">Entertainment</Option>
          <Option value="Others">Others</Option>
        </Select>
        <Input
          type="text"
          value={description}
          onChange={handleDescriptionChange}
          placeholder="Expense description"
          style={{ marginBottom: '10px' }}
        />
        <Input
          type="text"
          value={amount === '' ? '' : amount.toFixed(2)}
          onChange={handleAmountChange}
          placeholder="Amount"
          style={{ marginBottom: '10px' }}
        />
        <Button
          type="primary"
          onClick={handleAddExpense}
          disabled={!amount || !description || !category}
        >
          Add Expense
        </Button>
      </div>
      <div>
        <h2>Expenses:</h2>
        <List
          bordered
          dataSource={expenses}
          renderItem={expense => (
            <List.Item>
              <Text strong>{expense.description}</Text> - ${expense.amount.toFixed(2)} -{' '}
              {expense.category}
            </List.Item>
          )}
        />
        <h3>Total Expenses: ${totalExpenses.toFixed(2)}</h3>
      </div>
    </div>
  );
};

export default ExpenseTracker;
