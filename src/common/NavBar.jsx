import React from 'react';
import {useState} from 'react';
import { Link } from 'react-router-dom'; // Assuming you're using React Router for navigation
import { Form, Input, Button, Row, Col, Card,Typography,Table } from "antd";
import styled from 'styled-components';      
import { StyledForm, StyledInput, StyledButton, StyledSelect, StyledLabel } from './FormComponents'
import axios from 'axios';
import  {  useEffect } from 'react';
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

const fetchDatabalance= async () => {
  try {
    const response = await axios.get('http://localhost:3002/check-account');
    

    setbalance1(response.data.accountDetails.Balance);
    


    console.log(response) // Change the URL to your Express route
    // setData(response.data);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

  
const fetchData = async () => {
  try {
    const response = await axios.get('http://localhost:3002/updatebalance');
    console.log("HERE",response.data);
    // Update your local state or do any necessary operations with the fetched data
  } catch (error) {
    console.error('Error fetching data:', error);
    // Handle error, such as displaying an error message to the user
  }
};

const ExpenseForm = () => {
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:3002/uniquecategory');
        setCategories(response.data); // Assuming the response data is an array of category objects with keys 'CategoryID' and 'CategoryName'
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
   
    const formData = {
      amount,
      description,
      date,
      category,
    };
    const response = await axios.post('http://localhost:3002/expenses', formData);
    console.log('Form submitted:', response);
    await fetchData();
    await fetchDatabalance();
    window.location.href = 'http://localhost:5173/dashboard'
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
            {categories.map((category) => (
              <option key={category.CategoryID} value={category.CategoryName}>
                {category.CategoryName}
              </option>
            ))}
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
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3002/listexpenses');
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures the effect runs only once, after the initial render

  const columns = [
    {
      title: 'Amount',
      dataIndex: 'Amount', // Use 'Amount' instead of 'amount' to match the data key
      key: 'Amount',
    },
    {
      title: 'Description',
      dataIndex: 'Description', // Use 'Description' instead of 'description' to match the data key
      key: 'Description',
    },
    {
      title: 'Date',
      dataIndex: 'Date', // Use 'Date' instead of 'date' to match the data key
      key: 'Date',
    },
    {
      title: 'Category',
      dataIndex: 'CategoryName', // Use 'Category' instead of 'category' to match the data key
      key: 'CategoryName',
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
        <StyledTable columns={columns} dataSource={data} pagination={true} />    </div>
  );
};




export default NavigationBar;
export { ExpenseForm, RecentTransactions };


