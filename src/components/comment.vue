<template>
	<div class="comment">
		<div class="header">
			<div v-if="comment.user === null">
				<span class="name">{{comment.name}}</span>
				wrote on
				<span class="time">{{comment.created.toLocaleString()}}</span>:
			</div>
			<div v-if="comment.user.id">
				<span class="name">{{comment.user.id}}</span>
				wrote on
				<span class="time">{{comment.created.toLocaleString()}}</span>:
			</div>
		</div>
		<div class="body">
			<div :key="index" v-for="(line, index) in comment.body.split('\n')">{{line}}<br /></div>
		</div>
		<div class="footer">
			<a href="#" class="reply-btn" v-on:click.prevent="reply()" v-if="!isLoginRequired || isLoggedIn">
				reply
			</a>
			<span v-if="isMyComment">
				&nbsp;&bull;&nbsp;
				<a href="#" class="edit-btn" v-on:click.prevent="editComment()">
					edit
				</a>
				&nbsp;&bull;&nbsp;
				<a href="#" class="delete-btn" v-on:click.prevent="deleteComment()">
					delete
				</a>
			</span>
		</div>
		<comment-form key="`replyForm`" :model="model" :model-id="modelId" :comment="comment" v-if="showEditForm && canComment" @closeForm="closeForm"></comment-form>
		<comment-form key="`editForm`" :model="model" :model-id="modelId" :parent-id="replyToId" :reply-to="comment" v-if="showReplyForm && canComment" @closeForm="closeForm"></comment-form>
		<comments-list :level="level + 1" v-if="hasChildren" :model="model" :model-id="modelId" :parent-id="comment.id"></comments-list>
	</div>
</template>

<script>
import CommentsList from './comments-list.vue';
import CommentForm from './comment-form.vue';

export default {
	name: 'Comment',

	components: {
		CommentsList,
		CommentForm
	},

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
		replyToId: function() {
			let maxDepth = this.$commentsStore.getters.getConfig('maxDepth');

			if (maxDepth === 0 || typeof maxDepth !== 'number') {
				this.comment.id;
			}

			if (this.level === maxDepth && this.comment.parent_id !== null) {
				return this.comment.parent_id;
			}

			return this.comment.id;
		},
		hasChildren: function() {
			return this.$commentsStore.getters.hasChildren(
				this.model,
				this.modelId,
				this.comment.id,
			);
		},
		canComment: function() {
			return this.$commentsStore.getters.canComment;
		},
		isLoggedIn: function() {
			return this.$commentsStore.getters.isLoggedIn;
		},
		isMyComment: function () {
			return this.$commentsStore.getters.isMyComment(this.comment);
		},
		isLoginRequired: function() {
			return this.$commentsStore.getters.getConfig('loginRequired');
		}
	},
	methods: {
		closeForm: function () {
			this.showReplyForm = false;
			this.showEditForm = false;
		},
		reply: function () {
			this.showReplyForm = true;
			this.showEditForm = false;
		},
		editComment: function () {
			this.showEditForm = true;
			this.showReplyForm = false;
		},
		deleteComment: function () {
			return this.$commentsStore.dispatch('deleteComment', this.comment);
		}
	},
	data: function() {
		return {
			showReplyForm: false,
			showEditForm: false
		};
	}
};
</script>
