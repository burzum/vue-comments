import Vue from 'vue';
import Vuex from 'vuex';
import VueI18n from 'vue-i18n';
import VeeValidate from 'vee-validate';
import VueComments from '../../src/install';

Vue.use(VueI18n);
Vue.use(VeeValidate);
Vue.use(VueComments);

i18next
	//.use(window.i18nextXHRBackend)
	.init({
		lng: 'en',
		fallbackLng: 'en',
		ns: ['wa'],
		defaultNs: 'wa',
		backend: {
			loadPath: '/locales/{{lng}}/{{ns}}.json'
		},
		debug: false,
	}, function(error, t) {
		//console.log(error);
	});

const store = new Vuex.Store();

export default testApp = new Vue({
	el: '#vue-app',
	store,
	data: {}
});
