module.exports = {
	verbose: true,
	collectCoverage: true,
	coverageDirectory: '<rootDir>/test/coverage',
	testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.jsx?$",
	rootDir: '../',
	preset: null,
	moduleNameMapper: {
		'^vue$': 'vue/dist/vue.common.js'
	},
	moduleFileExtensions: ["vue", "js", "json", "jsx"],
	transform: {
		'.js$': '<rootDir>/node_modules/babel-jest',
		'.*\\.(vue)$': '<rootDir>/node_modules/jest-vue'
	}
};
