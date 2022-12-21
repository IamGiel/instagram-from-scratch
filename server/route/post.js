const express = require("express");
const router = express();
const mongoose = require("mongoose");
const { AUTHENTICATEv2 } = require("../middlewares/authenticate");
const Post = mongoose.model("Post");

router.get('/allposts',(req,res,next)=> {
  Post.find()
    .then(posts=> {
      res.json(posts)
    })
    .catch(err=> {
      res.json(err)
    })
})

router.post('/createPost', AUTHENTICATEv2, (req,res,next)=> {
  const {title, body, postedBy, photo} = req.body
  const user = req.user;
  
  if(!title && !body) return res.json({error:'No title and Body', status:'FAILED'})

  const post = new Post({
    title,
    body,
    postedBy:user,
    photo
  })

  console.log(post)
  post.save().then(savePost=> {
    return res.json({success:'successfull post!',status:'SUCCESS', createdPost: post})
  }).catch(err=>{
    console.log(err)
  })
})

module.exports = router;
