var webpack = require('webpack');
var path = require('path');
var MiniCssExtractPlugin = require('mini-css-extract-plugin');
var glob = require('glob');
let PurifyCssPlugin = require('purgecss-webpack-plugin');
let CustomPlugin = require('./build/plugins/CustomPlugin');

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
        use: ['style-loader', MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
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
      // laravel ex: resources/views/**/*.blade.php
      paths: glob.sync(path.join(__dirname, 'index.html')),
      minimize: inProduction
    }),

    // currently not working as it allows minimizes the css
    new webpack.LoaderOptionsPlugin({
      minimize: inProduction
    }),

    new CustomPlugin({}),
    function(){
      //could be a custom plugin ex: handle the hashed file name changes to a
      // manifest file to reference the app name and include it in the index.html
    }
  ],

  optimization: {
    minimize: false
  }

}

if (inProduction) {
  module.exports.optimization.minimize = true;
}
