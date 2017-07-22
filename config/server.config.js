var config = {
  port: process.env.PORT || 8000,
  twitterConsumerKey:
    process.env.TWISTER_APP_TWITTER_CONSUMER_KEY || "<twitter_consumer_key>",
  twitterConsumerSecret:
    process.env.TWISTER_APP_TWITTER_CONSUMER_SECRET ||
    "<twitter_consumer_secret>",
  jwtSecret: process.env.TWISTER_APP_JWT_SECRET || "secret"
};

module.exports = config;
