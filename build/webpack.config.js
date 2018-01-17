const path = require('path');
const webpack = require("webpack");

module.exports = {
	entry: {
		'vue-comments': './src/main.js',
		'vue-comments.min': './src/main.js'
	},
	output: {
		filename: "[name].js",
		path: path.resolve(__dirname, '../dist')
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /(node_modules|bower_components)/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env']
					}
				}
			},
			{
				test: /\.vue$/,
				loader: 'vue-loader',
				options: {
					loaders: {
						js: 'babel-loader'
					}
				}
			}
		]
	},
	devtool: "source-map",
	plugins: [
		new webpack.optimize.UglifyJsPlugin({
			include: /\.min\.js$/,
			minimize: true
		})
	]
};
