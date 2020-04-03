var express = require('express');
var router = express.Router();
const bodyParser = require('body-parser');
var passport = require('passport');
var User = require('../models/user');
router.use(bodyParser.json());
var authenticate = require('../authenticate');

/* GET users listing. */
router.get('/', authenticate.verifyUser, authenticate.verifyAdmin,  function(req, res, next) {
  User.find({})
  .then((users)=>{
    res.statusCode=200;
    res.setHeader('content-type','applciation/json');
    res.json(users)
  },((err)=>{
    var err =  new Error('Error Occured')
    err.status = 401;
    next(err);
  }))
  .catch((err)=>{
    next(err);
  })
});

//for sign up

router.post('/signup',(req,res,next)=>{
  User.register(new User({username:req.body.username}),req.body.password,(err,user)=>{ 
    if(err){
      res.statusCode = 500;
      res.setHeader('content-type','application/json');
      res.json({err:err});
    }
    else{
      if(req.body.firstName)
        user.firstName = req.body.firstName;
      if(req.body.lastName)
        user.lastName = req.body.lastName;
      user.save((err,user)=>{
        if(err){
          res.statusCode = 500;
          res.setHeader('content-type','application/json');
          res.json({err:err});
          return;
        }
        passport.authenticate('local')(req,res,()=>{
        res.statusCode = 200;
        res.setHeader('content-type','application/json');
        res.json({success:true,status:'Registration Succsessful'});
        });
      });
    }
  });
});

router.post('/login',passport.authenticate('local'),(req,res)=>{
  var token = authenticate.getTOken({_id:req.user._id});
  res.statusCode = 200;
  res.setHeader('content-type','application/json');
  res.json({success:true,token:token,status:'Logged in succsessfully'});
});

router.get('/logout',(req,res,next)=>{
  req.logout();
  res.statusCode=200;
  res.json({status:'Bye Bye!'});
 
  
})

module.exports = router;
