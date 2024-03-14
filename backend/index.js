var mysql = require('mysql');
const express = require("express");
const bodyparser= require("body-parser");
const { max } = require('moment/moment');
const app = express();
const cors = require('cors');
app.use(cors());
app.use(express.json());
app.set('view engine', 'card');
app.use(bodyparser.urlencoded({extended: true}));

app.use(express.static('public', { 
 setHeaders: (res, path, stat) => {
   if (path.endsWith('.js')) {
     res.set('Content-Type', 'application/javascript');
   }
 }
}));



const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: 'Timmavaidya@123',
    database: 'expensetracker',
};

// Create a MySQL connection pool
const pool = mysql.createPool(dbConfig);
var Email=''; 
var Password='';



// Endpoint to fetch data (GET request)
app.get('/',  async (req, res) => {
    let data=null;

    await  pool.query('SELECT * FROM users', (error, results) => {
        if (error) {
            console.error('Error executing query:', error);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
         data=  results;
         console.log("Data is,",data)
        res.json(data);
    });
    console.log("second",data)
  
});
function poolQuery(query, values = []) {
    return new Promise((resolve, reject) => {
        pool.query(query, values, (error, results) => {
            if (error) {
                console.error('Error executing query:', error);
                reject(error);
                return;
            }
            resolve(results);
        });
    });
}



app.get('/check-account', async (req, res) => {
    try {
      // Fetch the user ID based on the provided email
      console.log("Email",Email)
      const [user] = await poolQuery('SELECT UserID FROM users WHERE Email = ?', [Email]);
      console.log("User found", user);
      const [username] = await poolQuery('SELECT Username FROM users WHERE Email = ?', [Email]);
  
      // Query to check if an account exists for the given UserID
      const accountQuery = 'SELECT * FROM bankaccounts WHERE UserID = ?';
      const [account] = await poolQuery(accountQuery, [user]);
  
      if (!account) {
        // If no account exists for the given UserID
        return res.json({ exists: false, message: 'Account not found for the specified user.' });
      }
  
      // If an account exists, send the account details in the response
      res.json({
        exists: true,
        accountDetails: {
        username:username,
          AccountID: account.AccountID,
          UserID: account.UserID,
          AccountNumber: account.AccountNumber,
          Balance: account.Balance,
          BankName: account.bank_name,
          BankBranch: account.bank_branch
        }
      });
    } catch (error) {
      console.error('Error checking account:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });











app.post('/signup/users', async (req, res) => {
    try {
        const result = await poolQuery('SELECT MAX(UserID) AS maxUserID FROM users');
        console.log(result);
        console.log(req.body);

        // Access the first object in the array
        const latestUserID = result[0].maxUserID;

        // If no records, start from 500
        const maxval = latestUserID ? latestUserID + 1 : 500;

        console.log(maxval);

        await poolQuery(
            'INSERT INTO users (UserID, Username, Password, Email, RegistrationDate) VALUES (?, ?, ?, ?, ?)',
            [maxval, req.body.Username, req.body.Password, req.body.Email, req.body.RegistrationDate]
        );

        res.json({ message: 'User inserted successfully', data: { UserID: maxval, ...req.body } });
    } catch (error) {
        console.error('Error executing query:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }


// Function to handle pool.query with promises
function poolQuery(query, values = []) {
    return new Promise((resolve, reject) => {
        pool.query(query, values, (error, results) => {
            if (error) {
                console.error('Error executing query:', error);
                reject(error);
                return;
            }
            resolve(results);
        });
    });
}  
  
});


app.post('/login', async (req, res) => {
    function poolQuery(query, values = []) {
        return new Promise((resolve, reject) => {
            pool.query(query, values, (error, results) => {
                if (error) {
                    console.error('Error executing query:', error);
                    reject(error);
                    return;
                }
                resolve(results);
            });
        });
    }  
    try {
         
         Password=req.body.Password;
         Email=req.body.Email;
         console.log("Body -----",req.body)

        // Query the database to retrieve the user with the provided email
        const [user] = await poolQuery('SELECT * FROM users WHERE Email = ?', [Email]);

        if (!user) {
            // User with the provided email not found
            return res.status(404).json({ error: 'User not found' });
        }

        // Compare the provided password with the stored password for the user
        if (user.Password !== Password) {
            // Passwords do not match
            return res.status(401).json({ error: 'Invalid password' });
        }

        

          // Calculate the sum of income entries for the user
          const [incomeSum] = await poolQuery('SELECT SUM(Amount) AS totalIncome FROM income WHERE UserID = ?', [user.UserID]);
            console.log("Total INcome",incomeSum);
          // Calculate the sum of expense entries for the user
          const [expenseSum] = await poolQuery('SELECT SUM(Amount) AS totalExpense FROM expenses WHERE UserID = ?', [user.UserID]);
          console.log("Total INcome",expenseSum);
          // Calculate the new balance
          const newBalance = (incomeSum.totalIncome || 0) - (expenseSum.totalExpense || 0);
          console.log("Cureent Balance:",newBalance);
  
          // Update the balance in the bankaccounts table
          await poolQuery('UPDATE bankaccounts SET Balance = ? WHERE UserID = ?', [newBalance, user.UserID]);
          res.json({ message: 'Login successful', data: { UserID: user.UserID, Username: user.Username } });

    } catch (error) {
        console.error('Error executing query:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


app.post('/createbankaccounts', async (req, res) => {
    try {
        console.log(Email, "Current Logged in");
        
        // Fetch the user ID based on the provided email
        const [user] = await poolQuery('SELECT UserID FROM users WHERE Email = ?', [Email]);
        console.log("User found", user);
        
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Get the maximum AccountID
        const result = await poolQuery('SELECT MAX(AccountID) AS maxAccountID FROM bankaccounts');
        const maxAccountID = result[0].maxAccountID;
        const newAccountID = maxAccountID ? maxAccountID + 1 : 1;

        // Extract bank account details from request body
        const { AccountNumber, Balance, bank_name, bank_branch } = req.body;

        // Insert bank account details into the bankaccounts table
        await poolQuery(
            'INSERT INTO bankaccounts (AccountID, UserID, AccountNumber, Balance, bank_name, bank_branch) VALUES (?, ?, ?, ?, ?, ?)',
            [newAccountID, user.UserID, AccountNumber, Balance, bank_name, bank_branch]
        );

        res.json({ message: 'Bank account added successfully', data: { AccountID: newAccountID, UserID: user.UserID, AccountNumber, Balance, bank_name, bank_branch } });
    } catch (error) {
        console.error('Error executing query:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});




app.post('/expenses', async (req, res) => {
    try {
 console.log(Email,"Current Loged in");
      const [user] = await poolQuery('SELECT UserID FROM users WHERE Email = ?', [Email]);
      console.log("User found", user)
      console.log("Expense body",req.body)
      
  
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      // Fetch CategoryID based on the provided category (Assuming you have a categories table)
      const [category] = await poolQuery('SELECT CategoryID FROM categories WHERE CategoryName = ?', [req.body.category]);
      console.log(category,"FOunded CAt")
      if (!category) {
        return res.status(404).json({ error: 'Category not found' });
      }
  
      // Get the maximum ExpenseID
      const result = await poolQuery('SELECT MAX(ExpenseID) AS maxExpenseID FROM expenses');
      console.log("Expense",result)
      const maxExpenseID = result[0].maxExpenseID ;
      const maxval = maxExpenseID ? maxExpenseID + 1 :600;
     
      console.log("ExpenseID",maxExpenseID)

      await poolQuery(
        'INSERT INTO expenses (ExpenseID, UserID, Amount, Description, Date, CategoryID) VALUES (?, ?, ?, ?, ?, ?)',
        [maxval, user.UserID, req.body.amount, req.body.description, req.body.date, category.CategoryID]
      );
  
      res.json({ message: 'Expense added successfully', data: { ExpenseID: maxval , ...req.body } });
    } catch (error) {
      console.error('Error executing query:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });



  // ... (previous code)

app.post('/income', async (req, res) => {
    try {

        console.log("INCOMEEEEEEEEEEEEEE");
        console.log(Email, "Current Logged in");
        const [user] = await poolQuery('SELECT UserID FROM users WHERE Email = ?', [Email]);
        console.log("User found", user);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Fetch CategoryID based on the provided category (Assuming you have a categories table)
        const [category] = await poolQuery('SELECT CategoryID FROM categories WHERE CategoryName = ?', [req.body.Category]);
        console.log(category, "Found Category");

        if (!category) {
            return res.status(404).json({ error: 'Category not found' });
        }

        // Get the maximum IncomeID
        const result = await poolQuery('SELECT MAX(IncomeID) AS maxIncomeID FROM income');
        console.log("Income", result);
        const maxIncomeID = result[0].maxIncomeID;
        const maxval = maxIncomeID ? maxIncomeID + 1 : 700;

        console.log("IncomeID", maxIncomeID);

        await poolQuery(
            'INSERT INTO income (IncomeID, UserID, Amount, Description, Date, CategoryID) VALUES (?, ?, ?, ?, ?, ?)',
            [maxval, user.UserID, req.body.Amount, req.body.Description, req.body.Date, category.CategoryID]
        );

        res.json({ message: 'Income added successfully', data: { IncomeID: maxval, ...req.body } });
    } catch (error) {
        console.error('Error executing query:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// ... (rest of the code)






app.listen(3002, function() {
    console.log("Server is running")
});