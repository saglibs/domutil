var func = this ? Element.prototype.querySelectorAll : document.querySelectorAll;

var RS = require('./domresultset');
var wrap = RS.wrapDom;

/*
 * CSS selector processing module
 */
var $ = function(selector) {
    if (typeof selector === 'string') {
        return wrap(func.apply(this || document, arguments));
    }
};

module.exports = $;