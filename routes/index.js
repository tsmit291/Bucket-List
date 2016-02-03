var express = require('express');
var router = express.Router();
var knex = require('../db/knex')

function Users(){
  return knex('users')
}
function Bucketlist(){
  return knex('bucketlist')
}


/* GET home page. */
router.get('/', function(req, res, next) {
  knex('users').join('bucketlist',  )
  res.render('login');
});

/* GET community index page */
router.get('/bucketlists', function(req, res, next){
  res.render('index');
});

/* GET personal bucket list page */
router.get('/bucketlists/:userId', function(req, res, next){
  Users().where('id', req.params.userId).first().then(function(user){
    Bucketlist().where('user_id', req.params.userId).then(function(bucketlists){
      console.log(bucketlists)
      res.render('show', {user:user, bucketlists:bucketlists})
    })
  })
})

//POST NEW ITEM
router.post('/bucketlists/:userId/items', function(req,res,next){
      id = req.params.userId
      Bucketlist().insert({
        user_id:id,
        title:req.body.title,
        picture:req.body.picture,
        description:req.body.description,
        resourceUrlA:req.body.resourceUrlA,
        resourceA:req.body.resourceA,
        resourceUrlB:req.body.resourceUrlB,
        resourceB:req.body.resourceB,
        resourceUrlC:req.body.resourceUrlC,
        resourceC:req.body.resourceC
      }, 'id').then(function(results){
        res.redirect('/bucketlists/'+id)
      })
  })

/* CREATE personal bucket list item */
router.get('/bucketlists/:userId/new', function(req, res, next){
  res.render('bucketlist/new', {userId:req.params.userId});
});


/* EDIT personal bucket list item */
router.get('/bucketlists/:userId/items/:id/edit', function(req, res, next){
  var id = req.params.id
  var userId = req.params.userId
  Bucketlist().where('id',id).first().then(function(results){
    res.render('bucketlist/edit', {userId:userId, bucketlist:results});
  })
});

/* POST edits of personal bucket list items */
router.post('/bucketlists/:userId/items/:id', function(req, res, next){
  var userId = req.params.userId
  var id = req.params.id
  Bucketlist().where('id', id).update({
    user_id: userId,
    title:req.body.title,
    picture:req.body.picture,
    description:req.body.description,
    resourceUrlA:req.body.resourceUrlA,
    resourceA:req.body.resourceA,
    resourceUrlB:req.body.resourceUrlB,
    resourceB:req.body.resourceB,
    resourceUrlC:req.body.resourceUrlC,
    resourceC:req.body.resourceC
  }).then(function(results){
    res.redirect('/bucketlists/'+req.params.userId);
  })
});

/* DELETE a specific bucket list item */
router.get('/bucketlists/:userId/items/:id/delete', function(req, res, next){
  Bucketlist().where('id', req.params.id).del().then(function(results){
    res.redirect('/bucketlists/'+user_id);
  })
});


module.exports = router;
