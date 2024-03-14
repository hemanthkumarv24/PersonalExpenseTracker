import React from 'react';
import {useState} from 'react';
import { Link } from 'react-router-dom'; // Assuming you're using React Router for navigation
import { Form, Input, Button, Row, Col, Card,Typography,Table } from "antd";
import styled from 'styled-components';      
import { StyledForm, StyledInput, StyledButton, StyledSelect, StyledLabel } from './FormComponents'
import axios from 'axios';
const NavigationBar = () => {
  return (
    <nav style={styles.nav}>
      <div style={styles.container}>
        <Link to="/" style={styles.brand}>Personal Expense Tracker</Link>
        <ul style={styles.navLinks}>
          <li style={styles.navItem}>
            <Link to="/dashboard" style={styles.link}>Dashboard</Link>
          </li>
          <li style={styles.navItem}>
            <Link to="/expenses" style={styles.link}>Expenses</Link>
          </li>
          <li style={styles.navItem}>
            <Link to="/income" style={styles.link}>Income</Link>
          </li>
          <li style={styles.navItem}>
            <Link to="/budgets" style={styles.link}>Budgets</Link>
          </li>
          <li style={styles.navItem}>
            <Link to="/reports" style={styles.link}>Reports</Link>
          </li>
          <li style={styles.navItem}>
            <Link to="/settings" style={styles.link}>Settings</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

const StyledTable = styled(Table)`
  .ant-table-thead > tr > th {
    background-color: #007bff; // Change this to your desired header background color
    color: #fff; // Change this to your desired header text color
  }

  .ant-table-tbody > tr:hover > td {
    background-color: blue; // Change this to your desired hover background color
  }
`;
// const StyledLabel = styled.label`
//   margin-bottom: 8px;
// `;

// const StyledInput = styled.input`
//   padding: 8px;
//   margin-bottom: 16px;
//   border: 1px solid #ccc;
//   border-radius: 4px;
// `;

const StyledTextArea = styled.textarea`
  padding: 8px;
  margin-bottom: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

// const StyledButton = styled.button`
//   padding: 8px 16px;
//   background-color: #007bff;
//   color: white;
//   border: none;
//   border-radius: 4px;
//   cursor: pointer;

//   &:hover {
//     background-color: #0056b3;
//   }
// `;


const styles = {
  nav: {
    position: 'fixed',
    top: 0,
    width: '100%',
    backgroundColor: '#f8f9fa',
    padding: '10px 0',
    zIndex: 1000, // Ensure the navigation bar appears above other elements
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 20px',
  },
  brand: {
    textDecoration: 'none',
    color: '#333',
    fontSize: '1.5rem',
    fontWeight: 'bold',
  },
  navLinks: {
    listStyle: 'none',
    display: 'flex',
    margin: 0,
    padding: 0,
  },
  navItem: {
    marginLeft: '20px',
  },
  link: {
    textDecoration: 'none',
    color: '#333',
    fontSize: '1rem',
    fontWeight: 'normal',
  },
  formContainer: {
    maxWidth: '600px',
    margin: '20px auto',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    backgroundColor: '#07273A',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  formGroup: {
    marginBottom: '15px',
  },

  // RecentTransactions styles
  transactionsContainer: {
    maxWidth: '600px',
    margin: '20px auto',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    backgroundColor: '#07273A',
  },
  transactionsList: {
    listStyle: 'none',
    padding: 0,
  },
  transactionItem: {
    marginBottom: '10px',
  },
};
// const [username, setUsername] = useState('babu');
// const [password, setPassword] = useState('banagram');
// const [passwordInvalid, setPasswordInvalid] = useState(false);
// const [enabled, setEnabled] = useState(false);

const handleSubmit = (e) => {
    e.preventDefault();

    // validate password and set passwordInvalid state accordingly
    if (password.length < 8) {
        setPasswordInvalid(true);
    } else {
        setPasswordInvalid(false);
    }
}

const usernameEntered = (e) => {
    setUsername(e.target.value);
    // buttonEnabled(username, password)
}

const passwordEntered = (e) => {
    setPassword(e.target.value);
    // buttonEnabled(username, password)
}

const ExpenseForm = () => {
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit =  async (e) => {
    e.preventDefault();
   
    const formData = {
      amount,
      description,
      date,
      category,
      
    };
    const response = await axios.post('http://localhost:3002/expenses', formData);
    console.log('Form submitted:', response);
    // You can handle further form submission logic here
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <Card style={{ width: '50%', alignSelf: 'center' }}>
        <Typography
          style={{
            fontSize: 25,
            fontWeight: 'bold',
            marginBottom: 10,
            fontFamily: 'Garamond, Serif', // Change to the desired font
            color: '#07273A', // Change to the desired color
          }}
        >
          Add new Expense
        </Typography>
        <StyledForm onSubmit={handleSubmit}>
          <StyledLabel htmlFor="amount">Amount:</StyledLabel>
          <StyledInput
            type="text"
            id="amount"
            name="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
          <StyledLabel htmlFor="date">Date:</StyledLabel>
          <StyledInput
            type="date"
            id="date"
            name="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
          <StyledLabel htmlFor="category">Category:</StyledLabel>
          <StyledSelect
            id="category"
            name="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="">Select category</option>
            <option value="Food">Food</option>
            <option value="Transportation">Transportation</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Utilities">Utilities</option>
          </StyledSelect>
          <StyledLabel htmlFor="description">Description:</StyledLabel>
          <StyledInput
            id="description"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <StyledButton type="submit">Add Expense</StyledButton>
        </StyledForm>
      </Card>
    </div>
  );
};



const RecentTransactions = () => {
  const columns = [
    {
      title: 'Transaction',
      dataIndex: 'transaction',
      key: 'transaction',
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
  ];

  const data = [
    {
      key: '1',
      transaction: 'Transaction 1',
      amount: '$50',
      category: 'Food',
      description: 'Lunch',
    },
    {
      key: '2',
      transaction: 'Transaction 2',
      amount: '$30',
      category: 'Transportation',
      description: 'Gas',
    },
    {
      key: '3',
      transaction: 'Transaction 3',
      amount: '$100',
      category: 'Shopping',
      description: 'Clothes',
    },
  ];

  return (
    <div style={{ maxWidth: '600px', margin: '20px auto', padding: '20px', borderRadius: '5px',}}>
       <Typography
          style={{
            fontSize: 25,
            fontWeight: 'bold',
            marginBottom: 10,
            fontFamily: 'Garamond, Serif', // Change to the desired font
            color: '#07273A', // Change to the desired color
          }}
        >
          Recent Transactions
        </Typography>
        <StyledTable columns={columns} dataSource={data} pagination={false} />    </div>
  );
};




export default NavigationBar;
export { ExpenseForm, RecentTransactions };
