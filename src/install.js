import components from './main';
import store from './store/store';
import Vuex from 'Vuex';

export function install(Vue, options) {
		for (var key in components) {
			if (components.hasOwnProperty(key)) {
				console.log(key);
				Vue.component(key, components[key]);
			}
		}

		Vue.prototype.$commentsStore = new Vuex.Store(store);
};
