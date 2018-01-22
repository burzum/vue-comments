import { mount, shallow } from '@vue/test-utils'
import Comment from '../../../src/components/comment.vue';
import axios from 'axios';
import Vue from 'vue';
import Vuex from 'vuex';
import VeeValidate from 'vee-validate';
import commentsStore from '../../../src/store/store';

describe('commen.vue', () => {
	let cmp;

	beforeEach(() => {
		Vue.use(VeeValidate);

		//cmp = shallow(Comment, {});
		//cmp.$commentsStore = commentsStore;
	});

	it('equals messages to ["Cat"]', () => {
		//console.log(cmp);
	});
});
