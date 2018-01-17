import components from './main';
import store from './store/store';

export function install(Vue, options, components) {
		console.log('install is called');

		for (var key in components) {
			if (components.hasOwnProperty(key)) {
				Vue.component(key, component);
			}
		}

		if (Vue.$store === undefined) {
			throw 'Your app instance is missing a Vuex store!'
		};

		Vue.$store.registerModule('comments', store);
};
