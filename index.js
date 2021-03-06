var express = require('express');
var ParseServer = require('parse-server').ParseServer;
var app = express();
var ParseDashboard = require('parse-dashboard');

var api = new ParseServer({
  databaseURI: 'mongodb://localhost:27017/dev', // Connection string for your MongoDB database
  cloud: './cloud/main.js', // Path to your Cloud Code
  appId: 'myAppId',
  masterKey: 'myMasterKey', // Keep this key secret!
  fileKey: 'optionalFileKey',
  serverURL: 'http://localhost:1337/parse', // Don't forget to change to https if needed
  liveQuery: {
      classNames: ['Post']
  }
});

// Serve the Parse API on the /parse URL prefix
app.use('/parse', api);

var dashboard = new ParseDashboard({
    "apps": [{
        "serverURL": 'http://localhost:1337/parse',
        "appId": 'myAppId',
        "masterKey": 'myMasterKey',
        "appName": "MyApp"
    }]
}, { allowInsecureHTTP: false });

// make the Parse Dashboard available at /dashboard
app.use('/dashboard', dashboard);

var port = '1337';
var httpServer = require('http').createServer(app);
httpServer.listen(port);
var parseLiveQueryServer = ParseServer.createLiveQueryServer(httpServer);