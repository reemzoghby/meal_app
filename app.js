const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

let isAuthenticated = false; 
const meals = [
  { title: 'Juicy Cheese Burger', description: 'A delicious burger with cheese and fresh lettuce.', image: 'burger.jpeg' },
  { title: 'Spicy Curry', description: 'A hot and spicy curry made with authentic spices.', image: 'curry.jpeg' },
  { title: 'Cheesy Pasta', description: 'Creamy pasta topped with melted cheese.', image: 'pasta.jpeg' }
];


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));


app.get('/', (req, res) => {
  res.render('meals', { meals });
});


app.get('/auth/login', (req, res) => {
  res.render('login');
});


app.post('/auth/login', (req, res) => {
  const { email, password } = req.body;

  
  if (email === 'admin@test.com' && password === 'password123') {
    isAuthenticated = true;
    res.redirect('/user/create-meal'); 
  } else {
    res.send('Invalid credentials');
  }
});


app.get('/user/create-meal', (req, res) => {

  if (!isAuthenticated) {
    return res.redirect('/auth/login');
  }
  res.render('createMeal');
});


app.post('/user/create-meal', (req, res) => {
  const { title, imageUrl, description } = req.body;

 
  meals.push({
    title: title,
    description: description,
    image: imageUrl || 'default.jpeg' 
  });

  res.redirect('/'); 
});


app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
