<template>
	<div class="comment-widget"> +
		<comments-tabs :model="model" :model-id="modelId"></comments-tabs> +
		<comments-list :model="model" :model-id="modelId" ></comments-list> +
		<comment-form :model="model" :model-id="modelId" /> +
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
	}
};
</script>
