let webpack = require('webpack')
let path = require('path')

module.exports = {
	entry: {
		app: './src/index.js'
	},
	output:{
		filename: 'public/build/bundle.js',
		sourceMapFilename: 'public/build/bundle.map',
		publicPath:'/'
	},
	devtool: '#source-map',
	module: {
		loaders:[
		{
		test: /\.jsx?$/,
		exclude: /(node_modules)/,
		loader: 'babel-loader',
		query: {
			presets: ['react', 'es2015']
		}
		}
		]
	},
	devServer:{
		historyApiFallback:true
	}
}
