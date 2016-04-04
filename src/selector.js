var RS = require('./domresultset');
var wrap = RS.wrapDom;
var Mini = require('coreutil/mini');

/*
 * CSS selector processing module
 */
var $ = function(selector) {

    //if is RS, wrap it
    if (typeof selector !== 'string'
        && (selector instanceof NodeList
        || selector instanceof Element
        || Mini.isArrayLike(selector))) {
        return wrap(selector);
    }

    return wrap(document.querySelectorAll(selector));
};

module.exports = $;