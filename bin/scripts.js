#!/usr/bin/env node
/* eslint-disable no-console */
const path = require('path');
const spawn = require('cross-spawn');

const argv = process.argv.slice(2);


console.log('***************************');
console.log('argv', argv);
console.log('***************************');

if (result.signal) {
  if (result.signal === 'SIGKILL') {
    console.log(
      'The build failed because the process exited too early. '
      + 'This probably means the system ran out of memory or someone called '
      + '`kill -9` on the process.',
    );
  } else if (result.signal === 'SIGTERM') {
    console.log(
      'The build failed because the process exited too early. '
      + 'Someone might have called `kill` or `killall`, or the system could '
      + 'be shutting down.',
    );
  }
  process.exit(1);
}
process.exit(result.status);
