import * as actions from '/actions';
import * as getters from '/getters';
import * as mutations from '/mutations';
import Vuex from 'vuex';

export const store = new Vuex.Store({
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
});
