import axios from 'axios';

export default class CommentsApi {

	constructor(baseUrl = '/comments/') {
		this.axios = axios.create({
			baseURL: baseUrl
		});

		this.axios.defaults.headers.common['Accept'] = 'application/json';
	}

	getComments(model, id, parentId = null, params = {}) {
		let url = model + '/' + id;

		if (parentId !== null) {
			url = url + '/' + parentId;
		}

		return this.axios.get(url, {
			params: params
		});
	}

	getCommentsBefore(model, id, parentId = null, time, params = {}) {
		params.before = time;
		return this.getComments(model, id, parentId, params);
	}

	getCommentsAfter(model, id, parentId = null, time, params = {}) {
		params.after = time;
		return this.getComments(model, id, parentId, params);
	}

	add(model, id, data) {
		return this.axios.post(model + '/' + id, data);
	}

	remove(model, id, commentId) {
		return this.axios.delete(model + '/' + id + '/' + commentId);
	}

	update(model, id, commentId, data) {
		this.axios.patch(model + '/' + id + '/' + commentId, data)
	}
}
