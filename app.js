const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
var passport = require('passport');
var crypto = require('crypto');

const routes = require('./routes/route');
const connection = require('./config/database');
const app = express();

const MongoStore = require('connect-mongo');



//by requiring the passport.js file, we call the passport.use(strategy) function 
require('./config/passport');

require('dotenv').config();


app.use(express.json());

//this will take the form data and put it into the req.body 
app.use(express.urlencoded({ extended: true }));

const sessionStore = MongoStore.create({
    mongoUrl: process.env.DB_STRING,
    collectionName: 'sessions'
});


app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 //1day
    }
}));


// this will initialize the passport middleware 
app.use(passport.initialize());


// this has to do with the serialize and deserialize user functions
app.use(passport.session());

app.use((req, res, next) => {
    console.log(req.session);
    console.log(req.user);
    next();
});

app.use(routes);


app.listen(3000);
