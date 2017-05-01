import express from 'express';
import expressJwt from 'express-jwt';
import Twit from 'twit';

import userStore from '../userStore';
import config from '../../config/server.config';

const apiRouter = express.Router();

apiRouter.use(expressJwt({secret: config.jwtSecret}));

const twitterEndPoints = [
  'account/verify_credentials',
  'statuses/home_timeline',
  'lists/list',
  'lists/statuses',
  'friends/list',
  'lists/members'
];

function removeFirstSlash(text){
  if (text.indexOf('/') === 0)
    return text.replace('/','');
  return text;
}

apiRouter.get('/*', function(req, res){

  const path = removeFirstSlash(req.path);

  if(twitterEndPoints.indexOf(path) === -1){
    res.sendStatus(404);
  }else{
    userStore.get(req.user.id, function(authObj){

      if (!authObj) {
        return res.sendStatus(403);
      }

      var T = new Twit({
        consumer_key: config.twitterConsumerKey,
        consumer_secret: config.twitterConsumerSecret,
        access_token: authObj.token,
        access_token_secret: authObj.tokenSecret,
      });

      T.get(path, req.query)
      .catch(function (err) {
        console.log('caught error', err.stack)
      })
      .then(function (result) {
        res.send(result.data);
      });
    });
  }
});

export default apiRouter;