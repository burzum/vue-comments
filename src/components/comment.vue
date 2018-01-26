<template>
	<div class="comment">
		<div class="header">
			<div v-if="!comment.user">
				<span class="name">{{comment.name}}</span>
				wrote on
				<span class="time">{{comment.created}}</span>:
			</div>
			<div v-else>
				<span class="name">{{comment.user.username}}</span> wrote on {{comment.created}}:
			</div>
		</div>
		<div class="body">
			<template v-for="line in comment.body.split('\n')">{{line}}<br></template>
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
		<comment-form key="`editForm`" :model="model" :model-id="modelId" :parent-id="comment.id" :reply-to="comment" v-if="showReplyForm && canComment" @closeForm="closeForm"></comment-form>
		<comments-list :level="level + 1" v-if="hasChildren" :model="model" :model-id="modelId" :parent-id="comment.id"></comments-list>
	</div>
</template>

<script>
export default {
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
