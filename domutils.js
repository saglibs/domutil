var DOM = require('./src/cssselector');

var Detect = require('coreutil/src/detect');
var RS = require('./src/domresultset');
var Attr = require('./src/cssattribute');

var Core = {};

extend(Core, RS);
extend(Core, Attr);

function extend(baseObject, targetObject) {
    var keys = Object.keys(baseObject) || [];

    for (var i = 0; i < keys.length; i++) {
        targetObject[keys[i]] = baseObject[keys[i]];
    }

    return targetObject;
}

Detect.root.H$ = DOM;

module.exports = DOM;