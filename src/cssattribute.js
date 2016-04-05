/*
 * CSS Attribute Operation Basic
 */
var Attr = {};

var Vendor = require('./vendor');
var Mini = require('coreutil/mini');

var AttributeMap = {
    'width': ['innerWidth', 'clientWidth'],
    'height': ['innerHeight', 'clientHeight'],
    'parent': ['parentElement', 'parentNode'],
    'text': ['innerText', 'textContent']
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
    return c_alias.concat(f_alias).concat([attr]);
}

/*
 * Getters
 */
function directRetrieveAttribute(ele, attr) {
    var mapped = AttributeMap[attr] || [];
    for (var i = 0; i < mapped.length; i++) {
        var ret = ele[mapped[i]];

        if (ret !== undefined) return ret;
    }
}

function innerGetAttribute(ele, attr) {
    return getComputedStyle(ele)[attr];
}

function innerGetDeclaredAttr(ele, attr) {
    return (ele.style || {})[attr];
}

function innerGetAttributeUntil(ele, attr, style) {
    var func = style === 1 ? innerGetAttribute : innerGetDeclaredAttr;
    var direct = directRetrieveAttribute(ele, attr);
    if (direct !== undefined) return direct;
    var attrs = queryAttrAlias(attr);
    for (var i = 0; i < (attrs || []).length; i++) {
        var ret = func(ele, attrs[i]);
        if (ret) return ret;
    }
}

function collectElementsAttributes(eles, attr, style) {
    if (eles instanceof Element) {
        return innerGetAttributeUntil(eles, attr, style);
    }
    if (Mini.isArrayLike(eles)) {
        return Mini.arrayEach(eles, function(ele) {
            if (ele instanceof Element || Mini.isArrayLike(ele))
                return collectElementsAttributes(ele, attr, style);
        });
    }
}

/*
 * Setters
 */
//direct way doesn't work, cuz shortcut attributes like clientWidth are readonly
function directSetAttribute(ele, attr, val) {
    var mapped = AttributeMap[attr] || [];
    for (var i = 0; i < mapped.length; i++) {
        if (ele[mapped[i]]) {
            ele[mapped[i]] = val;
            return true;
        }
    }
    return false;
}

function innerSetAttribute(ele, attr, val) {
    ele.style[attr] = val;
}

function innerSetAttributeUntil(ele, attr, val) {
    //some attributes are read-only. try but don't believe it
    directSetAttribute(ele, attr, val);
    var attrs = queryAttrAlias(attr) || [];
    for (var i = 0; i < attrs.length; i++) {
        innerSetAttribute(ele, attrs[i], val);
    }
}

function walkAndSetAttributes(eles, attr, val) {
    if (eles instanceof Element) {
        return innerSetAttributeUntil(eles, attr, val);
    }
    if (Mini.isArrayLike(eles)) {
        return Mini.arrayEach(eles, function(ele) {
            if (ele instanceof Element || Mini.isArrayLike(ele)) {
                return walkAndSetAttributes(ele, attr, val);
            }
        });
    }
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
function getCssAttribute(ele, attr) {
    ele = getSingleElement(ele);
    if (!ele || !attr) {
        return;
    }
    return collectElementsAttributes(ele, attr, 1);
}

/**
 * Get declared style (Camel or normal form)
 *
 * @param {Element} ele
 * @param {String} attr
 */
function getStyle(ele, attr) {
    ele = getSingleElement(ele);
    if (!ele || !attr) {
        return;
    }
    return collectElementsAttributes(ele, attr, 2);
}

//getAttribute and setAttribute is in DOM.Element, do not overwrite it
Attr.getCssAttribute = getCssAttribute;
Attr.getStyle = getStyle;
Attr.getSingleElement = getSingleElement;
Attr.setCssAttribute = walkAndSetAttributes;

module.exports = Attr;