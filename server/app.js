const express = require('express');
const app = express();
const PORT = 5000;

app.use('/',(req,res)=> {
  res.send(`Hello world 🌍`)
})

app.listen(PORT, ()=> {
  console.log(`port is served on port: ${PORT}`)
})