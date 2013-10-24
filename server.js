#!/bin/env node
//  OpenShift sample Node application
var express = require('express');
var fs      = require('fs');


/**
 *  Define the sample application.
 */
var SampleApp = function() {

    //  Scope.
    var self = this;
// socket.io initialization on the server side
self.initializeSocketIO = function() {
        self.server = require('http').createServer(self.app);
        self.io = require('socket.io').listen(self.server);
        self.io.enable('browser client minification');  // send minified client
        self.io.enable('browser client etag');          // apply etag caching logic based on version number
        self.io.enable('browser client gzip');          // gzip the file
        self.io.set('log level', 1);                    // reduce logging

        self.io.set('transports', [
                'websocket'
            ]);
        return this;
    }

    self.addSocketIOEvents = function() {
        self.io.sockets.on('connection', function (socket) {
          socket.emit('news', { hello: 'world' });
          socket.on('my other event', function (data) {
            console.log(data);
      });
    });
}

/**
 *  Initializes the sample application.
 */
self.initialize = function() {
    self.setupVariables();
    self.populateCache();
    self.setupTerminationHandlers();

    // Create the express server and routes.
    self.initializeServer();
    self.initializeSocketIO().addSocketIOEvents();
};
};   /*  Sample Application.  */



/**
 *  main():  Main code.
 */
var zapp = new SampleApp();
zapp.initialize();
zapp.start();