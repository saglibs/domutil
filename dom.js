var DOM = require('./src/selector');

var Core = require('coreutil/core');
var RS = require('./src/domresultset');

Core.extend(Core, RS);

Core.root.H$ = DOM;

module.exports = DOM;