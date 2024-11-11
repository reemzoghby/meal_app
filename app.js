require('dotenv').config(); // Load environment variables from .env file
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mysql = require('mysql2');
const app = express();
app.use(express.static(path.join(__dirname, 'public')));

// MySQL database connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'najjar.1992',
  database: 'meal_app',
  port: 3306
});


db.connect((err) => {
    if (err) throw err;
    console.log("Connected to MySQL database");
});

let isAuthenticated = false;

// Set up view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Main meals page route - retrieves meals from the database
app.get('/', (req, res) => {
    db.query('SELECT * FROM Meals', (err, results) => {
        if (err) throw err;
        res.render('meals', { meals: results });
    });
});

// Render login page
app.get('/auth/login', (req, res) => {
    res.render('login');
});

// Login route - validates user from the Users table
app.post('/auth/login', (req, res) => {
    const { email, password } = req.body;
    db.query('SELECT * FROM Users WHERE email = ? AND password = ?', [email, password], (err, results) => {
        if (err) throw err;
        if (results.length > 0) {
            isAuthenticated = true;
            res.redirect('/user/create-meal');
        } else {
            res.send('Invalid credentials');
        }
    });
});
console.log("User:", process.env.DATABASE_USER);
console.log("Password:", process.env.DATABASE_PASSWORD);
console.log("Database:", process.env.DATABASE_NAME);


app.get('/user/create-meal', (req, res) => {
    if (!isAuthenticated) {
        return res.redirect('/auth/login');
    }
    res.render('createMeal');
});

// Handle new meal creation - inserts meal into the Meals table
app.post('/user/create-meal', (req, res) => {
    const { meal_name, image_path, calories, description } = req.body;
    console.log(req.body)
    const user_id = 1; // Placeholder for user ID; should ideally come from session or auth token
    db.query('INSERT INTO Meals (user_id, meal_name, calories, image_path, description) VALUES (?, ?, ?, ?, ?)',
        [user_id, meal_name, Number(calories), image_path, description], (err, result) => {
        if (err) throw err;
        res.redirect('/');
    });
});

app.get('/auth/register', (req, res) => {
    res.render('createUser');
});

app.post('/auth/register', (req, res) => {
    const { email, password, first_name, last_name } = req.body;
    db.query('INSERT INTO users (email, password, first_name, last_name) VALUES (?, ?, ?, ?)',
      [email, password, first_name, last_name ], (err, result) => {
          if (err) throw err;
          res.redirect('/auth/login');
      });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

