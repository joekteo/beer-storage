'use strict';
var chai = require('chai');
var chaihttp = require('chai-http');
var expect = chai.expect;

chai.use(chaihttp);
var latitude = '47.61167908';
var longitude = '-122.33325958';

var wunderUrl = 'http://api.wunderground.com/api/' +
process.env.WUNDERAPI +
'/conditions/q/' +
latitude +
',' +
longitude +
'.json';

describe('Find User Latitude and Longitude', function() {
  it('should return latitude and longitude coordinates', function(done) {
    chai.request(wunderUrl)
    .get('/')
    .end(function(err, res) {
      expect(res.body.location).to.eql('Seattle');
    });
    done();
  });
});
