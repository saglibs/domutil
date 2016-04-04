var RS = require('./domresultset');
var wrap = RS.wrapDom;
var Mini = require('coreutil/mini');

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
        return ele.prototype.querySelectorAll(selector);
    }
}

/*
 * CSS selector processing module
 */
var $ = function(selector) {
    return findElement(document, selector);
};

$.findElement = findElement;

module.exports = $;