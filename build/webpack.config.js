const path = require('path');
const webpack = require("webpack");

module.exports = {
	entry: {
		'vue-comments': './src/app.js',
		'vue-comments.min': './src/app.js'
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
