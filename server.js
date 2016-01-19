const cluster = require('cluster');
const express = require('express');
const path = require('path');

const log = require('./lib/log');

const port = 8080;
const publicDir = path.join(process.cwd(), 'www', 'public');

if(cluster.isMaster) {
  var numWorkers = require('os').cpus().length;
  for(var i = 0; i < numWorkers; i++) {
    cluster.fork();
  }

  cluster.on('online', function(worker) {
    log.once('Server is online');
    log.debug('Worker ' + worker.process.pid + ' is online');
  });

  cluster.on('exit', function(worker, code, signal) {
    log.debug('Worker ' + worker.process.pid + ' died with code: ' + code + ', and signal: ' + signal);
    log.debug('Starting a new worker');
    cluster.fork();
  });
} else {
  var app = express();
  app.use(express.static(publicDir)); //TODO, swap this for nginx
  app.listen(port, function() {
    log.debug('Process ' + process.pid + ' is listening to all incoming requests');
  });
}
