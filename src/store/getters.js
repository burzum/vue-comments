export const getUser = function(state) {
	return state.user;
};

export const isLoggedIn = function(state) {
	return state.user !== undefined && state.user !== null;
};

/**
 * Checks for the threshold if the user can post again or still has to wait
 *
 * @return boolean
 */
export const canCommentAgain = function(state) {
	return function() {
		if (state.lastCommentTime === null || typeof state.config.threshold !== 'number') {
			return true;
		}

		let currentDate = new Date();
		let pastDate = new Date(state.lastCommentTime);

		pastDate.setSeconds(pastDate.getSeconds() + state.config.threshold);

		if (pastDate < currentDate) {
			return true;
		}

		return (pastDate.getTime() - currentDate.getTime()) / 1000;
	};
}

export const canComment = function(state) {
	if (state.config.loginRequired) {
		return isLoggedIn(state);
	}
	return true;
};

export const getConfig = function(state) {
	return function(key = null) {
		if (key === null) {
			return state.config;
		}

		if (typeof key !== 'string') {
			throw 'Config key must be a string';
		}

		return state.config[key];
	}
};

export const isMyComment = function (state) {
	return function(comment) {
		if (typeof state.user === 'object' && state.user !== null) {
			return state.user.id == comment.user_id;
		}

		return false;
	}
};

export const getOrderBy = function(state) {
	return state.orderBy;
};

export const getComments = function(state) {
	return state.comments;
};

export const hasChildren = function(state) {
	return function(model, modelId, parentId = null) {
		let result = state.comments.filter(function(comment) {
			// Has to be weak typed, fucking dynamic types
			return comment.model == model
				&& comment.foreign_key == modelId
				&& comment.parent_id == parentId;
		});

		return result.length > 0;
	};
};

export const getParentComment = function(state) {
	return function(comment) {
		let commentId;

		if (typeof comment === 'number' || typeof comment === 'string') {
			commentId =  comment;
		} else if(typeof comment === 'object' && comment.id !== undefined) {
			commentId = comment.id;
		} else {
			throw 'Invalid argument passed to getParentComment()';
		}

		let comments = state.comments.filter(function(parentComment) {
			// Has to be weak typed, fucking dynamic types
			return parentComment.id == commentId;
		});

		if (comments.length > 0) {
			return comments[0];
		}

		return null;
	};
}

export const hasMore = function(state) {
	return function(model, modelId, parentId = null) {
		let key = model + modelId + parentId;
		let pagination = Object.assign({}, state.pagination);

		if (pagination[key] !== undefined) {
			return pagination[key].nextPage;
		}

		return false;
	}
};

export const getCommentsForModel = function(state) {
	return function(model, modelId, parentId = null) {
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
};

export const getPagination = function(state) {
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
