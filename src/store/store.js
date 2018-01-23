import * as actions from './actions';
import * as getters from './getters';
import * as mutations from './mutations';
import * as state from './state';

/**
 * The comments store module for Vuex
 *
 * @link https://vuex.vuejs.org/en/modules.html
 */
const module = {
	strict: true,
	state: state,
	actions: actions,
	mutations: mutations,
	getters: getters
};

export default module;
