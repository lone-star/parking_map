var Backbone = require('backbone');
var _ = require('underscore');

/*
 * A location is a place where a car can park
 */
var LocationModel = Backbone.Model.extend({});

/*
 * In addition to the base Backbone.Collection methods, the LocationCollection
 * will provide two specialized methods:
 *
 *    -search: perform a search on a given query
 *    -select: sets a location as selected, and triggers a "locationSelected"
 *    event
 *
 * The collection holds the current state of the application in addition to
 * the data
 */
var LocationCollection = Backbone.Collection.extend({

  model: LocationModel,

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
    // save search coodinates
    this.coordinates = response.coords;

    return response.data;
  },

  getCoordinates: function() {
    return this.coordinates;
  },

  select: function() {}
});


module.exports = {
  LocationCollection: LocationCollection
};
