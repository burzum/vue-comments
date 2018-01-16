loadComments: function(context, data) {
	api = new CommentsApi();
	return api.getComments(
		data.model,
		data.modelId,
		data.parentId,
		typeof data.params === 'object' ? data.params : {}
	).then(function(result) {
		result.data.comments.forEach((comment) => {
			context.commit('addComment', comment)
			// Handle child comments if there are any
			comment.comments.forEach((comment) => {
				context.commit('addComment', comment)
			});

			context.commit('updatePagination', {
				model: data.model,
				modelId: data.modelId,
				parentId: data.parentId,
				pagination: result.data.pagination
			});
		});
	});
},
deleteComment: function(context, data) {
	api = new CommentsApi();
	return api.add(
		data.model,
		data.foreign_key,
		data
	).then(function(result) {
		context.commit('addComment', result.data.comment);
	});
},
updateComment: function(context, data) {
	api = new CommentsApi();
	return api.update(
		data.model,
		data.foreign_key,
		data
	).then(function(result) {
		context.commit('addComment', result.data.comment);
	});
},
addComment: function(context, data) {
	api = new CommentsApi();
	return api.add(
		data.model,
		data.foreign_key,
		data
	).then(function(result) {
		context.commit('addComment', result.data.comment);
		context.commit('setLastCommentTime');
	});
}
