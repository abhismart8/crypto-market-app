var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var compression = require('compression');
var mongoose = require('mongoose');

var mongodb = 'mongodb+srv://abhismart8:190844@cluster0.r4ieb.mongodb.net/crypto_market_app?retryWrites=true&w=majority'
mongoose.connect(mongodb, {useNewUrlParser:true, useUnifiedTopology: true})
.then(x => {
  console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`,
  );
}).catch(err => {
  console.error('Error connecting to mongo', err);
});
const con = mongoose.connection
con.on('open', () => {
  console.log('connection established')
})

var indexRouter = require('./routes/index');
var apiRouter = require('./routes/api');
var usersRouter = require('./routes/users');

var app = express();

app.use(compression()); //Compress all routes

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('resources')); //This will allow express to access any file
app.use(express.static('public')); //use middleware to serve static files

app.use('/', indexRouter);
app.use('/', apiRouter);
app.use('/', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'production' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
