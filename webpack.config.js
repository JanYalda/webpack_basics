var webpack = require('webpack');
var path = require('path');
var MiniCssExtractPlugin = require('mini-css-extract-plugin');
var glob = require('glob');
let PurifyCssPlugin = require('purgecss-webpack-plugin');

var inProduction = process.env.NODE_ENV === 'production';

module.exports = {
  entry: {
    app: [
      ".\\src\\index.js",
      ".\\src\\main.scss"
    ]
  },
  output: {
    path: path.resolve(__dirname, ".\\dist"),
    filename: '[name].js'
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
      },

      {
        test: /\.s[ac]ss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
      },

      {
        test: /\.(png|jpe?g|gif)$/i,
        loader: 'file-loader',
        options: {
          name: 'images/[name].[hash].[ext]'
        }
      }
    ]
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),

    new PurifyCssPlugin({
      paths: glob.sync(path.join(__dirname, 'index.html'))
      // laravel ex: resources/views/**/*.blade.php
    }),

    // currently not working as it allows minimizes the css
    new webpack.LoaderOptionsPlugin({
      minimize: inProduction
    })
  ],

  optimization: {
    minimize: false
  }

}

if (inProduction) {
  module.exports.optimization.minimize = true;
}
