import Express from 'express';
import session from 'express-session';
import passport from 'passport';

import path from 'path';
import historyApiFallback from 'connect-history-api-fallback';
import openBrowser from 'react-dev-utils/openBrowser';

import paths from '../config/paths';
import serverConfig from '../config/server.config';

import auth from './routes/auth';
import api from './routes/api';

// Webpack Requirements
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

// Initialize the Express App
const app = new Express();

app.use(session({ secret: 'abc', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// Server routes
app.use('/auth', auth);
app.use('/api', api);

// Run Webpack middleware in development mode
if (process.env.NODE_ENV === 'development') {
  // webpack.config file use es6 modules, so only require it in development mode
  // as we don't compile config files with babel
  const config = require('../config/webpack.config.dev');
  const compiler = webpack(config);
  const webpackMiddleware = app.fallbackMiddleware =
   webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath });
  app.use(webpackMiddleware);
  app.use(webpackHotMiddleware(compiler));
}

if (process.env.NODE_ENV === 'development' || !process.env.TWISTER_DONT_SERVE_STATIC) {
  // path to public folder always should be relative to work with both production and development modes
  const staticPath = process.env.NODE_ENV === 'development' ? '../public' : './public';
  const staticMiddleware = Express.static(path.resolve(__dirname, staticPath));
  app.use(staticMiddleware);
  if (!app.fallbackMiddleware){
    app.fallbackMiddleware = staticMiddleware
  }

  //Fallback to index.html to use HTML 5 history API
  app.use(historyApiFallback({
    // Paths with dots should still use the history fallback.
    // See https://github.com/facebookincubator/create-react-app/issues/387.
    disableDotRule: true,
  }));

  // Finally, by now we have certainly resolved the URL.
  // It may be /index.html, so let the fallback middleware to try serving it again.
  if(app.fallbackMiddleware){
    app.use(app.fallbackMiddleware);
  }
}

// start app
app.listen(serverConfig.port, (error) => {
  if (!error) {
    console.log(`Twister is running on port: ${serverConfig.port}!`);
    openBrowser(`http://localhost:${serverConfig.port}`);
  }
});