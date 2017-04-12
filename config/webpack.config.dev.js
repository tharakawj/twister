import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import InterpolateHtmlPlugin from 'react-dev-utils/InterpolateHtmlPlugin';
import getClientEnvironment from './env';
import paths from './paths';

// Webpack uses `publicPath` to determine where the app is being served from.
// In development, we always serve from the root. This makes config easier.
const publicPath = '/';
// `publicUrl` is just like `publicPath`, but we will provide it to our app
// as %PUBLIC_URL% in `index.html` and `process.env.PUBLIC_URL` in JavaScript.
// Omit trailing slash as %PUBLIC_PATH%/xyz looks better than %PUBLIC_PATH%xyz.
const publicUrl = '';

// Get environment variables to inject into our app.
var env = getClientEnvironment(publicUrl);

module.exports = {
  devtool: 'cheap-module-source-map',
  entry: [
    require.resolve('./polyfills'),
    'webpack-hot-middleware/client?reload=true', //note that it reloads the page if hot module reloading fails.
    paths.appIndexJs
  ],
  output: {
    path: paths.appBuild,
    // Add /* filename */ comments to generated require()s in the output.
    pathinfo: true,
    publicPath: publicPath,
    filename: 'js/bundle.js'
  },
  module: {
    rules: [
      {
        exclude: [
          /\.html$/,
          /\.(js|jsx)$/,
          /\.css$/,
          /\.json$/
        ],
        use: [{
          loader:'url-loader',
          options:{
            limit: 10000,
            name: 'media/[name].[hash:8].[ext]'
          }
        }]
      },
      {
        test: /\.(js|jsx)$/,
        include: paths.appSrc,
        use: [
          'react-hot-loader', // This enable react hot module loading for js modules
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true
            }
          }
        ],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      }
    ]
  },
  plugins: [
    // Makes the public URL available as %PUBLIC_URL% in index.html, e.g.: 
    // <link rel="shortcut icon" href="%PUBLIC_URL%/favicon.ico"> 
    new InterpolateHtmlPlugin({
      PUBLIC_URL: publicUrl
      // You can pass any key-value pairs, this was just an example. 
      // WHATEVER: 42 will replace %WHATEVER% with 42 in index.html. 
    }),
    // Generates an `index.html` file with the <script> injected. 
    new HtmlWebpackPlugin({
      inject: true,
      template: paths.appHtml,
    }),
    // Makes some environment variables available to the JS code, for example:
    // if (process.env.NODE_ENV === 'development') { ... }. See `./env.js`.
    new webpack.DefinePlugin(env),
    new webpack.HotModuleReplacementPlugin() 
  ],
  // Some libraries import Node modules but don't use them in the browser.
  // Tell Webpack to provide empty mocks for them so importing them works.
  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  }
}