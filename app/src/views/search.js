var Backbone = require('backbone');

/*
 * The search view is to let the user perform text searches
 *
 * It needs a collection, and will call collection.search(queryString) when a
 * user is performing a search
 */
var SearchView = Backbone.View.extend({});

module.exports = {
  SearchView: SearchView
};
