const path = require('path');
const webpack = require("webpack");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
	watch: true,
	watchOptions: {
		ignored: /node_modules/
	},
	entry: {
		'vue-comments': './src/install.js',
		'vue-comments.min': './src/install.js'
	},
	output: {
		filename: "[name].js",
		path: path.resolve(__dirname, '../dist'),
		library: 'VueComments',
		libraryTarget: 'umd'
	},
	externals: {
		vuex: 'vuex',
		vue: 'vue',
		axios: 'axios',
		VeeValidate: 'VeeValidate'
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
		new UglifyJsPlugin({
			include: /\.min\.js$/,
			uglifyOptions: {
				ecma: 6,
				output: {
					comments: false,
					beautify: false
				},
			}
		})
	]
};
