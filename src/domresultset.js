var RS = {};

var C = require('coreutil/core');
var ARS = require('coreutil/src/abstractresultset');
var Mini = require('coreutil/mini');
var Selector = require('./selector');
var Attr = require('./attribute');

var DomIdentifier = '__isDOM__';

var getSingleElement = Attr.getSingleElement;

//node.js fallback
var htmlElementObj = function() {};

try {
    htmlElementObj = eval('Element');
} catch (e) {
    e.printStackTrace("DOM cannot be operated in node.js environment!");
    return;
}

function checker(val) {
    if (val instanceof Array || val instanceof htmlElementObj) {
        return true;
    }
}

ARS.registerChannel(DomIdentifier, [Element.prototype, Array.prototype], checker);

function registerComponent(name, func) {
    ARS.registerChannelFunction(DomIdentifier, name, function(preCheck) {
        checker = preCheck;
        return func;
    });
}

function wrapFunction(fn) {
    return function() {
        if (checker(arguments[0])) {
            return fn.apply(this, arguments);
        }
    }
}

/*
 * ResultSet Operations
 *
 * TODO: enable access control from ResultSet impl. (expand preCheck function)
 * for example:
 * ban access from DomResultSet.join
 */
function clone() {
    //
}

function css() {
    //
}

function text() {
    //
}

function attribute() {
    //
}

function append() {
    //
}

function prepend() {
    //
}

function parent() {
    if (Mini.isArrayLike(this)) {
        return Mini.arrayEach(this || [], parent);
    }
    if (this instanceof Element) {
        return this.parentElement || this.parentNode;
    }
}

function getWidth() {
    return Attr.getAttribute(this, 'width');
}

function getHeight() {
    //
}

registerComponent("clone",     clone);
registerComponent("css",       css);
registerComponent("text",      text);
registerComponent("attribute", attribute);
registerComponent("append",    append);
registerComponent("prepend",   prepend);
registerComponent("parent",    parent);
registerComponent("getWidth",  getWidth);
registerComponent("getHeight", getHeight);

var wrap = ARS.wrapperGen(DomIdentifier);

RS.wrapDom = wrap;

//RS.H$ is a CSS selector processor
RS.H$ = Selector;

module.exports = RS;