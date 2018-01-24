import initialState from '@/store/state';
import * as getters from '@/store/getters';

describe('getters', () => {
	let state;

	beforeEach(() => {
		state = initialState;
	});

	it('assert default pagination', () => {
		let result = getters.getPagination(state)('Posts', 1, null);
		let expected = {
			page: 1,
			nextPage: false,
			prevPage: false,
			pageCount: 1
		};

		expect(result).toEqual(expected);
	});

	it('assert pagination values', () => {
		state.pagination.Posts1null = {
			page: 2,
			nextPage: true,
			prevPage: false,
			pageCount: 5
		};

		let result = getters.getPagination(state)('Posts', 1, null);
		let expected = {
			page: 2,
			nextPage: true,
			prevPage: false,
			pageCount: 5
		};

		expect(result).toEqual(expected);
	});
});
