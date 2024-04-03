#!/usr/bin/env node
/* eslint-disable no-console */

process.on('unhandledRejection', (err) => {
  throw err;
});

const spawn = require('cross-spawn');

const argv = process.argv.slice(2);
const command = argv[0];

if (!['start', 'build'].includes(command)) {
  console.log(`Unknown command "${command}"`);

  process.exit(1);
}

switch (command) {
  case 'start':
    process.env.NODE_ENV = 'development';
    break;

  case 'build':
    process.env.NODE_ENV = 'production';
    break;

  default:
    process.env.NODE_ENV = 'development';
    break;
}

const webpackArgv = ['webpack'];
if (command === 'start') {
  webpackArgv.push('serve');
}
webpackArgv.push(...argv.slice(1));

const result = spawn.sync('npx', webpackArgv, { stdio: 'inherit' });

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
