module.exports = {
	root: true,
	parserOptions: {
		parser: 'babel-eslint'
	},
	env: {
		browser: true,
		es6: true
	},
	extends: [
		// add more generic rulesets here, such as:
		'eslint:recommended',
		'plugin:vue/essential'
	],
	plugins: [
		'vue'
	],
	rules: {
		// allow async-await
		'generator-star-spacing': 'off',
		// override/add rules settings here, such as:
		// 'vue/no-unused-vars': 'error'
		'indent': ['error', 'tab'],
		'quotes': ['error', 'single'],
		'no-mixed-spaces-and-tabs': [2, false],
		'no-unexpected-multiline': 2,
		'camelcase': 1
	}
}
