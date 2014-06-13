var Backbone = require('backbone');

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

  select: function() {}
});


module.exports = {
  LocationCollection: LocationCollection
};
