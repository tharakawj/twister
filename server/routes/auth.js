import express from 'express';
import passport from 'passport';
import {Strategy as TwitterStrategy} from 'passport-twitter';
import jwt from 'jsonwebtoken';
import expressJwt from 'express-jwt';

import userStore from '../userStore'
import config from '../../config/server.config';

passport.use(new TwitterStrategy({
    consumerKey: config.twitterConsumerKey,
    consumerSecret: config.twitterConsumerSecret,
    callbackURL: "http://localhost:8000/auth/twitter/callback"
  },
  function(token, tokenSecret, profile, done) {
    userStore.set(profile.id, { token, tokenSecret }, function(){
      done(null, profile);
    });
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

authRouter.post('/twitter/signout', expressJwt({secret: config.jwtSecret}),
  function(req, res){
    userStore.remove(req.user.id);
    res.sendStatus(200);
});


export default authRouter;