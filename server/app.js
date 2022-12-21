const express = require('express');
const app = express();
const mongoose = require('mongoose');
const { MONGO_URI } = require('./keys');

mongoose.set('strictQuery', false);
mongoose.connect(MONGO_URI)

mongoose.connection.on('connected', ()=> {
  console.log("mongo connected! ")
})
mongoose.connection.on('error', (err)=> {
  console.log("mongo connection error! ", err)
})

const PORT = 5000;

require('./models/user');
require('./models/post');
app.use(express.json())
app.use(require('./route/auth'))
app.use(require('./route/post'))

// const middleware = (req,res,next) => {
//   console.log('middleware executed! ')
//   next()
// }

// app.use(middleware);

// app.get('/about',(req,res)=> {
//   console.log('About')
//   return res.send(`About Page`)
// })

// app.get('/', middleware, (req,res)=> {
//   console.log('home')
//   return res.send(`Hello world 🌍`)
// })









app.listen(PORT, ()=> {
  console.log(`port is served on port: ${PORT}`)
})