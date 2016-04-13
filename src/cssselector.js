var RS = require('./domresultset');
var wrap = RS.wrapDom;
var Mini = require('coreutil/mini');

/**
 * Search elements in the current ResultSet.
 *
 * @param {Array|Element|NodeList|Node} ele ResultSet to check
 * @param {String|NodeList|Node|Window} selector CSS selector string
 * @returns {*} ResultSet of elements
 */
function findElement(ele, selector) {

    //top element is `html`, not document

    //if selector is RS or window/document, wrap it
    if (typeof selector !== 'string') {
        if (selector === window || selector === document
            || (selector instanceof Node && !(selector instanceof Element))) {
            //css operations not allowed for window, but event operations allowed.
            //TODO: add dom event module, make a splitter and change code here
            return wrap(document.querySelectorAll('html'));
        }
        if (selector instanceof NodeList
            || selector instanceof Element
            || Mini.isArrayLike(selector)) {
            return wrap(selector);
        }
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