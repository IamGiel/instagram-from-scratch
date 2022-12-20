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
  // if(!email || !password){
  //   return res.status(401).json({error:'Please provide correct email and password', status:'FAILED'})
  // }
  // return res.status(200).json({success:'Sign in success!', status:'SUCCESS'})
  // check mongodb for existing user meail and matching password
  
  User.findOne({ email }).then(usr=>{
    console.log(usr)
   
    if(usr.email == email){
      // check password
      // Load hash from your password DB.
      bcrypt.compare(password, usr.password, function(err, response) {
        // res === true
        console.log('password is match? ', response)
        if(response){
          return res.status(200).json({success:'success login!', status:'SUCCESS'})
        } else {
          return res.status(401).json({error:'pssword mismatch!', status:'FAILED'})
        }
        
      });

    } else {
      return res.status(401).json({error:'Something wrong with the entered credentials!', status:'FAILED'})
    }
  }).catch(err=>{
    console.log(err)
    return res.status(401).json({error:'Email mismatch!', status:'FAILED'})
  })

})

module.exports = router;