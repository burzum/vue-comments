<template>
	<form class="form comment-form" v-on:submit.prevent="validateBeforeSubmit()" v-if="!isLoginRequired || isLoggedIn" >
		<div class="row" v-if="!isLoggedIn">
			<div class="form-group col-md-4" :class="{'input': true, 'has-error': errors.has('name') }">
				<label>Name</label>
				<input v-validate.disabled="'required'" name="name" type="text" v-model="newComment.name" class="form-control" data-vv-validate-on="none"/>
				<div v-show="errors.has('name')" class="has-error">{{ errors.first('name') }}</div>
			</div>
			<div class="form-group col-md-4" :class="{'input': true, 'has-error': errors.has('email') }">
				<label>Email</label>
				<input v-validate.disabled="'email'" name="email" type="text" v-model="newComment.email" class="form-control" data-vv-validate-on="none"/>
				<div v-show="errors.has('email')" class="has-error">{{ errors.first('email') }}</div>
			</div>
			<div class="form-group col-md-4" :class="{'input': true, 'has-error': errors.has('website') }">
				<label>Website</label>
				<input v-validate.disabled="'url'" name="website" type="text" v-model="newComment.website" class="form-control" data-vv-validate-on="none"/>
				<div v-show="errors.has('website')" class="has-error">{{ errors.first('website') }}</div>
			</div>
		</div>
		<div class="form-group" :class="{'input': true, 'has-error': errors.has('body') }">
			<textarea v-validate.disabled="'required'" v-model="newComment.body" class="form-control" name="body" data-vv-validate-on="none"></textarea>
			<div v-show="errors.has('body')" class="has-error">{{ errors.first('body') }}</div>
		</div>
		<div v-if="error" class="alert alert-danger fade in">
			<p>{{error}}</p>
		</div>
		<input type="submit" value="submit" class="btn btn-primary" />
		&nbsp;
		<input type="submit" value="cancel" v-on:click.prevent="cancel(); errors.clear();" class="btn btn-default" />
	</form>
</template>

<script>
export default {
	name: 'CommentForm',

	props: {
		modelId: null,
		parentId: null,
		model: {
			type: String,
			default: null
		},
		replyTo: {
			default: null
		},
		comment: {
			default: null
		}
	},

	created: function () {
		if (this.comment !== null) {
			this.clearAndReset(false);
			this.newComment = this.comment;
		}
	},

	data: function () {
		return {
			newComment: this.createNewComment(),
			error: null
		};
	},

	computed: {
		isLoggedIn: function() {
			return this.$commentsStore.getters.isLoggedIn;
		},
		isLoginRequired: function() {
			return this.$commentsStore.getters.getConfig('loginRequired');
		}
	},

	methods: {
		createNewComment() {
			return {
				body: '',
				name: '',
				model: this.model,
				foreign_key: this.modelId,
				parent_id: this.parentId === undefined ? null : this.parentId,
			}
		},
		validateBeforeSubmit() {
			this.$validator.validateAll().then((result) => {
				if (result) {
					this.submit();
				}
			});
		},
		clearAndReset: function(closeForm = true) {
			this.newComment = this.createNewComment();
			this.error = null;
			this.errors.clear();
			this.$validator.reset();
			if (closeForm) {
				this.$emit('closeForm');
			}
		},
		submit: function () {
			if (this.errors.any()) {
				return;
			}

			if (this.parentId !== null) {
				this.newComment.parent_id = this.parentId;
			}

			if (this.comment !== null) {
				this.$commentsStore.dispatch('updateComment', this.newComment).then(() => {
					this.clearAndReset();
				}).catch(() => {
					this.error = 'There was a problem saving your comment. Please try again.';
				});
				return;
			}

			// Checks the threshold before being able to post a new comment to  prevent spam or accidental re-submission
			let canCommentAgain = this.$commentsStore.getters.canCommentAgain();
			if (canCommentAgain !== true) {
				this.error = 'You must wait ' + canCommentAgain.toPrecision(1) + ' more seconds before you can comment again';
				return;
			}

			this.$commentsStore.dispatch('addComment', this.newComment)
				.then(() => {
					this.clearAndReset();
				}).catch(() => {
					this.error = 'There was a problem saving your comment. Please try again.';
				});
		},
		cancel: function () {
			this.clearAndReset();
		}
	}
};
</script>
