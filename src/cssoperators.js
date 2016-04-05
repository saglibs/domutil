/*
 * CSS Attributes Operate
 */
var Attr = require('./cssattribute');
var H = require('coreutil/core');

var Func = require('./funchelper');

var Ops = {};

/*
 * Simple Attributes
 */

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
    return Func.assembleFunctions(attributeGetterGen(attr), attributeSetterGen(attr), 0);
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