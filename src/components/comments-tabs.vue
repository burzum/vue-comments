<template>
	<ul class="nav nav-tabs">' +
		<li role="presentation" :class="{active: isActive('oldest')}">' +
			<a href="#" v-on:click.prevent="sortBy('oldest')">Oldest</a>'+
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
			this.$store.commit('setOrderBy', orderBy);
			this.$store.commit('clearComments', {
				model: this.model,
				modelId: this.modelId,
				parentId: this.parentId
			});
			this.$store.dispatch('loadComments', {
				model: this.model,
				modelId: this.modelId,
				parentId: this.parentId
			});
		},
		isActive(value) {
			return this.$store.getters.getOrderBy === value;
		}
	}
};
</script>
