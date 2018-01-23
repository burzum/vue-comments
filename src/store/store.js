import * as actions from './actions';
import * as getters from './getters';
import * as mutations from './mutations';

/**
 * The comments store module for Vuex
 *
 * @link https://vuex.vuejs.org/en/modules.html
 */
const module = {
	strict: true,
	state: {
		lastCommentTime: null,
		orderBy: 'oldest',
		comments: [],
		pagination: {},
		user: null,
		config: {
			threshold: 60,
			maxDepth: 1,
			loginRequired: false,
			allowEditing: true,
			allowDeleting: true
		}
	},
	actions: actions,
	mutations: mutations,
	getters: getters
};

export default module;
