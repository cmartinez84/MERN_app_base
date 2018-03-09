const mongoose = require('mongoose');
const bcrypt = require  ('bcryptjs');
const config = require('../config/database');

//bcrypt can be used outside of routes, but that is more a concern for our model
//this file is the intermediary between our app and he database. avoid direct calls to mongoose directly

const UserSchema = new mongoose.Schema({
  name: {
    type: String
  },
  email : {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  }
})
//
const User = module.exports = mongoose.model('User', UserSchema)


module.exports.getUserById = function(id, cb){
  User.findById(id, cb)
}

module.exports.getUserByUserName = function(username, cb){
  const query = {username: username}
  User.findOne(query, cb)
}

module.exports.addUser = function(newUser, cb){
  bcrypt.genSalt(10, (err, salt)=>{
    bcrypt.hash(newUser.password, salt,(err, hash)=>{
      if(err) throw err;
      newUser.password = hash;
      newUser.save(cb);
    })
  })
}

//for use with login
module.exports.comparePassword = function(candidatePassword, hash, cb){
  bcrypt.compare(candidatePassword, hash, (err, isMatch)=>{
    if(err) throw err;
    cb(null, isMatch);
  })
}

//update using request body
//mongoose matches property values in body to document properties and overwrites, cannot fudge new properties

module.exports.updateUserInfo = function(body, cb){
  User.findByIdAndUpdate(body.id, body, cb);
}

module.exports.updateUserPassword = function(body, cb){
  // Validates a strong password. It must be between 8 and 10 characters, contain at least one digit and one  alphabetic character, and must not contain special characters
  const re = /(?!^[0-9]*$)(?!^[a-zA-Z]*$)^([a-zA-Z0-9]{8,15})$/;
  const result = re.test(body.password);

  if(!result){
    var error =  new Error('Password did meet specifications');
    throw error;
  }

  bcrypt.genSalt(10, (err, salt)=>{
    bcrypt.hash(body.password, salt,(err, hash)=>{
      if(err) throw err;
      User.findByIdAndUpdate(body.id, {password: hash}, cb);
    })
  })
}

module.exports.deleteUser = function(id, cb){
  User.remove({_id: id}, cb);
}
