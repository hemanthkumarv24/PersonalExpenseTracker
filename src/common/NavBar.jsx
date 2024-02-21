import React from 'react';
import { Link } from 'react-router-dom'; // Assuming you're using React Router for navigation

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
    backgroundColor: '#f8f9fa',
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
    backgroundColor: '#f8f9fa',
  },
  transactionsList: {
    listStyle: 'none',
    padding: 0,
  },
  transactionItem: {
    marginBottom: '10px',
  },
};

const ExpenseForm = () => {
  return (
    <div style={styles.formContainer}>
      <h2>Add New Expense</h2>
      <form style={styles.form}>
        <div style={styles.formGroup}>
          <label htmlFor="amount">Amount:</label>
          <input type="text" id="amount" name="amount" />
        </div>
        <div style={styles.formGroup}>
          <label htmlFor="date">Date:</label>
          <input type="date" id="date" name="date" />
        </div>
        <div style={styles.formGroup}>
          <label htmlFor="category">Category:</label>
          <input type="text" id="category" name="category" />
        </div>
        <div style={styles.formGroup}>
          <label htmlFor="description">Description:</label>
          <textarea id="description" name="description"></textarea>
        </div>
        <button type="submit">Add Expense</button>
      </form>
    </div>
  );
};

const RecentTransactions = () => {
  return (
    <div style={styles.transactionsContainer}>
      <h2>Recent Transactions</h2>
      <ul style={styles.transactionsList}>
        <li style={styles.transactionItem}>Transaction 1 - $50 - Category: Food - Description: Lunch</li>
        <li style={styles.transactionItem}>Transaction 2 - $30 - Category: Transportation - Description: Gas</li>
        <li style={styles.transactionItem}>Transaction 3 - $100 - Category: Shopping - Description: Clothes</li>
      </ul>
    </div>
  );
};


export default NavigationBar;
export { ExpenseForm, RecentTransactions };
