import { mount, shallow } from '@vue/test-utils'
import commentsStore from '@/store/store';
import CommentsList from '@/components/comments-list.vue';
import Vue from 'vue';
import Vuex from 'vuex';
import VeeValidate from 'vee-validate';
import state from '@/store/state';
import comments from '../../fixtures/comments';

describe('Comments List ', () => {

	let $commentsStore;

	Vue.use(Vuex);
	Vue.use(VeeValidate);

	beforeEach(() => {
		$commentsStore = new Vuex.Store(commentsStore);
	});

	it('equals messages to ["Cat"]', () => {
		const wrapper = shallow(CommentsList, {
			propsData: {
				modelId: 1,
				model: 'Posts'
			},
			mocks: {
				$commentsStore
			}
		});

	});

});
