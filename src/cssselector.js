var RS = require('./domresultset');
var wrap = RS.wrapDom;
var Mini = require('coreutil/mini');

/**
 * Search elements in the current ResultSet.
 *
 * @param {Array|Element|NodeList} ele ResultSet to check
 * @param {String} selector CSS selector string
 * @returns {*} ResultSet of elements
 */
function findElement(ele, selector) {

    //if is RS, wrap it
    if (typeof selector !== 'string'
        && (selector instanceof NodeList
        || selector instanceof Element
        || Mini.isArrayLike(selector))) {
        return wrap(selector);
    }

    if (ele === document) {
        return wrap(document.querySelectorAll(selector));
    } else if(ele instanceof Element) {
        return wrap(ele.prototype.querySelectorAll(selector));
    }
}

/**
 * CSS selector processing module
 *
 * @param {String} selector CSS selector string
 */
var $ = function(selector) {
    return findElement(document, selector);
};

$.findElement = findElement;

module.exports = $;