
const jwt = require('jsonwebtoken');
const dotenv = require("dotenv");
dotenv.config();

const mongoose = require("mongoose");
const User = mongoose.model("User");

const AUTHENTICATEv2 = (req,res,next) => {
  // console.log('AUTHENTICATEv2 ',req.headers)
  // console.log(req.headers.authorization)
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];
  if(!token){
    return res.status(401).json({error:'You need to be signed in!', status:'FAILED'})
  } else {
    // verify token
    jwt.verify(token, process.env.JWT_SECRET, (tokenError,payload) => {
      if(tokenError) {
        return res.status(401).json({error:'You need to be signed in, token error!', status:'FAILED'})
      }

      const {_id} = payload
        User.findById(_id).then(userdata=>{
            req.user = userdata
            if(req.user){
              next()
            } else {
              return res.status(401).json({error:'You need to be signed in!', status:'FAILED'})
            }
        })
    })
  }
}

module.exports = {AUTHENTICATEv2};