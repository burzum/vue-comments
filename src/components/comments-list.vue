<template>
	<div>
		<ul class="comments-list">
			<li v-for="comment in comments">
				<comment :level="level" :comment="comment" :model="model" :model-id="modelId" :parent-id="parentId"></comment>
			</li>
		</ul>
		<p v-if="hasMore">
			<a href="" v-on:click.prevent="loadMore()" class="btn btn-default btn-sm">Load more</a>
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
			this.$commentsStore.dispatch('loadComments', {
				model: this.model,
				modelId: this.modelId,
				parentId: this.parentId
			});
		}
	},
	methods: {
		loadMore: function() {
			this.$commentsStore.dispatch('loadComments', {
				model: this.model,
				modelId: this.modelId,
				parentId: this.parentId,
				params: {
					page: this.pagination.page + 1
				}
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
			initialized: false
		}
	}
};
</script>
