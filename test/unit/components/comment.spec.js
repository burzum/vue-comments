import { mount, shallow } from '@vue/test-utils'
import Comment from '../../../src/components/comment.vue';
import Vue from 'vue';
import VeeValidate from 'vee-validate';
import VueComments from '../../../dist/vue-comments.min';

describe('commen.vue', () => {
	let cmp;

	beforeEach(() => {
		Vue.use(VeeValidate);
		Vue.use(VueComments);
		cmp = shallow(Comment, {});
	});

	it('equals messages to ["Cat"]', () => {
		console.log(cmp);
	});
});
