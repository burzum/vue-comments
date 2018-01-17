<template>
	<ul class="nav nav-tabs">
		<li role="presentation" :class="{active: isActive('oldest')}">
			<a href="#" v-on:click.prevent="sortBy('oldest')">Oldest</a>
		</li>
		<li role="presentation" :class="{active: isActive('newest')}">
			<a href="#" v-on:click.prevent="sortBy('newest')">Newest</a>
		</li>
	</ul>
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
	},
	methods: {
		sortBy(orderBy) {
			this.$commentsStore.commit('setOrderBy', orderBy);
			this.$commentsStore.commit('clearComments', {
				model: this.model,
				modelId: this.modelId,
				parentId: this.parentId
			});
			this.$commentsStore.dispatch('loadComments', {
				model: this.model,
				modelId: this.modelId,
				parentId: this.parentId
			});
		},
		isActive(value) {
			return this.$commentsStore.getters.getOrderBy === value;
		}
	}
};
</script>
