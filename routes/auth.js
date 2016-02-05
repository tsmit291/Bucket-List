var express = require('express');
var router = express.Router();
var FacebookStrategy = require('passport-facebook').Strategy;
var passport = require('passport');
var knex = require('../db/knex');
var bcrypt = require('bcrypt');

function User() {
  return knex('users')
};

/*login with facebook*/
router.get('/facebook', passport.authenticate('facebook'));

/*logout*/
router.get('/logout', function(req, res, next){
  req.session = null;
  res.clearCookie('user')
  res.clearCookie('password')
  res.clearCookie('token')
  res.redirect('/');
});

/* route that facebook will call once user has authenticated properly*/
router.get('/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/login' }),
function (req, res, next) {
  res.cookie('facebook', req.user.id)
  res.redirect('/bucketlists');
});

/* log in without facebook */
router.post('/login', function(req, res, next){
  User().where({email:req.body.email}).first().then(function(found){
    if (found){
      if (bcrypt.compareSync(req.body.password, found.password)){
        res.cookie('user', req.body.email)
        res.redirect('/bucketlists');
      } else {
        res.send('Email/Password not valid')
      }
    } else {
      res.send('Email/Password not valid')
    }
  })
});

/* sign up */
router.post('/signup', function(req, res, next){
  var crypted = bcrypt.hashSync(req.body.password, 8)
  User().where('email', req.body.email).first().then(function(results){
    if (!results){
      User().insert({email: req.body.email, password: crypted, display_name: req.body.display_name, picture:req.body.picture}).then(function(result){
        res.cookie('user', req.body.email)
        res.cookie('password', crypted)
        res.redirect('/bucketlists');
      });
    }else{
      res.render('login', {taken:true})
    }
  })

});



module.exports = router;
