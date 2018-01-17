import components from './main';

const VueComments = {
	install: function (Vue, options) {
		for (var key in components) {
			if (components.hasOwnProperty(key)) {
				Vue.component(key, component);
			}
		}
	}
};

export default VueComments;
