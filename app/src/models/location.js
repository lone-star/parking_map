var Backbone = require('backbone');
var _ = require('underscore');

/*
 * A location is a place where a car can park
 */
var LocationModel = Backbone.Model.extend({

  getCoordinatesString: function() {
    return this.lat() + ',' + this.lng();
  },

  lat: function() {
    return this.get('coords').lat;
  },

  lng: function() {
    return this.get('coords').lng;
  }
});

/*
 * In addition to the base Backbone.Collection methods, the LocationCollection
 * will provide two main features:
 *
 *
 *    -search: perform a search on a given query
 *
 *    -select: sets a location as selected, and triggers a "locationSelected"
 *    event.
 *    When selecting `null`, it means nothing is being selected
 *
 * The collection holds the current state of the application in addition to
 * the data
 */
var LocationCollection = Backbone.Collection.extend({

  model: LocationModel,

  // This is the URL for our proxy server
  url: '/api',

  search: function(searchQuery) {
    this.fetch({
      dataType: 'json',
      data: {
        q: searchQuery
      },
      reset: true
    });
  },

  parse: function(response) {
    this.coordinates = response.coords;
    return response.data;
  },

  getCoordinates: function() {
    return this.coordinates;
  },

  getCoordinatesString: function() {
    return this.coordinates.lat + ',' + this.coordinates.lng;
  },

  select: function(location) {
    if (this.selected === location) {
      return;
    }
    this.selected = location;
    this.trigger('locationSelected', location);
  },

  // Wrapper for `this.select`
  selectEvent: function(location) {
    return _.bind(_.partial(this.select, location), this);
  }
});


module.exports = {
  LocationCollection: LocationCollection
};
