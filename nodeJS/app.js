var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require("mongoose");
const passport = require('passport');
const configDB = require("./src/config/db.json");
const employeeRoute = require("./src/routes/employeeRoute");
require('./src/middlewares/auth/auth');
const authRoute = require("./src/routes/authRoute");

mongoose.connect(configDB.mongo.uri);

var app = express();

const cors = require("cors");

 
app.use(cors({
  origin: "http://localhost:5173", // Allow requests from React
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Allowed methods
  allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
  credentials: true // Allow credentials (if needed)
}));

app.options("*", (req, res) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:5173");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.sendStatus(200);
});
app.get("/test-cors", (req, res) => {
  res.json({ message: "CORS is working!" });
});


// view engine setup
app.set('views', path.join(__dirname, 'src/views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// ✅ Les routes doivent venir après CORS
app.use('/', authRoute);
app.use('/user', passport.authenticate('jwt', { session: false }), employeeRoute);

// Gestion des erreurs
app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
