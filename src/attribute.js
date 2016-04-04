var Attr = {};

var Vendor = require('./vendor');
var Mini = require('coreutil/mini');

var AttributeMap = {
    'width': ['innerWidth', 'clientWidth'],
    'height': ['innerHeight', 'clientHeight']
};

function getSingleElement(object) {
    if (object instanceof Element) {
        return object;
    }
    var count = 0, vals = [];
    if (Mini.isArrayLike(object)) {
        Mini.arrayEach(object, function(v) {
            if (v instanceof Element) {
                count ++;
                vals.push(v);
            }
        });
        if (count === 1) {
            return vals[0];
        }
    }
    return false;
}

function queryAttrAlias(attr) {
    var c = Vendor.toCamel(attr);
    var f = Vendor.fromCamel(attr);
    var c_alias = Vendor.attrs[c] || [];
    var f_alias = Vendor.attrs[f] || [];
    return c_alias.concat(f_alias);
}

function innerGetAttribute(ele, attr) {
    if (AttributeMap[attr]) {
        var attrs = AttributeMap[attr];
        for (var i = 0; i < attrs.length; i++) {
            var val = getComputedStyle(ele)[attrs[i]];
            if (val) return val;
        }
    }
    return getComputedStyle(ele)[attr];
}

/**
 * Get computed style
 *
 * ele -> [ele]
 * attr -> [attr]
 *
 * @param ele
 * @param attr
 */
function getAttribute(ele, attr) {
    ele = getSingleElement(ele);
    if (!ele || !attr) {
        return;
    }
    var alias = queryAttrAlias(attr);

    if (alias.length === 0) alias = [attr];

    var length = alias.length;

    if (Mini.isArrayLike(alias) && length > 0) {
        var result = [];
        var n = length;
        length++;
        while (--length) {
            result = getComputedStyle(ele)[alias[n - length]];
            if (result) {
                return result;
            }
        }
        return result;
    }
}

/**
 * Get declared style (Camel or normal form)
 *
 * @param {Element} ele
 * @param {String} attr
 */
function getStyle(ele, attr) {
    var alias = queryAttrAlias(attr);

    //returns the first
    Mini.arrayEach(alias || [], function(a) {
        //
    });
}

Attr.getAttribute = getAttribute;
Attr.getStyle = getStyle;
Attr.getSingleElement = getSingleElement;

module.exports = Attr;