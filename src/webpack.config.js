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
  ];
}
