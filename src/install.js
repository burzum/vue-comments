import components from './main';
import store from './store/store';

const VueComments = {
	install: function (Vue, options) {
		for (var key in components) {
			if (components.hasOwnProperty(key)) {
				Vue.component(key, component);
			}
		}

		if (Vue.$store === undefined) {
			throw 'Your app instance is missing a Vuex store!'
		};

		Vue.$store.registerModule('comments', store);
	}
};

export default VueComments;
