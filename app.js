const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const hbs = require('hbs');
const session = require('express-session');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const port = process.env.PORT
const paginate = require('handlebars-paginate');

hbs.handlebars.registerHelper('paginate', paginate);
hbs.registerHelper('json', function(context) {
  return JSON.stringify(context);
});
require('dotenv').config();
const passport = require('passport');
const AuthMiddleWare = require('./middleware/check-auth');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const productsRouter = require('./routes/products');
const ordersRouter = require('./routes/orders');

hbs.handlebars.registerHelper('compare', function (lvalue, operator, rvalue, options) {

  var operators, result;
  
  if (arguments.length < 3) {
      throw new Error("Handlerbars Helper 'compare' needs 2 parameters");
  }
  
  if (options === undefined) {
      options = rvalue;
      rvalue = operator;
      operator = "===";
  }
  
  operators = {
      '==': function (l, r) { return l == r; },
      '===': function (l, r) { return l === r; },
      '!=': function (l, r) { return l != r; },
      '!==': function (l, r) { return l !== r; },
      '<': function (l, r) { return l < r; },
      '>': function (l, r) { return l > r; },
      '<=': function (l, r) { return l <= r; },
      '>=': function (l, r) { return l >= r; },
      'typeof': function (l, r) { return typeof l == r; }
  };
  
  if (!operators[operator]) {
      throw new Error("Handlerbars Helper 'compare' doesn't know the operator " + operator);
  }
  
  result = operators[operator](lvalue, rvalue);
  
  if (result) {
      return options.fn(this);
  } else {
      return options.inverse(this);
  }

});
const app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '/public/')));
//Passport middlewware
app.use(session({ secret: process.env.SESSION_SECRET }));
app.use(passport.initialize());
app.use(passport.session());

app.use(function (req,res,next)
{
  res.locals.user=req.user;
  next()
})
app.use('/', indexRouter);
app.use('/orders', ordersRouter);
app.use('/products', productsRouter);



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

module.exports = app;
