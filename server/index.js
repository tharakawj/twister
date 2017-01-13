import Express from 'express';
import path from 'path';

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
  app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }));
  app.use(webpackHotMiddleware(compiler));
}

app.use(Express.static(path.resolve(__dirname, '../public')));

// start app
app.listen(serverConfig.port, (error) => {
  if (!error) {
    console.log(`Twister is running on port: ${serverConfig.port}!`);
  }
});