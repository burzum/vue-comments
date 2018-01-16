setLastCommentTime(state) {
	state.lastCommentTime = new Date();
},
setMaxDepth(state, depth) {
	if (typeof depth !=='number') {
		throw 'Depth must be an integer';
	}

	state.maxDepth = depth;
},
setOrderBy(state, orderBy) {
	state.orderBy = orderBy;
},
orderByNewest(state) {
	state.orderBy = 'newest';
},
oderByOldest(state) {
	state.orderBy = 'oldest';
},
setUser(user) {
	state.user = user;
},
addComment: function(state, comment) {
	comment.created = new Date(comment.created);

	state.comments.push(comment);

	if (comment.comments !== undefined && comment.comments.length > 0) {
		for (var i in comment.comments) {
			comment.comments[i].created = new Date(comment.comments[i].created);
			state.comments.push(comment.comments[i]);
		}
	};
},
deleteComment: function(state, comment) {
	state.comments = state.comments.filter(function(commentFromList) {
		return commentFromList.id !== comment.id;
	});
},
updateComment: function(state, editedComment) {
	state.comments.forEach(function(comment) {
		if (comment.id == editedComment.id) {
			let index = state.comments.indexOf(comment);
			state.comments[index] = editedComment;
		};
	});
},
updatePagination: function(state, data) {
	let key = data.model + data.modelId + data.parentId;

	Vue.set(state.pagination, key, data.pagination);
},
clearComments: function(state, data) {
	let comments = state.comments;

	comments.forEach((comment, index) => {
		if (comment.model == data.model
			&& comment.foreign_key == data.modelId
			&& comment.parent_id == data.parentId
		) {
			comments.splice(index, 1);
		}
	});

	Vue.set(state, 'comments', comments);
}
