const express = require('express');
const router = express.Router();
const db = require('../app'); // Assuming db connection is exported from app.js
const { isAuthenticated } = require('./auth'); // Import isAuthenticated

// Render create meal page if authenticated
router.get('/create-meal', (req, res) => {
    if (!isAuthenticated) {
        return res.redirect('/auth/login'); // Redirect to login if not authenticated
    }
    res.render('createMeal');
});

// Handle meal creation POST request
router.post('/create-meal', (req, res) => {
    const { meal_name, calories, image_path, description } = req.body;
    const user_id = 1; // Placeholder for actual user ID

    db.query(
        'INSERT INTO Meals (user_id, meal_name, calories, image_path, description) VALUES (?, ?, ?, ?, ?)', 
        [user_id, meal_name, calories, image_path || 'default.jpeg', description],
        (err, result) => {
            if (err) {
                console.error("Error inserting meal:", err);
                return res.send("Error creating meal");
            }
            res.redirect('/'); // Redirect to main page after successful meal creation
        }
    );
});

module.exports = router;
