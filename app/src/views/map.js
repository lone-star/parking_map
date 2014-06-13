var Backbone = require('backbone');
var _ = require('underscore');

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
      zoom: options.defaultParameters.zoom,
      zoomControlOptions: {
        position: google.maps.ControlPosition.LEFT_CENTER
      },
      mapTypeControl: false,
      streetViewControl: false,
      panControl: false
    };

    // FIXME: not clean
    this.map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);

    this.collection.on('reset', this.render, this);
  },
  render: function() {
    var bounds = new google.maps.LatLngBounds();

    this.renderLocations(bounds);
    this.renderSearch(bounds);

    this.map.fitBounds(bounds);
  },

  renderLocations: function(bounds) {
    if (this.markers && this.markers.length > 0) {
      _.each(this.markers, function(marker) {
        marker.setMap(null);
      });
    }
    this.markers = [];

    var marker;

    this.collection.each(function(location) {
      var latLng = new google.maps.LatLng(location.get('coords').lat, location.get('coords').lng);
      marker = new google.maps.Marker({
        position: latLng,
        animation: google.maps.Animation.DROP,
        map: this.map,
        icon: '/static/img/map-marker.png' // TODO: put somewhere else
      });

      this.markers.push(marker);

      google.maps.event.addListener(marker, 'click', this.collection.selectEvent(location));

      bounds.extend(latLng);
    }, this);
  },

  renderSearch: function(bounds) {
    var searchCoords = this.collection.getCoordinates();
    var searchLatLng = new google.maps.LatLng(searchCoords.lat, searchCoords.lng);

    if (typeof this.searchMarker !== 'undefined') {
      this.searchMarker.setMap(null);
    }

    this.searchMarker = new google.maps.Marker({
      position: searchLatLng,
      animation: google.maps.Animation.DROP,
      map: this.map,
      icon: '/static/img/current-location.png' // TODO: put somewhere else
    });

    bounds.extend(searchLatLng);
  }
});

module.exports = {
  MapView: MapView
};
