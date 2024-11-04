const express = require('express');
const router = express.Router();


router.get('/login', (req, res) => {
  res.render('login');
});


router.post('/login', (req, res) => {
  const { email, password } = req.body;
  
 
  if (email && password) {
    isAuthenticated = true; 
    res.redirect('/user/create-meal'); 
  } else {
    res.send('Please enter both email and password to log in');
  }
});

module.exports = router;
