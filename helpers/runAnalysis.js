const R = require('r-script');
const path = require('path');


const callR = (filePath) => {
	return new Promise((resolve, reject) => {
		const script = path.join(__dirname, 'R', 'interface.R');
		R(script)
			.data(filePath)
			.call((err, d) => {
				if (err) {
					// analysis creates regular progress messages which are registered as errors by r-script
					const buf = err.toString('utf8');
					console.log('message', buf);
				}
				if (d && d.results) {
					console.log('data', d);
					resolve({ code: 200, output: d });
				} else if (d) {
					reject({ code: 400, error: 'Error analysing the data' });
				}
			});
	});
};

// Stops the analysis if it takes longer than <ms> milliseconds
const promiseTimeout = function (promise, ms) {
	// Create a promise that rejects in <ms> milliseconds
	let timeout = new Promise((resolve, reject) => {
		let id = setTimeout(() => {
			clearTimeout(id);
			reject({ code: 408, output: 'Analysis Timeout' });
		}, ms);
	});
	// Returns a race between our timeout and the passed in promise
	return Promise.race([
		promise,
		timeout
	]);
};

const runAnalysis = function (filePath) {
	// analysis timeout after 10 minutes
	return promiseTimeout(callR(filePath), 600000);
};

module.exports = { runAnalysis };