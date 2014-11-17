/*jshint node: true*/
'use strict';

function showLocation(position) {
  var latitude = position.coords.latitude;
  var longitude = position.coords.longitude;

  $.ajax({
    url: '/',
    type: 'POST',
    data: {lat: latitude, lon: longitude},
    success: function(data) {
      if (data.msg === 'Yes') {
        // console.log('yes');
        $('#findout').html('<p id="yes">' + data.msg + '</p>');
      } else {
        // console.log('no');
        $('#findout').html('<p id="no">' + data.msg + '</p>');
      }
    }
  });
}

$(document).ready(function() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showLocation, function(err) {
      if (err) {
        $('#answer')
        .html('<p>Must Allow Access to Your Location.</p>');
      }
    });
  } else {
    $('#answer').html('<p>Unable to Locate You.</p>');
  }
}());
