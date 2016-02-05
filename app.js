require('dotenv').config()
var SECRET = '7164ec20-debf-42b4-bad3-55912113b2cb';
var express = require('express');
var knex = require('./db/knex');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var routes = require('./routes/index');
var users = require('./routes/users');
var auth = require('./routes/auth');
// var custom = require('./custom')
var jwt = require('jsonwebtoken');
var app = express();
var session = require('cookie-session');
var passport = require('passport')
var FacebookStrategy = require('passport-facebook').Strategy;

function Users(){
  return knex('users')
};

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(passport.initialize());
app.use(passport.session());

passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: process.env.HOST + '/auth/facebook/callback'
    // don't forget to config your heroku HOST environment variable
  },
  function(accessToken, refreshToken, profile, done) {
    Users().where('fb_id', profile.id).first().then(function(user){
      if(user) {
        done(null, profile);
      } else {
        Users().insert({
          fb_id: profile.id,
          display_name: profile.displayName
        },'id').then(function(user){
          done(null, profile)
        })
      }
    });
  }
))

passport.serializeUser(function(user, done){
  done(null, user.id);
});

passport.deserializeUser(function(id, done){
  Users().findById(id, function(err, user){
    done(null, user)
  });
});

// cloudilly info //




// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.post('/tokens', function(req, res){
  res.end(jwt.sign({device: req.body.device}, SECRET, {expiresIn: 86400}))
});

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
