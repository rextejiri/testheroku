const express = require('express');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const app = express();
const db = mongoose.connection
require('dotenv').config();

// requiring Routes
const Product = require('./models/store.js');

const PORT = process.env.PORT || 3000

// pulling MONGODB_URI data base from dotenv
const MONGODB_URI = process.env.MONGODB_URI;

// telling mongo which collection to use
mongoose.connect(MONGODB_URI , { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }
);


// Error / success
db.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
db.on('connected', () => console.log('mongo connected: ', MONGODB_URI));
db.on('disconnected', () => console.log('mongo disconnected'));

//___________________
//Middleware
//___________________

//use public folder for static assets
app.use(express.static('public'));

// populates req.body with parsed info from forms - if no data from forms will return an empty object {}
app.use(express.urlencoded({ extended: false }));// extended: false - does not allow nested objects in query strings
app.use(express.json());// returns middleware that only parses JSON - may or may not need it depending on your project

//use method override
app.use(methodOverride('_method'));// allow POST, PUT and DELETE from a form


//___________________
// Routes
//___________________
//localhost:3000

app.get('/home/seed', (req, res) => {
  Product.create(
    [
      {
        name: 'westly',
        description: 'shoe',
        price: 234,
        qty: 3,
        img: 'https://wallpaperaccess.com/full/30100.jpg'
      }
    ],
    (err, data) => {
      res.redirect('/home')
    }
  )
})

app.get('/home/new', (req, res) => {
    res.render('new.ejs');
});

app.get('/home/:id', (req, res) => {
    Product.findById(req.params.id, (error, foundProduct) => {
        res.render(
            'show.ejs',
            {
                product:foundProduct
            }
        );
    })
});

app.delete('/home/:id', (req, res) => {
  Product.findByIdAndRemove(req.params.id, (error, deletedProduct) => {
    res.redirect('/home')
  })
})

app.get('/home', (req, res) => {
  Product.find({}, (error, allProducts) => {
    res.render(
      'index.ejs',
      {
        products: allProducts
      }
    )
  })

})

// post route
app.post('/home', (req, res) => {
    Product.create(req.body, (error, createdProduct) => {
        res.redirect('/home')
    })
})

//___________________
//Listener
//___________________
app.listen(PORT, () => console.log( 'warrior🧜🏿🧜🏿', PORT ,"🧜🏿🧜🏿🧜🏿🧜🏿🧜🏿🧜🏿🧜🏿🧜🏿"));
