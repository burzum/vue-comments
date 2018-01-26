<template>
	<div class="comment-widget">
		<comments-tabs v-if="showTabs === 'true'" :model="model" :model-id="modelId"></comments-tabs>
		<comments-list :model="model" :model-id="modelId" ></comments-list>
		<comment-form v-if="showForm" :model="model" :model-id="modelId" />
		<p v-if="!showForm">
			You must be logged in to comment on this.
		</p>
	</div>
</template>

<script>
export default {
	props: {
		modelId: null,
		model: {
			type: String,
			default: null
		},
		showTabs: {
			default: 'true'
		}
	},
	computed: {
		showForm: function() {
			return this.$commentsStore.getters.canComment;
		}
	}
};
</script>
