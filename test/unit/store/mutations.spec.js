import initialState from '@/store/state';
import * as mutations from '@/store/mutations';

describe('setters', () => {
	let state;

	beforeEach(() => {
		state = initialState;
	});

	it('set pagination', () => {
		let result = mutations.updatePagination(state, {
			model: 'Posts',
			modelId: 1,
			parentId: null,
			pagination: {
				page: 3,
				nextPage: true,
				prevPage: true,
				pageCount: 5
			}
		});
		let expected = {
			page: 3,
			nextPage: true,
			prevPage: true,
			pageCount: 5
		};

		expect(state.pagination.Posts1null).toEqual(expected);
	});

});
