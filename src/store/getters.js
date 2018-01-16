getUser: function(state) {
	return state.user;
},
isLoginRequired: function(state) {
	return state.loginRequired;
},
isLoggedIn: function(state) {
	return state.user !== undefined && state.user !== null;
},
isMyComment: function (state) {
	return function(comment) {
		if (typeof state.user === 'object' && state.user !== null) {
			return state.user.id == comment.user_id;
		}

		return false;
	}
},
getOrderBy: function(state) {
	return state.orderBy;
},
getComments: function(state) {
	return state.comments;
},
hasChildren: function(state) {
	return function(model, modelId, parentId = null) {
		let result = state.comments.filter(function(comment) {
			// Has to be weak typed, fucking dynamic types
			return comment.model == model
				&& comment.foreign_key == modelId
				&& comment.parent_id == parentId;
		});

		return result.length > 0;
	}
},
hasMore: function(state) {
	return function(model, modelId, parentId = null) {
		let key = model + modelId + parentId;
		let pagination = Object.assign({}, state.pagination);

		if (pagination[key] !== undefined) {
			return pagination[key].nextPage;
		}

		return false;
	}
},
getCommentsForModel: function(state) {
	return function(model, modelId, parentId) {
		let comments = state.comments.filter(function(comment) {
			// Has to be weak typed, fucking dynamic types
			return comment.model == model
				&& comment.foreign_key == modelId
				&& comment.parent_id == parentId;
		});

		comments.sort((a, b) => {
			switch (state.orderBy) {
				case 'newest':
					return a.created < b.created;
				case 'oldest':
					return a.created > b.created;
				default:
					return a.created < b.created;
			}
		});

		return comments;
	}
},
getPagination: function(state) {
	return function (model, modelId, parentId = null) {
		let key = model + modelId + parentId;

		if (state.pagination[key] !== undefined) {
			return state.pagination[key];
		}

		return {
			page: 1,
			nextPage: false,
			prevPage: false,
			pageCount: 1
		}
	}
}
