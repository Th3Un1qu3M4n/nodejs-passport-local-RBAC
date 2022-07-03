const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('./models/User');

const app = express();

require('./config/passport')(passport)

app.use(session({
  secret:"Done Expose This",
  resave: true,
  saveUninitialized: false
}))

app.use(passport.initialize())
app.use(passport.session())
// passport.use(new LocalStrategy(User.authenticate()));
passport.use(User.createStrategy());


mongoose.connect('mongodb://localhost/passport',{ useNewUrlParser: true})
  .then( () => { console.log('MongoDB Connected')})
  .catch( (err) => { console.log(err)})
  
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use('/users', require('./routes/users') );
app.use('/roles', require('./routes/roles') );

app.get('/', (req, res) => {
  res.send('Hello World!');
});


app.listen(process.env.PORT || 5000, () =>
  console.log('Example app listening on port 5000!'),
);
