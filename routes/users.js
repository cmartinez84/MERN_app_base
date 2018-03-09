const express = require('express');
const router = express.Router();
const User = require('../models/user');


// add next
router.post('/register', (req, res, next)=>{
  console.log("i was here");

  let newUser = new User({
    name: req.body.name,
    email: req.body.email,
    username: req.body.username,
    password: req.body.password,
  });
  console.log(newUser);

  User.addUser(newUser, (err, user)=>{
    console.log(err);
    if(err){
      return res.json({success: false, msg: 'Failed to register user!'})
    }
    else{
      return res.json({success: true, msg: 'Succeeded to register user!'})
    }
  });
});


module.exports = router;
