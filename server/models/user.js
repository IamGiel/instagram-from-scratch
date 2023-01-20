const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name:{
    type:String,
    required:true
  },
  email:{
    type:String,
    required:true
  },
  password:{
    type:String,
    required:true
  },
  imageUrl:{
    type:String,
    required:false
  }
});

mongoose.model('User', UserSchema);