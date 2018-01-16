Vue.component('comment', {
	template:
		'<div class="comment">' +
			'<div class="header">' +
				'<div v-if="!comment.user">' +
					'<span class="name">{{comment.name}}</span> wrote on {{comment.created}}:' +
				'</div>' +
				'<div v-else>' +
					'<span class="name">{{comment.user.username}}</span> wrote on {{comment.created}}:' +
				'</div>' +
			'</div>' +
			'<div class="body">' +
				'{{comment.body}}' +
			'</div>' +
			'<div>' +
				'<a href="#" v-on:click.prevent="reply()" v-if="!isLoginRequired || isLoggedIn">reply</a>' +
				'<span v-if="isMyComment">' +
					' &bull; ' +
					'<a href="#" v-on:click.prevent="editComment()">edit </a>' +
					' &bull; ' +
					'<a href="#" v-on:click.prevent="deleteComment()">delete</a>' +
				'</span>' +
			'</div>' +
			'<comment-form :model="model" :model-id="modelId" :comment="comment" v-if="formMode === \'edit\'" @closeForm="closeForm"></comment-form>' +
			'<comment-form :model="model" :model-id="modelId" :parent-id="comment.id" :reply-to="comment" v-if="formMode === \'reply\'" @closeForm="closeForm"></comment-form>' +
			'<comments-list :level="level" v-if="hasChildren" :model="model" :model-id="modelId" :parent-id="comment.id"></comments-list>' +
		'</div>',
	props: {
		comment: null,
		modelId: null,
		level: null,
		parentId: null,
		model: {
			type: String,
			default: null
		},
	},
	computed: {
		hasChildren: function() {
			return commentsStore.getters.hasChildren(
				this.model,
				this.modelId,
				this.comment.id,
			);
		},
		isLoggedIn: function() {
			return commentsStore.getters.isLoggedIn;
		},
		isMyComment: function () {
			return commentsStore.getters.isMyComment(this.comment);
		},
		isLoginRequired: function() {
			return commentsStore.getters.isLoginRequired
		}
	},
	methods: {
		closeForm: function () {
			this.formMode = false;
		},
		reply: function () {
			this.formMode = 'reply';
		},
		editComment: function () {
			this.formMode = 'edit';
		},
		deleteComment: function () {
			return commentsStore.commit('deleteComment', this.comment);
		}
	},
	data: function() {
		return {
			formMode: false
		};
	}
});
