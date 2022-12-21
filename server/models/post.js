const mongoose = require("mongoose");
const { stringify } = require("querystring");
const {ObjectId} = mongoose.Schema.Types

const PostSchema = new mongoose.Schema({
  title:{
    type:String,
    required:true
  },
  body:{
    type:String,
    required:true
  },
  postedBy:{
    type:ObjectId,
    required:true
  },
  photo:{
    type:String,
    default:'No photo yet'
  }
})

mongoose.model('Post', PostSchema);