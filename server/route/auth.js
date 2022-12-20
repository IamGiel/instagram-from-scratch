const express = require("express");
const router = express();
const mongoose = require("mongoose");
const User = mongoose.model("User");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {JWT_SECRET} = require('../keys');

router.get('/', (req,res,next)=> {
  res.send('Hello home route')
})
router.post('/signup', (req,res)=> {
  const {name, email, password } = req.body;
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
          const tok = jwt.sign({_id:savedUser._id}, JWT_SECRET)
          res.json({token:tok})
        } else {
          return res.status(401).json({error:'password mismatch!', status:'FAILED'})
        }
        
      });
    } else {
      return res.status(401).json({error:'Something wrong with the entered credentials!', status:'FAILED'})
    }
  })
  .catch(err=>{
    console.log(err)
    return res.status(401).json({error:'Email mismatch!', status:'FAILED'})
  })
})
module.exports = router;