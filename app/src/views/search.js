var Backbone = require('backbone');
var _ = require('underscore');

/*
 * The search view is to let the user perform text searches
 *
 * It needs a collection, and will call collection.search(queryString) when a
 * user is performing a search
 */
var SearchView = Backbone.View.extend({
  id: 'search',

  initialize: function() {
    this.autocomplete = new google.maps.places.Autocomplete(document.getElementById('search-text'));

    google.maps.event.addListener(this.autocomplete, 'place_changed',
                                  _.bind(this.newSearch, this));
  },

  newSearch: function() {
    var place = this.autocomplete.getPlace();
    console.log(place);
    this.collection.search(place.formatted_address || place.name);
  }
});

module.exports = {
  SearchView: SearchView
};
