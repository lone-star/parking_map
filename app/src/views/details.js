var Backbone = require('backbone');
var _ = require('underscore');
var $ = require('jquery');

/*
 * The details view will show detailed information about the currently selected
 * marker. If no marker is selected, it will not be visible.
 */
var DetailsView = Backbone.View.extend({

  el: '#details-pannel',

  template: require('./details.handlebars'),

  events: {
    "click .js-close": 'close'
  },

  initialize: function() {
    this.collection.on('locationSelected', this.showPannel, this);
  },

  showPannel: function(location) {
    if (!location) {
      return;
    }
    this.render(location);
    this.$el.addClass('visible');
  },

  render: function(location) {
    this.$el.html(this.template(location.attributes));
  },

  close: function(e) {
    e.preventDefault();
    this.$el.removeClass('visible');

    this.collection.select(null);
  }
});

module.exports = {
  DetailsView: DetailsView
};
