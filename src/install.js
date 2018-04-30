import components from './index';
import store from './store/store';
import Vuex from 'vuex';

export default function install(_Vue, options = {}) {
	let Vue = _Vue;

	for (var key in components) {
		if (components.hasOwnProperty(key)) {
			Vue.component(key, components[key]);
		}
	}

	let commentsStore = new Vuex.Store(store);
	commentsStore.commit('setConfig', options);

	Vue.prototype.$commentsStore = commentsStore;
}
