const express = require("express");
const router = express()
const cors = require('cors')
router.use(cors());
const mongoose = require("mongoose");
const { AUTHENTICATEv2 } = require("../middlewares/authenticate");
const Post = mongoose.model("Post");

const moment = require("moment");
const { faker } = require('@faker-js/faker');

router.get('/allposts',(req,res,next)=> {
  Post.find()
    .populate('postedBy', '_id name email')
    .then(posts=> {
      res.json(posts)
    })
    .catch(err=> {
      res.json(err)
    })
})

router.get('/mypost',AUTHENTICATEv2, (req,res,next)=> {
  console.log('mypost >>>>>>> ', req.user)
  Post.find({'postedBy':req.user._id})
    .populate('postedBy')
    .then(posts=> {
      res.json(posts)
    })
    .catch(err=> {mypost
      res.json(err)
    })
})

router.post('/createPost', AUTHENTICATEv2, (req,res,next)=> {

  const {title, description, postedBy, imageURL, date, labelled, assigned, imageTitle } = req.body
  const user = req.user;

  console.log(req.body)
  
  if(user && user.password){
    user.password = undefined;
  }
  if(!title || !description || !imageURL|| !imageTitle|| !date|| !labelled|| !assigned) {
    return res.json({error:'Missing required fields', status:'FAILED'})
  }

  Post.find({"postedByObj":req.user._id}) 
  .populate('postedBy')
  .then(p=> {
    console.log('here is p ', user)
    
    const post = new Post({
      title,
      description,
      postedBy:user,
      imageTitle,
      imageURL,
      date,
      labelled,
      assigned
    })

    console.log('testing here  ', post)

    console.log('post save is next')
    post.save().then(savePost=> {
      console.log('saved post data >>>>>>> ', savePost)
      return res.json({success:'successfull post!',status:'SUCCESS', createdPost: post})
    }).catch(err=>{
      console.log(err)
    })
  })
  .catch(err=> {
    res.json(err)
  })
  // const post = new Post({
  //   title,
  //   body,
  //   postedBy:user,
  //   postedByObj:userDetails,
  //   photo
  // })

  // console.log(post)
  // post.save().then(savePost=> {
  //   return res.json({success:'successfull post!',status:'SUCCESS', createdPost: post})
  // }).catch(err=>{
  //   console.log(err)
  // })
})

module.exports = router;


