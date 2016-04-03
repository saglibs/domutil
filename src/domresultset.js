var RS = {};

var C = require('coreutil/core');
var ARS = require('coreutil/src/abstractresultset');
var Mini = require('coreutil/mini');

var DomIdentifier = '__isDOM__';

//node.js fallback
var htmlElementObj = function() {};

try {
    htmlElementObj = eval('HTMLElement');
} catch (e) {
    e.printStackTrace("DOM cannot be operated in node.js environment!");
    return;
}

function checker(val) {
    if (val instanceof Array || val instanceof htmlElementObj) {
        return true;
    }
}

ARS.registerChannel(DomIdentifier, [HTMLElement.prototype, Array.prototype], checker);

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

//registerComponent("key", func);

var wrap = ARS.wrapperGen(DomIdentifier);

RS.wrapDom = wrap;

//RS.H$ is a CSS selector processor

module.exports = RS;