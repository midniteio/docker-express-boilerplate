const exec = require('child_process').exec;
const path = require('path');

const log = require('./log.js');
const package = require('../package.json');

const arg = process.argv[2];
const hostPort = process.env.hostPort;
const publicDir = path.join(process.cwd(), 'www', 'public');

var command;

if (arg === 'build') {
  command = 'docker build -t {organization}/{name} .'
    .replace('{organization}', package.organization)
    .replace('{name}', package.name);
} else if (arg === 'deploy') {
  command = 'docker run -dt -p {host_port}:8080 -v {public_dir}:/usr/src/app/public {organization}/{name}'
    .replace('{host_port}', hostPort)
    .replace('{public_dir}', publicDir)
    .replace('{organization}', package.organization)
    .replace('{name}', package.name);
}

exec(command, function (error, stdout, stderr) {
  log.head(command);
  log.ok(stdout);
  log.warn(stderr);
  if (error !== null) {
    log.error('exec error: ', error);
  }
});
