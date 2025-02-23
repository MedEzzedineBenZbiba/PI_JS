var createError = require('http-errors');
const http = require("http")
const cors = require("cors");
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require("mongoose")
const configDB = require("./src/config/db.json");

// require('./src/middlewares/auth/auth');
const authRoute = require("./src/routes/index.route");
const employeeRoute = require("./src/routes/employee.route");

mongoose.connect(configDB.mongo.uri);

var app = express();
const server = http.createServer(app);


app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/auth', authRoute);
app.use('/employee', employeeRoute);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


server.listen(3000, ()=>{
  console.log('server is running on http://localhost:3000');
});