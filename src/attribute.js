var Func = require('./funchelper');

var Attr = {};

function noop(v) {return v}

/**
 * Get the attribute of the element
 *
 * @param {Element|walkAndGetAttributes} ele element to query
 * @param {String} attr attribute to query
 * @returns {string} attribute value
 */
function innerGetAttribute(ele, attr) {
    return ele.getAttribute(attr);
}

/**
 * Walks and recursively get all Elements' attribute value in the current ResultSet.
 * And returns all results as a ResultSet.
 *
 * @param {Array|Element|NodeList} eles ResultSet
 * @param {String} attr attribute name
 * @param {Function} [postProcess] return value postprocessor
 * @param {*} [addtionalAttr] parameter for `postProcess`
 * @returns {*} ResultSet contains all attributes
 */
function walkAndGetAttributes(eles, attr, postProcess, addtionalAttr) {
    return Func.createWalker(eles, function () {
        return (postProcess || noop)(innerGetAttribute(this, attr), addtionalAttr);
    }, [eles, attr, postProcess, addtionalAttr]);
}

/**
 * Set the attribute of the element
 *
 * @param {Element|walkAndGetAttributes} ele element to operate
 * @param {String} attr attribute to operate
 * @param {String} val attribute value to set
 */
function innerSetAttribute(ele, attr, val) {
    ele.setAttribute(attr, val);
}

/**
 * Walks and recursively set all Elements' attribute values to a constant value in the current ResultSet.
 *
 * @param {Array|Element|NodeList} eles ResultSet
 * @param {String} attr attribute name
 * @param {String} val attribute value to set
 */
function walkAndSetAttributes(eles, attr, val) {
    return Func.createWalker(eles, innerSetAttribute, [eles, attr, val]);
}

/**
 * Walks and recursively set all Elements' attribute values to the corresponding value in the offered ResultSet.
 *
 * @param {Array|Element|NodeList} eles ResultSet
 * @param {String} attr attribute name
 * @param {String} valSet different attribute values stored as a ResultSet
 */
function walkAndSetAttributesBySet(eles, attr, valSet) {
    return Func.createWalker(eles, innerSetAttribute, [eles, attr, valSet], function(args, i) {
        args[2] = args[2][i];
    });
}

/**
 * Get or set attribute of the current ResultSet.
 *
 * @param {String} attribute attribute name
 * @param {String|Array|NodeList|Element} [val] attribute value to set, or the ResultSet of attribute values
 */
Attr.attribute = Func.assembleFunctions(walkAndGetAttributes, walkAndSetAttributes, 1, 0);

function splitClassString(val) {
    return (val || "").trim().split(/[\s]+/) || [];
}

function splitGen(strategy) {
    var func = strategy ? Func.arrayEnsureContains : Func.arrayEnsureWithout;
    return function(val, clzz) {
        return func(splitClassString(val), clzz).join(' ');
    };
}

/**
 * Gather all classes of each Element as a list of string in the current ResultSet.
 *
 * @param {Function} [alternative] alternative class string decorator
 * @param {*} parameter No use
 */
function getClasses(alternative, parameter) {
    return innerGetClass(this, alternative, parameter);
}

/**
 * Gather all classes of each Element in the current Result to lists of string.
 *
 * @param {Array|NodeList|Element|getClasses|classOpGen} ele element to query
 * @param alternative
 * @param parameter
 */
function innerGetClass(ele, alternative, parameter) {
    return walkAndGetAttributes(ele, 'class', alternative || splitClassString, parameter);
}

/**
 * Class attribute operator function.
 * Fetch the full class string of each Element in the current ResultSet, and pass it to an decorator function with a
 * parameter.
 * Mode 1: addClass mode, ensures the specific className will be in the class string
 * Mode 2: removeClass mode, ensures the specific className will not be in the class string
 * And then set the decorated class string back to the elements in the current ResultSet.
 *
 * @param {boolean} strategy Mode strategy. used to switch mode
 * @returns {Function} Class string processor, work as addClass or removeClass
 */
function classOpGen(strategy) {
    return function(className) {
        var clss = innerGetClass(this, splitGen(strategy), className);

        walkAndSetAttributesBySet(this, 'class', clss);
    };
}

Attr.getClasses = getClasses;
Attr.addClass = classOpGen(true);
Attr.removeClass = classOpGen(false);

module.exports = Attr;