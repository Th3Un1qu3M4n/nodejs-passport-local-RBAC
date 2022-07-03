const express = require('express');
const User = require('../models/User');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');

router.get('/login', (req,res)=>{
  res.send("Login Page")
})
router.get('/register', (req,res)=>{
  res.send("register Page")
})
router.post('/register', (req,res)=>{
  const {name, email, password, role} = req.body

  const newUser = new User({
    name,
    email,
    password,
    role
  })

  bcrypt.genSalt(10, (err, salt) => {
    if(err) throw err

    bcrypt.hash(newUser.password, salt, (error, hash)=> {
      if(error) throw error
      newUser.password = hash
      newUser.save()
        .then( user => {
          res.status(201).send("User created" + user)
        })
        .catch(err => res.send(err))
    })
  })
})


router.post('/login', (req, res, next) =>{
  passport.authenticate('local', function (err, account) {
    req.logIn(account, function() {
        if(account.email){
          res.status(200).send("User Authenicated " + account.email);
        }else{
          res.status(500).send("UnAuthorized");
        }
    })
    }
  )(req, res, next)
})
module.exports = router;