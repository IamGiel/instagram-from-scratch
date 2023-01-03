const mongoose = require("mongoose");
const { stringify } = require("querystring");
const {ObjectId,Mixed} = mongoose.Schema.Types

const PostSchema = new mongoose.Schema({
  title:{
    type:String,
    required:true
  },
  description:{
    type:String,
    required:true
  },
  postedBy:{
    type:ObjectId,
    ref:'User'
  },
  imageURL:{
    type:String,
    default:'No photo yet'
  },
  imageTitle:{
    type:String,
    default:'No photo yet'
  },
  date:{
    type:String,
    required:true
  },
  assigned:{
    name:{
      type:String,
      required:true
    },
    value:{
      type:String,
      required:true
    },
    avatar:{
      type:String,
      required:true
    },
   
  },
  labelled:{
    name:{
      type:String,
      required:true
    },
    value:{
      type:String,
      required:true
    },
  }
})


mongoose.model('Post', PostSchema);