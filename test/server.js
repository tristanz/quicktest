var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var auth = require('basic-auth');

var app = express();
app.use(morgan('dev'));
app.use(bodyParser.json());

app.get('/static', function(req, res) {
  res.send({
    id: 1,
    name: 'test'
  });
});

app.get('/dynamic', function(req, res) {
  res.send({
    id: 1,
    name: 'test',
    date: (new Date()).toString()
  });
});

app.post('/mutative', function(req, res) {
  res.status(201).res({
    id: 1,
    name: 'test'
  });
});

app.post('/nested', function(req, res) {
  res.status(201).res({
    id: 1,
    name: {
      first: 'test',
      last: 'test'
    }
  });
});

app.post('/query', function(req, res) {
  res.res({
    id: 1,
    name: req.query.name
  });
});

app.post('/private', function(req, res) {
  var user = auth(req);
  if (user.name == 'test' && user.pass == 'test') {
    req.res({
      id: 1,
      name: 'test'
    });
  } else {
    res.status(403).send({
      message: 'Invalid username and password.'
    });
  }
});

app.listen(3000)