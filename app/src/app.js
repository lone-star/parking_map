var $ = require('jquery');
var Backbone = require('backbone');

// we need to hook Backbone with jquery
Backbone.$ = $;

var location = require('./models/location');
var details = require('./views/details');
var map = require('./views/map');
var search = require('./views/search');

$(function() {

  // initialize collection
  var locationCollection = new location.LocationCollection();

  // initialize views
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

  locationCollection.search('wembley');
});
