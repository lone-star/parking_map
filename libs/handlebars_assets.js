var handlebars = require('handlebars');
var through = require('through');

var filenamePattern = /\.(html|handlebars|hbs)$/;

function wrap(template) {
  return 'var templater = require("handlebars/runtime")["default"].template;' + 'module.exports = templater(' + template + ');'
}

module.exports = function(file) {
  if (!filenamePattern.test(file)) return through();

  var input = '';

  function write(buffer) {
    input += buffer;
  }

  function end() {
    this.queue(wrap(handlebars.precompile(input)));
    this.queue(null);
  }

  return through(write, end);

}
