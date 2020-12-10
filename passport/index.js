const passport = require('passport')
const UserService = require('../models/userService.js')
const LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(
   async function(username, password, done) {
    const user = await UserService.CheckCredential(username,password);
    if (!user)
        return done(null,false);
    return done(null,user);
  }
));
passport.serializeUser(function(user, done) {
    done(null, user);
  });
  
passport.deserializeUser(function(id, done) {
    UserService.getUser().then((user) => {
      done(null , user);
    });
  });
module.exports = passport;