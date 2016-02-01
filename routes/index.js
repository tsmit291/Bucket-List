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
router.get('/bucketlists/:id', function(req, res, next){
  
})

module.exports = router;
