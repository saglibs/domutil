var DOM = require('./src/cssselector');

// var Core = require('./target/dependencies/core');
var Core = require('coreutil/core');
var RS = require('./src/domresultset');
var Attr = require('./src/cssattribute');

Core.extend(Core, RS);
Core.extend(Core, Attr);

Core.root.H$ = DOM;

module.exports = DOM;