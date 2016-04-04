var DOM = require('./src/selector');

var Core = require('coreutil/core');
var RS = require('./src/domresultset');
var Attr = require('./src/attribute');

Core.extend(Core, RS);
Core.extend(Core, Attr);

Core.root.H$ = DOM;

module.exports = DOM;