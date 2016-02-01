var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET community index page */
router.get('/bucketlists', function(req, res, next){
  res.render('index');
});

/* GET personal bucket list page */
router.get('/bucketlists/:userId', function(req, res, next){
  res.render('show');
});

/* CREATE personal bucket list item */
router.get('/bucketlists/:userId/new', function(req, res, next){
  res.render('new');
});

/* POST new personal bucket list item */
router.post('/bucketlists/:userId', function(req, res, next){
  res.redirect('/show');
});

/* EDIT personal bucket list item */
router.get('/bucketlists/:userId/edit/:id', function(req, res, next){
  res.render('edit');
});

/* POST edits of personal bucket list items */
router.post('/bucketlists/:userId', function(req, res, next){
  res.redirect('/show');
});

/* DELETE a specific bucket list item */
router.post('/bucketlists/:userId/delete/:id', function(req, res, next){
  res.redirect('/show');
});


module.exports = router;
