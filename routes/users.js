const express = require('express');
const router = express.Router();
const User = require('../models/user');


// all routes are prefixed with users, as declared in server.js
//calback functions are executed by default model behavior

//register new user
router.post('/register', (req, res, next)=>{
  let newUser = new User({
    name: req.body.name,
    email: req.body.email,
    username: req.body.username,
    password: req.body.password,
  });

  User.addUser(newUser, (err, user)=>{
    if(err){
      return res.json({success: false, msg: 'Failed to register user!'})
    }
    else{
      return res.json({success: true, msg: 'Succeeded to register user!'})
    }
  });
});

//delete user by id
router.delete('/delete', (req, res, next)=>{
  const id = req.body.id;
  User.deleteUser(id, (err,status)=>{
    if(err){
      return res.json({success: false, msg: 'Failed to delete user!'});
    }
    else{
      return res.json({success: true, msg: `User ${id} was deleted`});
    }
  })
})

//update user info by id
router.patch('/update', (req, res, next)=>{
  User.updateUserInfo(req.body, (err, userUpdated)=>{
    if(err){
      return res.json({success: false, msg: 'Failed to delete user!'});
    }
    else{
      return res.json({success: true, msg: `Your information was deleted`});
    }
  })
})
//  ex json for update
//  {
// 	"id": "5aa225f39c9e0f48acc60067",
// 	"name:": "Merry Christmas",
// }

// change password
router.patch('/change_password', (req, res, next)=>{
  User.updateUserPassword(req.body, (err, userUpdated)=>{
  if(err){
    return res.json({success: false, msg: 'Failed to delete user!'});
  }
  else{
    return res.json({success: true, msg: `Your password was changed`});
  }
  });
})


module.exports = router;
