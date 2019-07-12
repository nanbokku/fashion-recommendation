const path = require('path');

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
      }
    ]
  }
};
