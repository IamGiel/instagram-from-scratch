const express = require('express');
const app = express();
const PORT = 5000;

const middleware = (req,res,next) => {
  console.log('middleware executed! ')
  next()
}

// app.use(middleware);

app.get('/about',(req,res)=> {
  console.log('About')
  return res.send(`About Page`)
})

app.get('/', middleware, (req,res)=> {
  console.log('home')
  return res.send(`Hello world 🌍`)
})









app.listen(PORT, ()=> {
  console.log(`port is served on port: ${PORT}`)
})