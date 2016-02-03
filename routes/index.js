var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login');
});

/* GET community index page */
router.get('/bucketlists', function(req, res, next){
  res.render('index');
});

/* GET personal bucket list page */
router.get('/bucketlists/:userId', function(req, res, next){
  res.render('show');
});

//NEW//render main edit page
router.get('/bucketlists/:userId/edit', function(req,res,next){
  res.render('edit')
})

//NEW//POST updated info
router.post('/bucketlists/:userId', function(req,res,next){
  res.redirect('/bucketlists')
})

/* CREATE personal bucket list item */
router.get('/bucketlists/:userId/new', function(req, res, next){
  res.render('bucketlist/new');
});

/* POST new personal bucket list item */
router.post('/bucketlists/:userId', function(req, res, next){
  res.redirect('/bucketlists/'+req.params.userId);
});

/* EDIT personal bucket list item */
router.get('/bucketlists/:userId/edit/:id', function(req, res, next){
  res.render('bucketlists/edit');
});

/* POST edits of personal bucket list items */
router.post('/bucketlists/:userId/edit/:id', function(req, res, next){
  res.redirect('/bucketlists/'+req.params.userId);
});

/* DELETE a specific bucket list item */
router.post('/bucketlists/:userId/delete/:id', function(req, res, next){
  res.redirect('/bucketlists/'+req.params.userId);
});


module.exports = router;
