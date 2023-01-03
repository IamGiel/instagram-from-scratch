const express = require("express");
const router = express();
const cors = require('cors')
router.use(cors())
const mongoose = require("mongoose");
const User = mongoose.model("User");
const bcrypt = require('bcryptjs'); 
const jwt = require('jsonwebtoken');
const dotenv = require("dotenv");
const { AUTHENTICATEv2 } = require("../middlewares/authenticate");

dotenv.config();

const AUTHENTICATE = (req,res,next) => {
  // console.log(req.headers)
  // console.log(req.headers.authorization)
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];
  if(!token){
    return res.status(401).json({error:'You need to be signed in!', status:'FAILED'})
  } else {
    // verify token
    jwt.verify(token, process.env.JWT_SECRET, (tokenError,usr) => {
      if(tokenError) {
        return res.status(401).json({error:'You need to be signed in, token error!', status:'FAILED'})
      }
      next()
    })
  }
}

router.get('/protected', AUTHENTICATEv2, (req,res,next)=> {
  console.log('req.user: ',req.user)
  res.send('Hello protected route')
})
router.post('/signup', (req,res)=> {
  const {name, email, password } = req.body;
  if(!name || !email || !password ) return res.status(422).json({error:'please add all fields required'}) 
  User.findOne({email})
    .then((savedUser)=>{
      console.log(savedUser)
      if(savedUser){
        return res.status(401).json({error:'Your already signed up!', status:'FAILED'})
      }
      bcrypt.hash(password, 12).then(hashedpw=> {
        const user = new User({
          email,
          password:hashedpw,
          name
        })

        user.save()
        .then(user=>{
          return res.json({success:'successfully signed up!'})
        })
        .catch(err=> {
          console.log(err)
          return res.json({error:err})
        })
      })
    })
    .catch(err=> {
      console.log(err)
          return res.json({error:err})
    })

})
router.post('/signin', (req,res,next)=> {
  const {email, password} = req.body;
  User.findOne({ email }).then(savedUser=>{
    console.log(savedUser)
   
    if(savedUser.email == email){
      // check password
      // Load hash from your password DB.
      bcrypt.compare(password, savedUser.password, function(err, isMatch) {
        // res === true
        console.log('password is match? ', isMatch)
        if(isMatch){
          // return res.status(200).json({success:'password matched!', status:'SUCCESS'})
          // give the user a token 
          const tok = jwt.sign({_id:savedUser._id}, process.env.JWT_SECRET)
          savedUser.password = null
          res.json({token:tok, user:savedUser})
        } else {
          res.status(401).json({error:'password mismatch!', status:'FAILED'})
        }
        
      });
    } else {
      return res.status(401).json({error:'Something wrong with the entered credentials!', status:'FAILED'})
    }
  })
  .catch(err=>{
    console.log('error block on signin')
    return res.status(401).json({error:'Email mismatch!', status:'FAILED'})
  })
})
module.exports = router;