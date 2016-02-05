var express = require('express');
var router = express.Router();
var knex = require('../db/knex')
var autoqueries = require('../public/javascripts/autoqueries')

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
  var math = Math.floor(Math.random()*15)
  var autoquery = autoqueries[math]
  if (querystring) {
    search= querystring
  }else{
    search= autoquery
  }

  knex.raw("select user_id, id from bucketlist where lowertitle like LOWER('%"+search+"%')").then(function(searchUsers){
    var users = []
    var boldItem = []
      searchUsers.rows.forEach(function(e){
        users.push(e['user_id'])
        boldItem.push(e['id'])
      })
      users = users.filter(function(curr,idx,arr){
        return arr.indexOf(curr) === idx
      })

        Users().whereIn('id', users).then(function(userData){
          Bucketlist().whereIn('user_id', users).then(function(bucketlists){
            res.render('index', {bucketlists:bucketlists, userData:userData, boldItem:boldItem, autoquery:autoquery});
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
      Users().where('email', req.cookies.user).first().then(function(results){

        var auth = false
        if (results.id == req.params.userId){
          auth = true;
        }

        res.render('show', {user:user, bucketlists:bucketlists, auth:auth})

      })
    })
  })
})
///////////////////////////////MIDDLEWARE////////////////////////////

// router.use(function(req,res,next){
//   console.log('**************')
//   console.log(req.params.userId)
//   Users().where('email', req.cookies.user).then(function(results){
//     if (results.id == req.params.userId){
//       next()
//     }else if(!req.cookies.user){
//       res.redirect('/')
//     }else{
//       res.redirect('/bucketlists/'+results.id, {notauth:true})
//     }
//   })
// })

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
