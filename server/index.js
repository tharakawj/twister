import Express from 'express';
import path from 'path';
import historyApiFallback from 'connect-history-api-fallback';

import serverConfig from '../config/server.config';

// Webpack Requirements
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import config from '../config/webpack.config.dev';

// Initialize the Express App
const app = new Express();

// Run Webpack middleware in development mode
if (process.env.NODE_ENV === 'development') {
  const compiler = webpack(config);
  app.webpackDevMiddleware =
   webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath });
  app.use(app.webpackDevMiddleware);
  app.use(webpackHotMiddleware(compiler));
}

app.use(Express.static(path.resolve(__dirname, '../public')));

//Fallback to index.html to use HTML 5 history API
app.use(historyApiFallback({
  // Paths with dots should still use the history fallback.
  // See https://github.com/facebookincubator/create-react-app/issues/387.
  disableDotRule: true,
}));

// Finally, by now we have certainly resolved the URL.
// It may be /index.html, so let the webpack middleware to try serving it again.
if(app.webpackDevMiddleware){
  app.use(app.webpackDevMiddleware);
}

// start app
app.listen(serverConfig.port, (error) => {
  if (!error) {
    console.log(`Twister is running on port: ${serverConfig.port}!`);
  }
});