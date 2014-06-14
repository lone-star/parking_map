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
  el: '#map-canvas',

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

    this.directionsDisplay = new google.maps.DirectionsRenderer();
    this.directionsService = new google.maps.DirectionsService();

    this.collection.on('reset', this.render, this);
    this.collection.on('locationSelected', function(location) {

      if (this.isLargeMode) {
        _.delay(_.bind(this.showRoute, this, location), 1000);
      } else {
        this.showRoute.apply(this, arguments);
      }

    }, this);

    this.isLargeMode = true;
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
      var latLng = new google.maps.LatLng(location.lat(), location.lng());
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
  },

  showRoute: function(location) {
    if (!location) {
      this.directionsDisplay.setMap(null);
      this.expand();
      return;
    }
    this.directionsDisplay.setMap(this.map);

    var request = {
      origin: location.getCoordinatesString(),
      destination: this.collection.getCoordinatesString(),
      travelMode: google.maps.TravelMode.WALKING
    };
    this.directionsService.route(request, _.bind(function(result, status) {
      if (status == google.maps.DirectionsStatus.OK) {
        this.directionsDisplay.setDirections(result);
      }
    }, this));

    this.shrink();
  },

  shrink: function() {
    if (!this.isLargeMode) {
      return;
    }
    this.isLargeMode = false;
    this.$el.addClass('small');
    google.maps.event.trigger(this.map, "resize");
  },

  expand: function() {
    if (this.isLargeMode) {
      return;
    }
    this.isLargeMode = true;
    this.$el.removeClass('small');
    google.maps.event.trigger(this.map, "resize");
  }
});

module.exports = {
  MapView: MapView
};
