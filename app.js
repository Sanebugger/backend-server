const express = require('express')
const dotenv = require('dotenv') //How to Secure You Code by Keeping your Password, API Keys Secret with DOTENV 
const app = express()
//const PORT = 5000;  we r providing our port through config.env ,basically hiding the port (as config.env is is .gitignore too)

dotenv.config({path:'./config.env'})
require('./db/conn');
app.use(express.json());//to understand json
const PORT = process.env.PORT;

const User = require('./model/userSchema')

app.use(require('./router/auth'))//we r linking our router to ease our route
//middleware
const middleware = (req, res,next)=>{
  console.log(`okokok middleware is authenticating here`);
  next();
}

app.get('/', (req, res) => {
  res.send('Hello World! ,from server')
})
app.get('/about',middleware, (req, res) => {
  console.log(`okokok middleware is here`);
  res.send('hello,we are in about page')
})
app.get('/signin', (req, res) => {
  res.send('this is our signIn page')
})
app.get('/signup', (req, res) => {
  res.send('this is our registratioon page')
})

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})