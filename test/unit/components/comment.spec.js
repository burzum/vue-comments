import { mount, shallow } from '@vue/test-utils'
import commentsStore from '@/store/store';
import Comment from '@/components/comment.vue';
import Vue from 'vue';
import Vuex from 'vuex';
import VeeValidate from 'vee-validate';
import state from '@/store/state';
import comments from '../../fixtures/comments';

describe('Comment Component', () => {

	let $commentsStore;

	Vue.use(Vuex);
	Vue.use(VeeValidate);

	beforeEach(() => {
		$commentsStore = commentsStore;
		$commentsStore.getters.getConfig = jest.fn();
	});

	it('equals messages to ["Cat"]', () => {
		const wrapper = shallow(Comment, {
			propsData: {
				comment: comments[0],
				modelId: 1,
				model: 'Posts'
			},
			mocks: {
				$commentsStore
			}
		});

		expect(wrapper.vm._data.formMode).toEqual(false);

		wrapper.find('.edit-btn').trigger('click');
		expect(wrapper.vm._data.formMode).toEqual('edit');

		wrapper.find('.reply-btn').trigger('click');
		expect(wrapper.vm._data.formMode).toEqual('reply');

		wrapper.vm.closeForm()
		expect(wrapper.vm._data.formMode).toEqual(false);
	});

});
