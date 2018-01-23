module.exports = {
	verbose: true,
	collectCoverage: true,
	coverageDirectory: '<rootDir>/test/unit/coverage',
	testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.jsx?$",
	rootDir: '../',
	preset: null,
	moduleNameMapper: {
		'^@/(.*)$': '<rootDir>/src/$1',
		'^vue$': 'vue/dist/vue.common.js',
	},
	moduleFileExtensions: ["vue", "js", "json", "jsx"],
	transform: {
		'.js$': '<rootDir>/node_modules/babel-jest',
		'.*\\.(vue)$': '<rootDir>/node_modules/jest-vue'
	}
};
