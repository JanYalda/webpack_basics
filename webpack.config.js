var webpack = require('webpack');
var path = require('path');

module.exports = {
  mode: 'development',
  entry: ".\\src\\index.js",
  output: {
    path: path.resolve(__dirname, ".\\dist"),
    filename: 'main.js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        // pipe works right to left.
        use: ['style-loader', 'css-loader']
      },

      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      }
    ]
  }

}
