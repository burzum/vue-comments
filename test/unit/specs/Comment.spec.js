import Module from '../../../src/components/comment';

describe('Module', () => {
	it('get state', () => {
		const module = new Module({
			state: {
				value: true
			}
		});

		expect(module.state).toEqual({value: true})
	});
});
