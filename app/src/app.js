var $ = require('jquery');
var Backbone = require('backbone');
var _ = require('underscore');

var settings = require('./settings');
require('./helpers');

// we need to hook Backbone with jquery
Backbone.$ = $;

var location = require('./models/location');
var details = require('./views/details');
var map = require('./views/map');
var search = require('./views/search');


// will wait for both google maps and the document to be loaded before we can
// start the application
var startApplication = _.after(2, function() {

  var locationCollection = new location.LocationCollection();

  var detailsView = new details.DetailsView({
    collection: locationCollection
  });

  var searchView = new search.SearchView({
    collection: locationCollection
  });

  var mapView = new map.MapView({
    collection: locationCollection,
    defaultParameters: {
      center: {
        lat: 51.501,
        lng: -0.118
      },
      zoom: 12
    }
  });
});


// Load Google Maps async
(function(startApplication) {
  var gMapsUrl = 'https://maps.googleapis.com/maps/api/js?key=' + settings.google_maps_api_key + '&libraries=places&callback=gmap_loaded';

  var s = document.createElement("script");
  s.type = "text/javascript";
  s.src = gMapsUrl;

  window.gmap_loaded = function() {
    startApplication();
  };

  $("head").append(s);
})(startApplication);


// Wait for dom ready
$(function() {
  startApplication();
});

