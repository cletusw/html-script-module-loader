/* eslint-env node */
var path = require('path');

var headerRegex = /<script type="module" src="(.+)">\s*<\/script>\s*/g;

module.exports = function(source) {
  var previousExports = this.exec(source, this.resource);
  var markup = (previousExports && previousExports.default) ? previousExports.default : previousExports;

  if (typeof markup !== 'string') {
    throw new Error('Module ' + path.relative(process.cwd(), this.resource) + ' does not export a string as default');
  }

  var dependencies = [];
  var replacedMarkup = markup.replace(headerRegex, function(match, captureGroup1) {
    dependencies.push(captureGroup1);
    return '';
  });
  var requires = dependencies.map(function(dependency) {
    return "require('" + dependency + "');\n";
  })
  var returnValue = requires + 'module.exports = ' + JSON.stringify(replacedMarkup);
  return returnValue;
};
