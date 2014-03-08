var path = require('path');
var url = require('url');
var express = require('express');
var browserify = require('connect-browserify');
var less = require('connect-less');
var ReactAsync = require('react-async');
var nodejsx = require('node-jsx').install();
var App = require('./client');

var development = process.env.NODE_ENV !== 'production';

function renderApp(req, res, next) {
  var path = url.parse(req.url).pathname;
  var app = App({
    path: path
  });
  ReactAsync.renderComponentToStringWithAsyncState(app, function(err, markup) {
    if (err) {
      return next(err);
    }
    res.send(markup);
  });
}

var api = express()
  .get('/venue/:id', function(req, res) {
    var id = req.params.id;
    res.send({
      id: id,
      name: id.charAt(0).toUpperCase() + id.slice(1)
    });
  });

var app = express();

if (development) {
  app.get('/assets/bundle.js',
    browserify('./client', {
      debug: true,
      watch: true
    }));
  app.use('/assets',
    less({
      src: path.join(__dirname, 'less'),
      dst: path.join(__dirname, 'assets')
    }));
}

app
  .use('/assets', express.static(path.join(__dirname, 'assets')))
  .use('/api', api)
  .use(renderApp)
  .listen(3000, function() {
    console.log('Point your browser at http://localhost:3000');
  });