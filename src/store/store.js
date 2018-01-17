import * as actions from './actions';
import * as getters from './getters';
import * as mutations from './mutations';

/**
 * The comments store module for Vuex
 *
 * @link https://vuex.vuejs.org/en/modules.html
 */
const module = new{
	strict: true,
	state: {
		loginRequired: true,
		lastCommentTime: null,
		threshold: 60,
		maxDepth: 1,
		orderBy: 'oldest',
		comments: [],
		pagination: {},
		user: null,
	},
	actions: actions,
	mutations: mutations,
	getters: getters
};

export default module;
