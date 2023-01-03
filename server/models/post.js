const mongoose = require("mongoose");
const { stringify } = require("querystring");
const {ObjectId,Mixed} = mongoose.Schema.Types

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
    ref:'User'
  },
  photo:{
    type:String,
    default:'No photo yet'
  },
  date:{
    type:String,
    required:true
  }
})

mongoose.model('Post', PostSchema);