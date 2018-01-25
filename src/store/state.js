const state = {
	lastCommentTime: null,
	orderBy: 'oldest',
	comments: [],
	pagination: {},
	user: null,
	config: {
		threshold: 60,
		maxDepth: 1,
		loginRequired: false,
		allowEditing: true,
		allowDeleting: true
	}
}

export default state;
