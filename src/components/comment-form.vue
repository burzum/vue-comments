<template>
	<form class="form comment-form" v-on:submit.prevent="validateBeforeSubmit()" >
		<div v-if="!isLoggedIn" class="form-group" :class="{'input': true, 'has-error': errors.has('name') }">
			<label>Name</label>
			<input v-validate.disabled="'required'" name="name" type="text" v-model="comment2.name" class="form-control"/>
			<div v-show="errors.has('name')" class="has-error">{{ errors.first('name') }}</div>
		</div>
		<div v-if="!isLoggedIn" class="form-group">
			<label>Email</label>
			<input v-validate.disabled="'email'" name="email" type="text" v-model="comment2.email" class="form-control"/>
		</div>
		<div class="form-group">
			<textarea v-validate.disabled="'required'" v-model="comment2.body" class="form-control" name="body"></textarea>
			<div v-show="errors.has('body')" class="has-error">{{ errors.first('body') }}</div>
		</div>
		<div v-if="error" class="alert alert-danger fade in">
			//<a href="#" class="close" data-dismiss="alert">&times;</a>
			<p>{{error}}</p>
		</div>
		<input type="submit" value="submit" class="btn btn-primary" />
		'&nbsp;
		<input type="submit" value="cancel" v-on:click.prevent="cancel(); errors.clear();" class="btn btn-default" />
	</form>
</template>

<script>
export default {
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
			this.comment2 = this.comment;
		}
	},

	data: function () {
		return {
			comment2: this.newComment(),
			error: null
		};
	},

	computed: {
		isLoggedIn: function() {
			return this.$commentsStore.getters.isLoggedIn;
		},
	},

	methods: {
		newComment() {
			return {
				//id: Math.floor(Math.random() * 100000000000) + 1,
				body: '',
				name: '',
				model: this.model,
				foreign_key: this.modelId,
				parent_id: this.parentId === undefined ? null : this.parentId,
				//created: new Date()
			}
		},
		validateBeforeSubmit() {
			this.$validator.validateAll().then((result) => {
				if (result) {
					this.submit();
				}
			});
		},
		clearAndReset: function() {
			this.comment2 = this.newComment();
			this.error = null;
			this.errors.clear();
			this.$validator.reset();
			this.$emit('closeForm');
		},
		submit: function () {
			if (this.errors.any()) {
				return;
			}

			if (this.replyTo !== null) {
				this.comment2.parent_id = this.replyTo.id;
			}

			if (this.comment !== null) {
				this.$commentsStore.dispatch('updateComment', this.comment2).then(() => {
					this.clearAndReset();
				}).catch((error ) => {
					this.error = 'There was a problem saving your comment';
				});
				return;
			}

			this.$commentsStore.dispatch('addComment', this.comment2)
				.then(() => {
					this.clearAndReset();
				}).catch((error ) => {
					this.error = 'There was a problem saving your comment';
				});
		},
		cancel: function () {
			this.clearAndReset();
		}
	}
};
</script>
