const mongoose = require('mongoose');
const Schema = mongoose.Schema;
console.log("\ninside article.js file\n");
let article = new Schema({
  author:{
    type:String,
    default: 'GUEST'
  },
  articles:[{
    author:{
      type:String,
      default: 'GUEST'
    },
    title:String,
    content:String,
    interest:String,
    imagePath:String,
    date:{
      type: Date,
          default: Date.now
    },
  }]
},{
  collection: 'Articles'
});
module.exports = mongoose.model('article', article);