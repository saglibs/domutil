/*
 * CSS Attribute Operation Basic
 */
var Attr = {};

var Func = require('./funchelper');
var Vendor = require('./vendor');
var Mini = require('coreutil/mini');

var AttributeMap = {
    'width': ['innerWidth', 'clientWidth'],
    'height': ['innerHeight', 'clientHeight'],
    'parent': ['parentElement', 'parentNode'],
    'text': ['innerText', 'textContent']
};

/**
 * Extracts the only element in a ResultSet if there's only one.
 *
 * @param {Element|NodeList|Array} object ResuleSet to check
 * @returns {*|null} extracted Element object
 */
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
    return Func.createWalker(eles, innerGetAttributeUntil, [eles, attr, style]);
}

/*
 * Setters
 */
//sometimes direct way doesn't work, cuz some shortcut attributes like clientWidth are readonly
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

/**
 * Walks on ResultSet and set attributes of each to val
 *
 * @param {Element|NodeList|Array} eles ResultSet to check
 * @param {String} attr attribute name
 * @param {String} val attribute value to set
 * @returns {*}
 */
function walkAndSetAttributes(eles, attr, val) {
    return Func.createWalker(eles, innerSetAttributeUntil, [eles, attr, val]);
}

/**
 * Get computed style of a ResultSet
 *
 * @param {Element|NodeList|Array} ele ResultSet to check
 * @param {String} attr attribute name
 */
function getCssAttribute(ele, attr) {
    ele = getSingleElement(ele);
    if (!ele || !attr) {
        return;
    }
    return collectElementsAttributes(ele, attr, 1);
}

//getAttribute and setAttribute is in DOM.Element, do not overwrite it
Attr.getCssAttribute = getCssAttribute;
Attr.getSingleElement = getSingleElement;
Attr.setCssAttribute = walkAndSetAttributes;

module.exports = Attr;