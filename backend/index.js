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

app.get('/updatebalance', async (req, res) => {

    const [user] = await poolQuery('SELECT UserID FROM users WHERE Email = ?', [Email]);


  // Calculate the sum of income entries for the user
  const [incomeSum] = await poolQuery('SELECT SUM(Amount) AS totalIncome FROM income WHERE UserID = ?', [user]);
  console.log("Total INcome",incomeSum);
// Calculate the sum of expense entries for the user
const [expenseSum] = await poolQuery('SELECT SUM(Amount) AS totalExpense FROM expenses WHERE UserID = ?', [user]);
console.log("Total INcome",expenseSum);
// Calculate the new balance
const newBalance = (incomeSum.totalIncome || 0) - (expenseSum.totalExpense || 0);
console.log("Cureent Balance:",newBalance);

// Update the balance in the bankaccounts table
await poolQuery('UPDATE bankaccounts SET Balance = ? WHERE UserID = ?', [newBalance,user]);
res.send("Success")

});

app.get('/listexpenses', async (req, res) => {
    const [userID] = await poolQuery('SELECT UserID FROM users WHERE Email = ?', [Email]);

    try {
        await pool.query(
            'SELECT  expenses.*,  categories.CategoryName FROM expenses JOIN categories ON expenses.CategoryID = categories.CategoryID WHERE userID = ?',
            [userID],
            (error, results) => {
                if (error) {
                    console.error('Error executing query:', error);
                    res.status(500).json({ error: 'Internal Server Error' });
                    return;
                }
                const expenses = results;
                console.log("Expenses data for user ID", userID, ":", expenses);
                res.json(expenses);
            }
        );
    } catch (error) {
        console.error('Error fetching expenses:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
app.get('/uniquecategory', async (req, res) => {
    const [userID] = await poolQuery('SELECT UserID FROM users WHERE Email = ?', [Email]);

    try {
        await pool.query(
            'SELECT DISTINCT categories.CategoryName FROM expenses JOIN categories ON expenses.CategoryID = categories.CategoryID WHERE userID = ?',
            [userID],
            (error, results) => {
                if (error) {
                    console.error('Error executing query:', error);
                    res.status(500).json({ error: 'Internal Server Error' });
                    return;
                }
                const categories = results;
                console.log("Unique categories data for user ID", userID, ":", categories);
                res.json(categories);
            }
        );
    } catch (error) {
        console.error('Error fetching expenses:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});



// Endpoint to retrieve total expenses for each category for a specific user
app.get('/totalexpensesbycategory', async (req, res) => {
    try {
        // Retrieve the UserID based on the provided Email
        const [user] = await poolQuery('SELECT UserID FROM users WHERE Email = ?', [Email]);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        console.log("USERID:::::",user)
        // Fetch all unique categories for the user
        const categories = await poolQuery('SELECT DISTINCT CategoryID FROM expenses WHERE UserID = ?', [user.UserID]);
        console.log("UNIQUE CATEG",categories)
        // Array to store the total expenses for each category
        const totalExpensesByCategory = [];

        // Iterate over each category
        for (const category of categories) {
            // Retrieve the category name
            const [categoryName] = await poolQuery('SELECT CategoryName FROM categories WHERE CategoryID = ?', [category.CategoryID]);

            // Calculate the total expenses for the category
            const [totalExpense] = await poolQuery('SELECT SUM(Amount) AS totalExpense FROM expenses WHERE UserID = ? AND CategoryID = ?', [user.UserID, category.CategoryID]);

            // Push category name and total expense to the result array
            totalExpensesByCategory.push({
                categoryName: categoryName.CategoryName,
                totalExpense: totalExpense.totalExpense || 0 // If no expense found, default to 0
            });
        }

        // Send the result as JSON response
        res.json({ totalExpensesByCategory });
    } catch (error) {
        console.error('Error fetching total expenses by category:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/totalincomebycategory', async (req, res) => {
    try {
        // Retrieve the UserID based on the provided Email
        const [user] = await poolQuery('SELECT UserID FROM users WHERE Email = ?', [Email]);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        console.log("USERID:::::",user)
        // Fetch all unique categories for the user
        const categories = await poolQuery('SELECT DISTINCT CategoryID FROM income WHERE UserID = ?', [user.UserID]);
        console.log("UNIQUE CATEG",categories)
        // Array to store the total expenses for each category
        const totalincomeByCategory = [];

        // Iterate over each category
        for (const category of categories) {
            // Retrieve the category name
            const [categoryName] = await poolQuery('SELECT CategoryName FROM categories WHERE CategoryID = ?', [category.CategoryID]);

            // Calculate the total expenses for the category
            const [totalincome] = await poolQuery('SELECT SUM(Amount) AS totalincome FROM income WHERE UserID = ? AND CategoryID = ?', [user.UserID, category.CategoryID]);

            // Push category name and total expense to the result array
            totalincomeByCategory.push({
                categoryName: categoryName.CategoryName,
                totalincome: totalincome.totalincome || 0 // If no expense found, default to 0
            });
        }

        // Send the result as JSON response
        res.json({ totalincomeByCategory });
    } catch (error) {
        console.error('Error fetching total expenses by category:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


app.get('/totalexpensesbymonth', async (req, res) => {
    try {
        // Retrieve the UserID based on the provided Email
        const [user] = await poolQuery('SELECT UserID FROM users WHERE Email = ?', [Email]);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Fetch all unique months for the user's expenses
        const uniqueMonths = await poolQuery('SELECT DISTINCT MONTH(Date) AS month FROM expenses WHERE UserID = ?', [user.UserID]);

        // Object to store total expenses for each month
        const totalExpensesByMonth = {};

        // Iterate over each unique month
        for (const { month } of uniqueMonths) {
            // Retrieve the month name from the month number (e.g., 1 for January)
            const monthName = new Date(2000, month - 1, 1).toLocaleString('default', { month: 'long' });

            // Calculate the total expenses for the month
            const [totalExpenseResult] = await poolQuery('SELECT SUM(Amount) AS totalExpense FROM expenses WHERE UserID = ? AND MONTH(Date) = ?', [user.UserID, month]);
            const totalExpense = totalExpenseResult.totalExpense || 0;

            // Store total expenses for the month in the object
            totalExpensesByMonth[monthName] = totalExpense;
        }

        // Send the result as JSON response
        res.json({ totalExpensesByMonth });
    } catch (error) {
        console.error('Error fetching total expenses by month:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});





app.get('/AccountData', async (req, res) => {
    try {
        const [user] = await poolQuery('SELECT UserID FROM users WHERE Email = ?', [Email]);
        const [incomeSum] = await poolQuery('SELECT SUM(Amount) AS totalIncome FROM income WHERE UserID = ?', [user.UserID]);
        console.log("Total INcome",incomeSum);
       // Calculate the sum of expense entries for the user
       const [expenseSum] = await poolQuery('SELECT SUM(Amount) AS totalExpense FROM expenses WHERE UserID = ?', [user.UserID]);
       console.log("Total INcome",expenseSum);
       // Calculate the new balance
       const newBalance = (incomeSum.totalIncome || 0) - (expenseSum.totalExpense || 0);
       console.log("Cureent Balance:",newBalance);
        

  
        res.json({ Income:incomeSum,Expense:expenseSum,Balance:newBalance });
    } catch (error) {
        console.error('Error fetching total expenses by category:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
app.get('/totalincomeexpensebymonth', async (req, res) => {
    try {
        // Retrieve the UserID based on the provided Email
        const [user] = await poolQuery('SELECT UserID FROM users WHERE Email = ?', [Email]);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Fetch all unique months for the user's expenses
        const uniqueMonths = await poolQuery('SELECT DISTINCT MONTH(Date) AS month FROM expenses WHERE UserID = ?', [user.UserID]);

        // Object to store total income and expense for each month
        const totalIncomeExpenseByMonth = {};

        // Iterate over each unique month
        for (const { month } of uniqueMonths) {
            // Retrieve the month name from the month number (e.g., 1 for January)
            const monthName = new Date(Date.UTC(2000, month - 1, 1)).toLocaleString('default', { month: 'long' });

            // Calculate the total income for the month
            const [totalIncomeResult] = await poolQuery('SELECT SUM(Amount) AS totalIncome FROM income WHERE UserID = ? AND MONTH(Date) = ?', [user.UserID, month]);
            const totalIncome = totalIncomeResult.totalIncome || 0;

            // Calculate the total expense for the month
            const [totalExpenseResult] = await poolQuery('SELECT SUM(Amount) AS totalExpense FROM expenses WHERE UserID = ? AND MONTH(Date) = ?', [user.UserID, month]);
            const totalExpense = totalExpenseResult.totalExpense || 0;

            // Store total income and expense for the month in the object
            totalIncomeExpenseByMonth[monthName] = { totalIncome, totalExpense };
        }

        // Send the result as JSON response
        res.json({ totalIncomeExpenseByMonth });
    } catch (error) {
        console.error('Error fetching total income and expense by month:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});




 // Calculate the sum of income entries for the user







app.listen(3002, function() {
    console.log("Server is running")
});