import Vue from 'vue';

export const setConfig = function(state, config) {
	Vue.set(state, 'config', Object.assign({}, state.config, config));
};

export const setLastCommentTime = function(state) {
	state.lastCommentTime = new Date();
};

export const setMaxDepth = function(state, depth) {
	if (typeof depth !== 'number') {
		throw 'Depth must be an integer';
	}

	state.maxDepth = depth;
};

export const setOrderBy = function(state, orderBy) {
	state.orderBy = orderBy;
};

export const orderByNewest = function(state) {
	state.orderBy = 'newest';
};

export const oderByOldest = function(state) {
	state.orderBy = 'oldest';
};

export const setUser = function(state, user) {
	Vue.set(state, 'user', user);
};

export const addComment = function(state, comment) {
	let comments = state.comments;

	comment.created = new Date(comment.created);
	comments.push(comment);

	Vue.set(state, 'comments', comments);
};

export const deleteComment = function(state, comment) {
	let comments = state.comments.filter(function(commentFromList) {
		return commentFromList.id !== comment.id;
	});
	Vue.set(state, 'comments', comments);
};

export const updateComment = function(state, editedComment) {
	state.comments.forEach(function(comment) {
		if (comment.id == editedComment.id) {
			let index = state.comments.indexOf(comment);
			state.comments[index] = editedComment;
		}
	});
};

export const updatePagination = function(state, data) {
	let key = data.model + data.modelId + data.parentId;
	let pagination = Object.assign({}, state.pagination);
	pagination[key] = data.pagination;

	Vue.set(state, 'pagination', pagination);
};

export const clearComments = function(state) {
	Vue.set(state, 'comments', []);
};
