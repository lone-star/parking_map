var Backbone = require('backbone');
var _ = require('underscore');
var $ = require('jquery');

/*
 * The DisplayView listens to the events `locationSelected` on `this.collection`,
 * and will display the selected location.
 *
 * If the user closes the pannel, it will set the selected location to `null`
 */
var DetailsView = Backbone.View.extend({

  el: '#details-pannel',

  template: require('./details.hbs'),

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
