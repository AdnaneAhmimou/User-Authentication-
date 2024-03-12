const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const connection = require("./database");
const { use } = require("../routes/route");
const validPassword = require("../lib/passwordUtils").validPassword;
const User = connection.models.User;

// This is the name of the field that will be used to authenticate the user
//passport do not recognize the default fields, so we need to tell it what fields to use

const customFields = {
  usernameField: "username",
  passwordField: "password",
};

const verifyCallback = (username, password, done) => {
  User.findOne({ username: username })
  .then((user) => {
    if (!user) {
      return done(null, false);
    }
    const isValid = validPassword(password, user.hash, user.salt);
    if (isValid) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  })
  .catch((err) => {
    done(err);
  });

 
};

const strategy = new LocalStrategy(customFields, verifyCallback);

passport.use(strategy);


//this has to do with express session and how put a user into the session and how to take it out and put it back into the database
passport.serializeUser((user, done) => {
  done(null, user.id);
});


passport.deserializeUser((userId, done) => {
  User.findById(userId)
    .then((user) => {
      done(null, user);
    })
    .catch((err) => done(err));
});
