const express = require('express');
const router = express.Router();


router.use((req, res, next) => {
  if (!isAuthenticated) {
    return res.redirect('/auth/login');
  }
  next();
});


router.get('/create-meal', (req, res) => {
  res.render('createMeal');
});

router.post('/create-meal', (req, res) => {
  const { name, title, imageUrl, description } = req.body;
  
  console.log(`Meal Created: ${title}, by ${name}`);
  res.redirect('/');
});

module.exports = router;
