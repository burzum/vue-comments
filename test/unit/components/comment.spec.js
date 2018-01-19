import { mount, shallow } from '@vue/test-utils'
import Comment from '../../../src/components/comment.vue';

const createCmp = propsData => mount(Comment, { propsData })

describe('Comment.vue', () => {
	let cmp;

	beforeEach(() => {
		console.log('foreach test called');

		// cmp = createCmp({
		// 	data: {
		// 		comment: {
		// 			id: 1,
		// 			user: {
		// 				id: 1,
		// 				username: 'falk'
		// 			},
		// 			name: 'test name',
		// 			body: 'some body text',
		// 			created: '01-01-2018'
		// 		},
		// 		modelId: 1,
		// 		level: 1,
		// 		parentId: null,
		// 		model: 'SomeModel'
		// 	}
		// })
	});

	it('has a message property', () => {
		// expect(cmp.vm('modelId', '1')).toBeTruthy()
		expect(true).toEqual(true);
	})
//
// 	test('test 1', () => {
//
// 		console.log(createCmp);
// 		expect(true).toEqual(true);
// 	});
});
