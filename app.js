require('dotenv').config()
var express = require('express');
var knex = require('knex');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var routes = require('./routes/index');
var users = require('./routes/users');
var auth = require('./routes/auth');
var app = express();
var session = require('cookie-session');
var passport = require('passport')
var FacebookStrategy = require('passport-facebook').Strategy;

function User (){
  return knex({
    client: 'pg',
    connection: 'postgres://localhost/bucketlist'
  })('users');
};

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(passport.initialize());
app.use(passport.session());

passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: process.env.HOST+'/auth/facebook/callback'
    // don't forget to config your heroku HOST environment variable
  },
  function(accessToken, refreshToken, profile, done) {
    console.log("***PROFILE**");
    console.log(profile);
    process.nextTick(function () {
      User().where('fb_id', profile.id).first().then(function (user) {
        if(user){
          req.session.user = profile.id;
        // set user session
        } else {
          User().insert({fb_id: profile.id});
          console.log(fb_id);
          // insert into database
        }
      })
    })
    done(null, profile);
  }
));

passport.serializeUser(function(user, done){
  done(null, user.id);
});

passport.deserializeUser(function(id, done){
  User.findById(id, function(err, user){
    done(null, user)
  });
});

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);
app.use('/auth', auth);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
