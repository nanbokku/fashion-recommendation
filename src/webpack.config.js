const path = require('path');
const webpack = require('webpack');

module.exports = {
  mode: 'production',
  entry: ['@babel/polyfill', './js/index.js'],
  output: {
    path: path.join(__dirname, '../docs/js'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.m?js?/,
        exclude: /(node_modules|bower_component)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    })
  ],
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },
  devServer: {
    historyApiFallback: true
  }
};
