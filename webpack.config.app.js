const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')

let plugins = [
  new ExtractTextPlugin({
    filename: 'bundle.css'
  }),
  new webpack.DllReferencePlugin({
    context: __dirname,
    manifest: require("./dist/vendor-manifest.json")
  }),
  new OptimizeCssAssetsPlugin({
    assetNameRegExp: /\.css$/g,
    cssProcessor: require('cssnano'),
    cssProcessorOptions: { discardComments: {removeAll: true } },
    canPrint: true
  })
]

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
    app: [
			'babel-polyfill',
			'./src/client/index.js'
		]
  },

  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, './dist')
  },

  resolve: {
    extensions: ['.js', '.css']
  },

  module: {
    rules: [
      {
         test: /\.js$/,
         exclude: /node_modules/,
         use: 'babel-loader'
      },
      {
         test: /\.css$/,
         exclude: /node_modules/,
         use: ExtractTextPlugin.extract({
          use: [{
          	loader: 'css-loader',
           	query: {
           		localIdentName: '[hash:10]',
             	modules: true
          	}
         	}]
         })
       }
     ]
  },

  plugins

};
