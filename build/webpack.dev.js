import webpack from 'webpack';
import Config from 'webpack-config';

export default new Config().extend({
	'build/webpack.dist.js': config => {
		return config;
	}
}).merge({
	watch: true
});
