var mysql = require('mysql');
const express = require("express");
const bodyparser= require("body-parser");
const { max } = require('moment/moment');
const app = express();
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



app.post('/login', async (req, res) => {
    try {
        const { Email, Password } = req.body;

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

        // User is authenticated, you can provide a token or any other response
        res.json({ message: 'Login successful', data: { UserID: user.UserID, Username: user.Username } });
    } catch (error) {
        console.error('Error executing query:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

       
       
    
      
    
   
    
    
  
});





// app.get("/",function(req,res)
// {
//     res.render("Home.ejs")
// })


// app.post('/upload', (req, res) => {
    
      
//     // Save book information to your database
  
//     res.redirect('/');
//   });




app.listen(3002, function() {
    console.log("Server is running")
});