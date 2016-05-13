var DOM = require('./src/cssselector');

var Core = require('coreutil/core');
var RS = require('./src/domresultset');
var Attr = require('./src/cssattribute');
var Vendor = require('./src/vendor');

Core.extend(Core, RS);
Core.extend(Core, Attr);

Core.__setVendorProvider(Vendor);

Core.root.H$ = DOM;

module.exports = DOM;