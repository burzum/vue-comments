export default [
	{
		id: 1,
		name: 'anonymous',
		email: 'anonymous@email.com',
		body: 'comment text',
		created: '2018-01-01 12:00:00',
		parent_id: null,
		model: 'Posts',
		foreign_key: 1,
		user_id: 1,
		user: {
			id: 1,
			username: 'foobar'
		}
	},
	{
		id: 2,
		name: 'anonymous',
		email: 'anonymous@email.com',
		body: 'comment text',
		created: '2018-01-01 12:00:00',
		parent_id: null,
		model: 'Posts',
		foreign_key: 1,
		user_id: 1,
		user: {
			id: 1,
			username: 'foobar'
		}
	},
	{
		id: 3,
		name: 'anonymous',
		email: 'anonymous@email.com',
		body: 'comment text',
		created: '2018-01-01 12:00:00',
		parent_id: 1,
		model: 'Posts',
		foreign_key: 1,
		user_id: 1,
		user: {
			id: 1,
			username: 'foobar'
		}
	},
	{
		id: 4,
		name: 'anonymous',
		email: 'anonymous@email.com',
		body: 'comment text',
		created: '2018-01-01 12:00:00',
		parent_id: 3,
		model: 'Posts',
		foreign_key: 1,
		user_id: 1,
		user: {
			id: 1,
			username: 'foobar'
		}
	},
	{
		id: 5,
		name: 'anonymous',
		email: 'anonymous@email.com',
		body: 'comment text',
		created: '2018-01-01 12:00:00',
		parent_id: 3,
		model: 'Posts',
		foreign_key: 1,
		user_id: 1,
		user: {
			id: 1,
			username: 'foobar'
		}
	}
]
