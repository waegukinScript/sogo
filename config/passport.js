const passport = require("passport");
// const request = require('request');
// const { Strategy: InstagramStrategy } = require('passport-instagram');
const { Strategy: LocalStrategy } = require("passport-local");
// const { Strategy: FacebookStrategy } = require('passport-facebook');
// const { Strategy: SnapchatStrategy } = require('passport-snapchat');
// const { Strategy: TwitterStrategy } = require('passport-twitter');
// const { Strategy: GitHubStrategy } = require('passport-github');
// const { OAuth2Strategy: GoogleStrategy } = require('passport-google-oauth');
// const { Strategy: LinkedInStrategy } = require('passport-linkedin-oauth2');
// const { Strategy: OpenIDStrategy } = require('passport-openid');
// const { OAuthStrategy } = require('passport-oauth');
// const { OAuth2Strategy } = require('passport-oauth');
// const _ = require('lodash');

const User = require("../models/User");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

/**
 * Sign in using Email and Password.
 */
passport.use(
  new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
    User.findOne({ email: email.toLowerCase() }, (err, user) => {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false, { msg: `Email ${email} not found.` });
      }
      user.comparePassword(password, (err, isMatch) => {
        if (err) {
          return done(err);
        }
        if (isMatch) {
          return done(null, user);
        }
        return done(null, false, { msg: "Invalid email or password." });
      });
    });
  })
);

/**
 * Login Required middleware.
 */
exports.isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
};

/**
 * Authorization Required middleware.
 */
exports.isAuthorized = (req, res, next) => {
  const provider = req.path.split("/").slice(-1)[0];
  const token = req.user.tokens.find(token => token.kind === provider);
  if (token) {
    next();
  } else {
    res.redirect(`/auth/${provider}`);
  }
};
