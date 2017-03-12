import express from 'express';
import expressJwt from 'express-jwt';
import Twit from 'twit';

import userStore from '../userStore';
import config from '../../config/server.config';

const apiRouter = express.Router();

apiRouter.use(expressJwt({secret: config.jwtSecret}));

apiRouter.get('/me', function(req, res){

  const { token, tokenSecret } = userStore.get(req.user.id);
  var T = new Twit({
    consumer_key: config.twitterConsumerKey,
    consumer_secret: config.twitterConsumerSecret,
    access_token: token,
    access_token_secret: tokenSecret,
  });

  T.get('account/verify_credentials', { skip_status: true })
  .catch(function (err) {
    console.log('caught error', err.stack)
  })
  .then(function (result) {
    console.log('data', result.data);
    res.send(result.data);
  });

});

export default apiRouter;