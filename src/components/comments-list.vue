<template>
	<div>
		<ul class="comments-list">
			<li v-for="(comment, key) in comments" :key="comment.id">
				<comment v-bind="key" :level="level" :comment="comment" :model="model" :model-id="modelId" :parent-id="parentId"></comment>
			</li>
		</ul>
		<br />
		<p v-if="hasMore && !loading">
			<a href="" v-on:click.prevent="loadMore()" class="btn btn-default btn-sm btn-load-more">
				Load more
			</a>
		</p>
		<p class="loading-comments" v-if="loading">
			Loading...
		</p>
		<p v-if="comments.length === 0 && !loading">
			Nobody has yet commented on this
		</p>
	</div>
</template>

<script>
export default {
	props: {
		modelId: null,
		parentId: {
			default: null
		},
		model: {
			type: String,
			default: null
		},
		level: {
			type: Number,
			default: 1
		}
	},
	created: function() {
		if (this.parentId === null) {
			this.loadComments();
		}
	},
	methods: {
		loadComments(params = {}) {
			this.loading = true;

			let requestParams = {
				model: this.model,
				modelId: this.modelId,
				parentId: this.parentId,
				params: params
			};

			return this.$commentsStore.dispatch('loadComments', requestParams)
				.then(() => {
					this.loading = false;
				}).catch(() => {
					this.loading = false;
				});
		},
		loadMore: function () {
			this.loadComments({
				page: this.pagination.page + 1
			});
		}
	},
	computed: {
		pagination: function() {
			return this.$commentsStore.getters.getPagination(
				this.model,
				this.modelId,
				this.parentId
			);
		},
		comments: function() {
			return this.$commentsStore.getters.getCommentsForModel(
				this.model,
				this.modelId,
				this.parentId
			);
		},
		hasMore: function() {
			return this.$commentsStore.getters.hasMore(
				this.model,
				this.modelId,
				this.parentId
			);
		}
	},
	data: function() {
		return {
			initialized: false,
			loading: false
		}
	}
};
</script>
