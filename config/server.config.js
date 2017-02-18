var config = {
  port: process.env.PORT || 8000,
  twitterConsumerKey: process.env.TWISTER_APP_TWITTER_CONSUMER_KEY || 'aawDAUGbq3HXNqIVTjNHKA4mp',
  twitterConsumerSecret: process.env.TWISTER_APP_TWITTER_CONSUMER_SECRET || '75vIWbZoRbCwVTkLNqGnIC1SvmqRYC5sLECeGrol8VXNVVYWmF',
  jwtSecret: process.env.TWISTER_APP_JWT_SECRET || 'supersecret'
};

module.exports = config;