const express = require('express');
var createError = require('http-errors');
const session = require('express-session');
const db = require('./middleware/dbConnect').db;
const mongoose = require('./middleware/dbConnect').mongoose;
const passport = require('passport');
require('./middleware/passport'); // includes all the passport stuff

var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
const cors = require('cors');
const crypto = require('crypto');

const MongoStore = require('connect-mongo');


var authRouter = require('./routes/auth'); 
const app = express();



app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade'); 

app.use(cors()); // cross-origin requests
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());         
app.use(express.static(path.join(__dirname, 'public')));

console.log(db.getClient());

app.use(
  session({
    path: '/', 
    secret: process.env.SESSION_SECRET,
    //crypto.randomBytes(16).toString('hex'),
    collectionName: 'sessions',
    httpOnly: true,
    // since we're not using https:
    secure: false,
    // don't resave avery time we change pages
    resave: false,
    // don't make a session until something's stored
    saveUninitialized: false,
    // store for 60 minutes * 24 = 1 day
    cookie: { maxAge: 24 * 60 * 60000 },
    store: MongoStore.create({
      clientPromise: db.getClient()
    })
  })
);

app.use(passport.initialize());
app.use(passport.session());

// routes ////////////////////////////////////////////////////////

app.use('/auth', authRouter);
console.log("auth router attached");

// catch 404 and forward to error handler 
app.use(function (req, res, next) {
  console.log(req.get('host') + "/" + req.originalURL);
  next(createError(404));
});

app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(3001, () => {
  console.log(`Server is running on port 3001.`);
});

module.exports = app;