const chalk = require('chalk');
const fs = require('fs-extra');
const path = require('path');

const prefix = '> ';
const logsDir = path.join(process.cwd(), 'logs');
const debugFile = path.join(logsDir, 'debug.txt');

var displayedOnce = false;
var horizontalRule = '';

for (var i = 0; i < process.stdout.columns; i++) {
  horizontalRule += '\u2500';
}

fs.ensureDir(logsDir);

module.exports = {

  format: function(output) {
    if (output.length >= prefix.length && output.slice(0, prefix.length) == prefix) {
      return output;
    }
    return prefix + output;
  },
  write: function(output) {
    console.log(prefix + output);
  },
  ok: function(output) {
    console.log(chalk.green(prefix + output));
  },
  warn: function(output) {
    console.log(chalk.yellow(prefix + output));
  },
  error: function(output) {
    console.log(chalk.red(prefix + output));
  },
  head: function(output) {
    console.log('\n' + chalk.cyan.bold(output));
    console.log(chalk.cyan(horizontalRule));
  },
  dim: function(output) {
    console.log(chalk.gray(prefix + output));
  },
  debug: function(output) {
    var timestamp = new Date().toLocaleString();
    fs.appendFileSync(debugFile, timestamp + ': ' + output + '\n');
  },
  once: function(output) {
    if (!displayedOnce) {
      console.log(output);
      displayedOnce = true;
    }
  }

};
