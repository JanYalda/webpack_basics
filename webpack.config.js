var webpack = require('webpack');
var path = require('path');

module.export = {
  mode: 'development',
  entry: ".\\src\\index.js",
  output: {
    path: path.resolve(__dirname, ".\\dist"),
    filename: 'main.js'
  }
}
