const mongoose = require('mongoose');
const Schema = mongoose.Schema;
console.log("\ninside admin.js file\n");


let admin = new Schema({
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
  password: {
    type: String
  },
  Available_interest:[String],
  message:[{
    title:String,
    content:String,
    date:{
      type: Date,
          default: Date.now
    },
  }]
},{
    collection: 'admins'
});

module.exports = mongoose.model('Admin', admin);