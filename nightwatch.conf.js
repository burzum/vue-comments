//require('env2')('.env'); // optionally store your Evironment Variables in .env

const seleniumServer = require("selenium-server");
const chromedriver = require("chromedriver");
const SCREENSHOT_PATH = "./test/e2e/screenshots/";

// we use a nightwatch.conf.js file so we can include comments and helper functions
module.exports = {
	"src_folders": [
		"test/e2e/specs"// Where you are storing your Nightwatch e2e tests
	],
	"output_folder": "./test/e2e/reports", // reports (test outcome) output by nightwatch
	"end_session_on_fail": true,
	"skip_testcases_on_fail": false,
	"abortOnAssertionFailure": false,
	"selenium": {
		"start_process": true, // tells nightwatch to start/stop the selenium process
		"server_path": seleniumServer.path,
		"host": "127.0.0.1",
		"port": 4444, // standard selenium port
		"cli_args": {
			"webdriver.chrome.driver": chromedriver.path
		}
	},
	"test_settings": {
		"default": {
			"screenshots": {
				"enabled": true, // if you want to keep screenshots
				"path": SCREENSHOT_PATH, // save screenshots here
				"on_failure" : true,
				"on_error" : true,
			},
			"globals": {
				"waitForConditionTimeout": 5000 // sometimes internet is slow so wait.
			},
			"desiredCapabilities": { // use Chrome as the default browser for tests
				"browserName": "chrome"
			}
		},
		"chrome": {
			"desiredCapabilities": {
				"browserName": "chrome",
				"javascriptEnabled": true // turn off to test progressive enhancement
			}
		}
	},
	afterEach: function (client, done) {
		var weHaveFailures = client.currentTest.results.errors > 0 || client.currentTest.results.failed > 0;

		console.log(weHaveFailures);
		if (weHaveFailures) {
			if (!client.sessionId) {
				console.log('Session already ended.');
				done();
				return;
			}

			var fileName = getFileName(client.currentTest.name);
			client.saveScreenshot(fileName, function (result) {
				if (!result || result.status !== 0) {
					console.log('Error saving screenshot...', result);
				}
				client.end(done);
			});
		} else {
			client.end(done);
		}
	}
}

function padLeft(count) { // theregister.co.uk/2016/03/23/npm_left_pad_chaos/
	return count < 10 ? '0' + count : count.toString();
}

var FILECOUNT = 0; // "global" screenshot file count
/**
 * The default is to save screenshots to the root of your project even though
 * there is a screenshots path in the config object above! ... so we need a
 * function that returns the correct path for storing our screenshots.
 * While we're at it, we are adding some meta-data to the filename, specifically
 * the Platform/Browser where the test was run and the test (file) name.
 */
function imgpath(browser) {
	var a = browser.options.desiredCapabilities;
	var meta = [a.platform];
	meta.push(a.browserName ? a.browserName : 'any');
	meta.push(a.version ? a.version : 'any');
	meta.push(a.name); // this is the test filename so always exists.
	var metadata = meta.join('~').toLowerCase().replace(/ /g, '');
	return SCREENSHOT_PATH + metadata + '_' + padLeft(FILECOUNT++) + '_';
}

module.exports.imgpath = imgpath;
module.exports.SCREENSHOT_PATH = SCREENSHOT_PATH;
