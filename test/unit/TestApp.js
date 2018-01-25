import Vue from 'vue';
import Vuex from 'vuex';
import VeeValidate from 'vee-validate';
import VueComments from '../../dist/vue-comments';

Vue.use(VeeValidate);
Vue.use(VueComments);

const store = new Vuex.Store();

export default testApp = new Vue({
	el: '#vue-app',
	store,
	data: {}
});
