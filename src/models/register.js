const mongoose = require('mongoose');
const Schema = mongoose.Schema;
console.log("\ninside Register.js file\n");
let User = new Schema({
  fname: {
    type: String,
  },
  lname: {
    type: String,
  },
  username: {
    type: String,
    unique:true
  },
  follower:String,
  following:String
  ,
  password: {
    type: String
  },
  interest:[String],
  
},{
    collection: 'users'
});

module.exports = mongoose.model('User', User);