const mongoose = require('mongoose');
const Schema = mongoose.Schema;
console.log("\ninside article.js file\n");
let comment = new Schema({
  Article_id: String,
 comment:{
    text: String,
    author: {
      type: String,
      default:'Guest'
    },
    createDate: {
        type: Date,
        default: Date.now
    }
  }
},{
    collection: 'Comments'
  });
module.exports = mongoose.model('comment', comment);