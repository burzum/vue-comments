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
		Vuex: 'Vuex',
		Vue: 'Vue',
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
						presets: ['env']
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
			},
			{
				test: /\.(html)$/,
				use: {
					loader: 'html-loader',
					options: {
						attrs: [':data-src']
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
