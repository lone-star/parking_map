var Backbone = require('backbone');

/*
 * The map view serves several purposes:
 *    -display markers
 *    -show routes
 *    -select marker
 *
 * It interacts mostly with the Google Maps canevas
 */
var MapView = Backbone.View.extend({
  initialize: function(options) {

    var center = options.defaultParameters.center;

    var mapOptions = {
      center: new google.maps.LatLng(center.lat, center.lng),
      zoom: options.defaultParameters.zoom
    };

    // FIXME: not clean
    this.map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
  }
});

module.exports = {
  MapView: MapView
};
