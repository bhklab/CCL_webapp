/* eslint-disable no-console */
/* eslint-disable prefer-promise-reject-errors */
const path = require('path');
const R = require('r-script');

const callR = (filePath) => new Promise((resolve, reject) => {
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
      } else if (d && d.error) {
        reject({ code: 500, error: d.message });
      } else if (d) {
        reject({ code: 500, error: 'Uknown error occurred' });
      }
    });
});

// Stops the analysis if it takes longer than <ms> milliseconds
const promiseTimeout = (promise, ms) => {
  // Create a promise that rejects in <ms> milliseconds
  const timeout = new Promise((resolve, reject) => {
    const id = setTimeout(() => {
      clearTimeout(id);
      reject({ code: 408, output: 'Analysis Timeout' });
    }, ms);
  });
  // Returns a race between our timeout and the passed in promise
  return Promise.race([
    promise,
    timeout,
  ]);
};

// analysis timeout after 10 minutes
const runAnalysis = (filePath) => promiseTimeout(callR(filePath), 600000);

module.exports = { runAnalysis };
