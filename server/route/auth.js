const express = require("express")
const router = express();
const mongoose = require("mongoose");
const User = mongoose.model("User");
const bcrypt = require('bcryptjs')

router.get('/', (req,res,next)=> {
  res.send('Hello home route')
})
router.post('/signup', (req,res)=> {
  const {name, email, password } = req.body;
  // if(!email || !password || !name){
  //   return res.status(401).json({error:'please provide all fields, name, email and password', status:'FAILED'})
  // } 
  
  // return res.status(200).json({success:'successful signup!', status:'SUCCESS'})
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

module.exports = router;