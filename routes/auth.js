const express = require('express');
const router = express.Router();
const db = require('../app'); // Assuming db connection is exported from app.js

// Move `isAuthenticated` to a central location if not using sessions
let isAuthenticated = false; 

// Render the login page
router.get('/login', (req, res) => {
    res.render('login');
});

// Handle login POST request
router.post('/login', (req, res) => {
    const { email, password } = req.body;

    // Query to authenticate user
    db.query('SELECT * FROM Users WHERE email = ? AND password = ?', [email, password], (err, results) => {
        if (err) {
            console.error("Error in login query:", err);
            return res.send("An error occurred during login.");
        }

        if (results.length > 0) {
            // Set isAuthenticated to true on successful login
            isAuthenticated = true;
            res.redirect('/user/create-meal'); // Redirect to create meal page
        } else {
            res.send("Invalid credentials");
        }
    });
});

module.exports = { router, isAuthenticated };
