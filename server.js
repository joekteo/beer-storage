/*jshint node: true*/
'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var request = require('superagent');
var app = express();

app.use(express.static(__dirname + '/views/'));
app.use(bodyParser.urlencoded({extended: true}));

app.post('/', function(req, res) {
  var latitude = req.body.lat;
  var longitude = req.body.lon;
  var wunderUrl = 'http://api.wunderground.com/api/' +
  process.env.WUNDERAPI +
  '/conditions/q/' +
  latitude +
  ',' +
  longitude +
  '.json';

  request
    .get(wunderUrl)
    .end(function(err, wunderData) {
      var answer;
      var parsedData = JSON.parse(wunderData.text);
      var temp = parsedData.current_observation.temp_f;
      if (temp < 45) {
        answer = 'Yes';
      } else {
        answer = 'No';
      }
      res.json({msg: answer});
    });
});

var port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log('Server started on port %d', port);
});
