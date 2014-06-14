var Handlebars = require('handlebars/runtime').default;
var settings = require('../settings');
var $ = require('jquery');

Handlebars.registerHelper('photo_url', function(photo) {
  var viewportWidth = $(window).width();

  if (settings.screen.mobile_max > viewportWidth) {
    return settings.api_root + photo.small.url;
  } else {
    return settings.api_root + photo.normal.url;
  }
});
