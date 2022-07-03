const express = require('express');
const User = require('../models/User');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');

router.get('/error', (req,res)=>{
  res.send("some error occurred")
})
router.get('/register', (req,res)=>{
  res.send("register Page")
})
// router.post('/register', (req,res)=>{
//   const {name, email, password, role} = req.body

//   const newUser = new User({
//     name,
//     email,
//     password,
//     role
//   })

//   bcrypt.genSalt(10, (err, salt) => {
//     if(err) throw err

//     bcrypt.hash(newUser.password, salt, (error, hash)=> {
//       if(error) throw error
//       newUser.password = hash
//       newUser.save()
//         .then( user => {
//           res.status(201).send("User created" + user)
//         })
//         .catch(err => res.send(err))
//     })
//   })
// })


// router.post('/login', (req, res, next) =>{
//   passport.authenticate('local', function (err, account) {
//     req.logIn(account, function() {
//         if(account.email){
//           res.status(200).send("User Authenicated " + account.email);
//         }else{
//           res.status(500).send("UnAuthorized");
//         }
//     })
//     }
//   )(req, res, next)
// })


router.post('/register', function(req, res, next) {
  console.log('registering user');
  User.register(new User({email: req.body.email, role: req.body.role}), req.body.password, function(err) {
    if (err) {
      console.log('error while user register!', err);
      return next(err);
    }

    console.log('user registered!');

    res.redirect('/');
  });
});

router.post('/login', passport.authenticate('local', { failureRedirect: '/users/error', failureFlash: false }), function(req, res) {
  res.send('Login Successs');
});
module.exports = router;