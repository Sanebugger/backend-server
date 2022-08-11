const jwt = require('jsonwebtoken');
const express = require('express')
const router = express.Router();
const bcrypt =require('bcryptjs') ;


require('../db/conn');
const User = require("../model/userSchema");

//home page route below:-

router.get('/', (req, res) => {
  res.send('Hello World! ,from server router js')
})

// register(signup) route below:-
/*  PROMISES METHOD

router.post('/register', (req, res) => {
  const { name, email, phone, work, password, cpassword } = req.body;

  //console.log(name); 
  //console.log(req.body.name);
  //console.log(req.body.email);
  //res.json({message:req.body})
  if (!name || !email || !phone || !work || !password || !cpassword) {
    return res.status(422).json({
      error: "plz fill all inputs"
    })
  }
  User.findOne({ email: email })
    .then((userExist) => {
      if (userExist) {
        return res.status(422).json({ error: "email already exist" });
      }

      const user = new User({ name, email, phone, work, password, cpassword });

      user.save().then(() => {
        return res.status(201).json({ message: "user registered successfully" });
      }).catch((error) => res.status(500).json({ error: "failed to register" }));

  }).catch((err)=>{console.log(err);})
});


*/
// below is ASYNC AWAIT method
router.post('/register', async (req, res) => {
  const { name, email, phone, work, password, cpassword } = req.body;

  if (!name || !email || !phone || !work || !password || !cpassword) {
    return res.status(422).json({ error: "plz fill all inputs" });
  }

  try {

    const userExist = await User.findOne({ email: email });

    if (userExist) {
      return res.status(422).json({ error: "email already exist :o" });
    } else if (password != cpassword) {
      return res.status(422).json({ error: "password not matching bruhh! :[" });
    } else {
      const user = new User({ name, email, phone, work, password, cpassword });
      //right here ,we hv do password hashing stuffs
      const userRegister = await user.save();
      if (userRegister) {
        res.status(201).json({ message: "user registered successfully :)" });
      } else {
        res.status(201).json({ message: "failed to register :0" });
      }
    }

  } catch (err) {
    console.log(err);
  }

});




//login route below:-
router.post('/login', async (req, res) => {

  
  try {
    let token;
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(422).json({ error: "plz fill all inputs" });
    }

    const userLogin = await User.findOne({ email: email });
    //console.log(userLogin);

    if (userLogin) {
      const isMatch = await bcrypt.compare(password, userLogin.password);
      
      token = await userLogin.generateAuthToken();
      console.log(token);

      //storing generated token in cookie
      res.cookie('jwtoken',token,{
        expires: new Date(Date.now()+25892000000),
        httpOnly:true
      });

      if (!isMatch) {
        res.status(400).json({ error: "invalid credentials pass" });
      } else {
        res.status(201).json({ message: "u successfully logged in " });
      }
    }else{
      res.status(400).json({ error: "invalid credentials " });
    }


    /*
    if(!userLogin){
       res.status(400).json({error:"user error,failed to log in"});
       }else{
      res.status(201).json({ message: "u successfully logged in " });
      }
   */

  } catch (err) {
    console.log(err);
  }

});


module.exports = router;