const state = {
	lastCommentTime: null,
	orderBy: 'oldest',
	comments: [],
	pagination: {},
	user: null,
	config: {
		// Time the user needs to wait in seconds before he can post another comment
		threshold: 60,
		// max depth of the comment tree structure
		maxDepth: 1,
		// Only logged in users are allowed to post or not
		loginRequired: false,
		// Allow editing of comments
		allowEditing: true,
		// Allow deleting of comments
		allowDeleting: true
	}
}

export default state;
