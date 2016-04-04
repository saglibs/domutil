var RS = {};

var C = require('coreutil/core');
var ARS = require('coreutil/src/abstractresultset');
var Mini = require('coreutil/mini');
var Selector = require('./cssselector');
var Attr = require('./cssattribute');
var Ops = require('./cssoperators');

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

ARS.registerChannel(DomIdentifier, [Element.prototype, Array.prototype, NodeList.prototype], checker);

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

function attribute() {
    //
}

function append() {
    //
}

function prepend() {
    //
}

function find(selector) {
    return Selector.findElement(this, selector);
}

registerComponent("clone",     clone);
registerComponent("css",       Ops.cssAttr);
registerComponent("text",      Ops.text);
registerComponent("attribute", attribute);
registerComponent("append",    append);
registerComponent("prepend",   prepend);
registerComponent("parent",    Ops.parent);
registerComponent("width",     Ops.width);
registerComponent("height",    Ops.height);
registerComponent("find",      find);

var wrap = ARS.wrapperGen(DomIdentifier);

RS.wrapDom = wrap;

//RS.H$ is a CSS selector processor
RS.H$ = Selector;

module.exports = RS;