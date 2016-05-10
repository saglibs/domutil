var DOM = require('./src/main/javascript/cssselector');

var Core = require('coreutil/core');
var RS = require('./src/main/javascript/domresultset');
var Attr = require('./src/main/javascript/cssattribute');

Core.extend(Core, RS);
Core.extend(Core, Attr);

Core.root.H$ = DOM;

module.exports = DOM;