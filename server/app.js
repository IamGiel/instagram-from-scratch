const express = require('express');
const app = express();
const cors = require('cors')
app.use(cors())
app.use(express.json())
const mongoose = require('mongoose');
const { MONGO_URI } = require('./keys');

mongoose.set('strictQuery', false);
mongoose.set('debug', true);
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

app.use(require('./route/auth'))
app.use(require('./route/post'))

app.listen(PORT, ()=> {
  console.log(`port is served on port: ${PORT}`)
})