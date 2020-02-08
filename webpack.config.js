var webpack = require('webpack');
var path = require('path');
var inProduction = process.env.NODE_ENV === 'production';

module.exports = {
  entry: ".\\src\\index.js",
  output: {
    path: path.resolve(__dirname, ".\\dist"),
    filename: 'main.js'
  },
  module: {
    rules: [{
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
  },

  optimization: {
    minimize: false
  }

}

if (inProduction) {
  module.exports.optimization.minimize = true;
}
