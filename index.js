var express = require('express');
var app = express();
var initRouters = require('./controllers');
app.set('port', (process.env.PORT) || 3400);

app.server = require('http').createServer(app);

// SPIN UP SERVER
app.server.listen(app.get('port'), function() {
 console.log('Listening on port', app.get('port'));
});

// TODO: Initialize DB connection

// Initialize all routers
initRouters(app);

