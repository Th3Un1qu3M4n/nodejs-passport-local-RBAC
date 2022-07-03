const LocalStrategy = require('passport-local').Strategy;
// const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
// const passport = require('passport');

module.exports = function (passport) {
  passport.use(
    new LocalStrategy( {usernameField: 'email'}, (email, password, done)=>{
      User.findOne({email: email})
        .then(user => {
          console.log(user, email)
          if(!user) return done(null, false, {message: 'No User Find with email'})

          bcrypt.compare(password, user.password, (err, isMatch)=>{
            if(err) throw err

            if(isMatch){
              return done(null, user)
            }else{
              return done(null, false, {message: 'incorrect password'})
            }
          })

        })
        .catch( err => console.log(err))
    })
  )

  passport.serializeUser(function(user, done){
    done(null, user.id);
  })

  passport.deserializeUser(function(id, done){
    User.findById(id, function(err, user){
      done(err, user)
    })
  })



}
