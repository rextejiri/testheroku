
//===============
// dependencies
//================

const express = require('express');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const app = express();
const db = mongoose.connection
const session = require('express-session');
require('dotenv').config();



const PORT = process.env.PORT || 3000

// pulling MONGODB_URI data base from dotenv
const MONGODB_URI = process.env.MONGODB_URI;

// telling mongo which collection to use
mongoose.connect(MONGODB_URI , { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }
);


// Error / success
db.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
db.on('connected', () => console.log('MONGODB_URI connected: 🧜🏿‍♀️🧜🏿‍♀️🧜🏿‍♀️🧜🏿‍♀️🧜🏿‍♀️🧜🏿‍♀️🧜🏿‍♀️'));
db.on('disconnected', () => console.log('mongo disconnected'));



//===================
//Middleware
//===================

app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false
  })
)

//===================
//controllers
//===================


const storeController = require('./controllers/store_controller.js');
app.use('/home', storeController)
const usersController = require('./controllers/users_controller.js');
app.use('/user', usersController)
const sessionsController = require('./controllers/sessions_controller.js')
app.use('/sessions', sessionsController)




//===================
//listerner
//===================

app.listen(PORT, () => console.log( 'Rafael..🧞‍♂️🧞‍♂️🧞‍♂️🧞‍♂️🧞‍🧞‍♂️🧞‍♂️🧞‍♂️🧞‍♂️🧞', PORT));
