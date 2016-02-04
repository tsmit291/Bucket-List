var express = require('express');
var router = express.Router();
var FacebookStrategy = require('passport-facebook').Strategy;
var passport = require('passport');
var knex = require('../db/knex');
var bcrypt = require('bcrypt');

function User() {
  return knex('users')
};

/*login*/
router.get('/facebook', passport.authenticate('facebook'));

/*logout*/
router.get('/logout', function(req, res, next){
  req.session = null;
  res.redirect('/');
});

/* route that facebook will call once user has authenticated properly*/
router.get('/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/login' }),
function (req, res, next) {
  res.redirect('/bucketlists');
});

/* sign up */
router.post('/signup', function(req, res, next){
  var crypted = bcrypt.hashSync(req.body.password, 8)
  User().insert({email: req.body.email, password: crypted}).then(function(result){
    res.cookie('user', req.body.email)
    res.redirect('/bucketlists');
  });
});

module.exports = router;
