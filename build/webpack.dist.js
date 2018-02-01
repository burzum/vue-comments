const path = require('path');
const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
	watch: false,
	watchOptions: {
		ignored: /node_modules/
	},
	entry: {
		'vue-comments': './src/install.js',
		'vue-comments.min': './src/install.js'
	},
	output: {
		filename: '[name].js',
		path: path.resolve(__dirname, '../dist'),
		library: 'VueComments',
	},
	externals: {
		vuex: 'Vuex',
		vue: 'Vue',
		axios: 'axios',
		VeeValidate: 'VeeValidate'
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				include: /(src)/,
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
						js: 'babel-loader',
						options: {
							presets: ['env']
						}
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
	devtool: 'source-map',
	plugins: [
		new UglifyJsPlugin({
			include: /\.min\.js$/,
			uglifyOptions: {
				compress: true,
				mangle: true,
				ecma: 6,
				output: {
					comments: false,
					beautify: false,
				},
			}
		})
	]
};
