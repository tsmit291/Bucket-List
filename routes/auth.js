var express = require('express');
var router = express.Router();

router.get('/auth/facebook', function(req, res, next));

router.get('/auth/facebook/callback', function(req, res, next));








module.exports = router;
