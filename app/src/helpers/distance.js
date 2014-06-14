var Handlebars = require('handlebars/runtime').default;

Handlebars.registerHelper('round_distance', function(distance) {
  return Math.round(distance * 100) / 100;
});
