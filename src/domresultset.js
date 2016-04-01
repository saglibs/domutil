var RS = {};

var C = require('coreutil/dist/corecore');

var rsDescriptor = {
    value: true,
    writable: false,
    configurable: false,
    enumerable: false
};

C.addProperty(Array.prototype, '__isRS__', rsDescriptor);

function makeResultSet(object) {
    if (object != null && !object['__isRS__'] && typeof object === 'object') {
        C.addProperty(object, '__isRS__', rsDescriptor);
    }
}

function objectIsResultSet(object) {
    if (object == null) return false;
    if (object['__isRS__']) {
        return true;
    }
    if (object instanceof Element) {
        if (!object['__isRS__']) {
            makeResultSet(object);
        }
    }
}

function isResultSet(object) {
    if (C.isNodejs) return false;
    //if isArrayLike, and only contains Elements, return true
    if (C.isArrayLike(object)) {
        var l = object.length;
        var n = object.length;
        if (l > 0) {
            l++;
            while(--l) {
                if (!objectIsResultSet(object[n - l])) {
                    return false;
                }
            }
            return true;
        }
    } else {
        return objectIsResultSet(object);
    }
}

// isResultSet({})

module.exports = RS;