var express = require('express');
var router = express.Router();
var knex = require('../db/knex')

function Users(){
  return knex('users')
}
function Bucketlist(){
  return knex('bucketlist')
}

router.get('/',function(req,res,next){
  res.render('login')
})

//INDEX
router.get('/bucketlists', function(req,res){
  var search
  var querystring = req.query.search

  if (querystring) {
    search=querystring
  }else{
    search='Hang Gliding'
  }

  knex.raw("select user_id, id from bucketlist where lowertitle like LOWER('%"+search+"%')").then(function(searchUsers){
    console.log('SEARCHUSERS')
    // console.log(searchUsers.rows)
    var users = []
    var boldItem = []
      searchUsers.rows.forEach(function(e){
        users.push(e['user_id'])
        boldItem.push(e['id'])
      })
      users = users.filter(function(curr,idx,arr){
        return arr.indexOf(curr) === idx
      })

        console.log('USERS')
        // console.log(users)
        console.log('BOLDITEM')
        // console.log(boldItem)
        Users().whereIn('id', users).then(function(userData){
        console.log('USERDATA')
        // console.log(userData)
          Bucketlist().whereIn('user_id', users).then(function(bucketlists){
            console.log('BUCKETLISTS')
            // console.log(bucketlists)
            // console.log(bucketlists)
            // console.log(userData)
            console.log(boldItem)
            res.render('index', {bucketlists:bucketlists, userData:userData, boldItem:boldItem});
          })
        })
    })
})

//Upon SEARCH
router.post('/bucketlists', function(req,res,next){
  var search = req.body.search
  res.redirect('/bucketlists?search='+search)
})


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
      var id = req.params.userId
      var lowertitle = req.body.title.toLowerCase()
      Bucketlist().insert({
        user_id:id,
        title:req.body.title,
        lowertitle: lowertitle,
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
  var lowertitle = req.body.title.toLowerCase()
  Bucketlist().where('id', id).update({
    user_id: userId,
    title:req.body.title,
    lowertitle: lowertitle,
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
  userId = req.params.userId
  Bucketlist().where('id', req.params.id).del().then(function(results){
    res.redirect('/bucketlists/'+userId);
  })
});


module.exports = router;
