const path = require('path');
const webpack = require('webpack');

let plugins = [
  new webpack.DllPlugin({
    name: "[name]",
    path: path.join(__dirname, "dist", "[name]-manifest.json")
  })
];

if (process.env.NODE_ENV === 'production') {
  plugins = plugins.concat([
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      comments: false
    })
  ])
}

module.exports = {

  entry: {
  	vendor: [
			path.join(__dirname, 'src', 'client', 'vendors.js')
		]
  },

  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, './dist'),
   	library: "[name]"
  },

  resolve: {
  	extensions: ['.js']
  },

  module: {
    rules: [{
    	test: /\.js$/,
     	exclude: /node_modules/,
     	use: 'babel-loader'
		}]
  },

  plugins

};
