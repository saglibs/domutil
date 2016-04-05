/*
 * CSS Attributes Operate
 */
var Attr = require('./cssattribute');
var H = require('coreutil/core');

var Ops = {};

/*
 * Simple Attributes
 */

function assembleGetterSetters(getter, setter) {
    return function() {
        var func = arguments.length === 0 ? getter : setter;
        return func.apply(this, [this].concat(Array.prototype.slice.call(arguments)));
    };
}

function attributeGetterGen(attr) {
    return function(ele) {
        return Attr.getCssAttribute(ele, attr);
    };
}

function attributeSetterGen(attr) {
    return function(ele, val) {
        return Attr.setCssAttribute(ele, attr, val);
    };
}

function attributeOpAssembled(attr) {
    return assembleGetterSetters(attributeGetterGen(attr), attributeSetterGen(attr));
}

Ops.text =    attributeOpAssembled('text');
Ops.height =  attributeOpAssembled('height');
Ops.width =   attributeOpAssembled('width');
Ops.parent =  attributeOpAssembled('parent');

//General CSS Attributes
Ops.cssAttr = function(attr, value) {
    if (typeof attr === 'string' && arguments.length === 1) {
        //get
        return Attr.getCssAttribute(this, attr);
    } else if (typeof attr === 'object') {
        //set
        var ele = this;
        H.each(attr, function(val, key) {
            Attr.setCssAttribute(ele, key, val);
        });
    } else if (arguments.length === 2) {
        Attr.setCssAttribute(this, attr, value);
    }
};

/*
 * Class
 */

module.exports = Ops;