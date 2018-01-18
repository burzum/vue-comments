var config = require('../../../nightwatch.conf.BASIC.js');

module.exports = { // adapted from: https://git.io/vodU0
	'Guinea Pig Assert Title': function (browser) {
		browser
			.url('https://saucelabs.com/test/guinea-pig')
			.waitForElementVisible('body')
			.assert.title('I am a page title - sSauce Labs')
			.saveScreenshot('./test/e2e/screenshots/guinea-pig-test.png', function (result) {
				if (!result || result.status !== 0) {
					console.log('Error saving screenshot...', result);
				}
			})
			.end();
	}
};
