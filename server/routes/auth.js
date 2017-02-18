import express from 'express';

import config from '../../config/server.config';

import passport from 'passport';
import {Strategy as TwitterStrategy} from 'passport-twitter';
import jwt from 'jsonwebtoken';

let user = {},
    accessToken, accessTokenSecret;

passport.use(new TwitterStrategy({
    consumerKey: config.twitterConsumerKey,
    consumerSecret: config.twitterConsumerSecret,
    callbackURL: "http://localhost:8000/auth/twitter/callback"
  },
  function(token, tokenSecret, profile, done) {
    accessToken = token;
    accessTokenSecret = tokenSecret;
    user.id = profile.id;
    user.name = profile.name;
    user.username = profile.screen_name;
    done(null, user);
  }
));

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

const authRouter = express.Router();

authRouter.get('/twitter/signin', passport.authenticate('twitter'));

authRouter.get('/twitter/callback', passport.authenticate('twitter', { failureRedirect: '/auth/failed' }),
  function(req, res) {
    let jwtoken = jwt.sign({id: req.user.id}, config.jwtSecret);
    res.redirect('/auth/success?id_token=' + jwtoken);
  }
);


export default authRouter;