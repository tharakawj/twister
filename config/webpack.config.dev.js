import webpack from 'webpack';
import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import InterpolateHtmlPlugin from 'react-dev-utils/InterpolateHtmlPlugin';

// Webpack uses `publicPath` to determine where the app is being served from.
// In development, we always serve from the root. This makes config easier.
const publicPath = '/';
// `publicUrl` is just like `publicPath`, but we will provide it to our app
// as %PUBLIC_URL% in `index.html` and `process.env.PUBLIC_URL` in JavaScript.
// Omit trailing slash as %PUBLIC_PATH%/xyz looks better than %PUBLIC_PATH%xyz.
const publicUrl = '';

module.exports = {
  entry: [
    path.resolve('./config/polyfills'),
    'webpack-hot-middleware/client?reload=true', //note that it reloads the page if hot module reloading fails.
    path.resolve('./client/index')
  ],
  output: {
    path: path.resolve('./build'),
    // Add /* filename */ comments to generated require()s in the output.
    pathinfo: true,
    publicPath: publicPath,
    filename: 'bundle.js'
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
            limit: 10000
          }
        }]
      },
      {
        test: /\.(js|jsx)$/,
        include: path.resolve("./client"),
        use: [
          'react-hot-loader', // This enable react hot module loading for js modules
          {
            loader: 'babel-loader',
            options: { 
              presets: [
                'react',
                ['es2015']
              ],
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
      template: path.resolve('./public/index.html'),
    }),
    new webpack.HotModuleReplacementPlugin() 
  ]
}