var RS = {};

var ARS =      require('coreutil/src/abstractresultset');
var Mini =     require('coreutil/mini');
var Selector = require('./cssselector');
var Attr =     require('./attribute');
var Ops =      require('./cssoperators');
var NodeOps =  require('./nodeop');

var DomIdentifier = '__isDOM__';

// var getSingleElement = CssAttr.getSingleElement;

//node.js fallback
var htmlElementObj = function() {};

try {
    htmlElementObj = eval('Element');
} catch (e) {
    e.printStackTrace("DOM cannot be operated in node.js environment!");
    return;
}

function checker(val) {
    if (val instanceof Array || val instanceof htmlElementObj
        || val instanceof NodeList || val instanceof Node) {
        return true;
    }
}

ARS.registerChannel(DomIdentifier, [Element.prototype, Array.prototype, NodeList.prototype, Node.prototype], checker);

function registerComponent(name, func) {
    ARS.registerChannelFunction(DomIdentifier, name, func);
}

/*
 * ResultSet Operations
 *
 * TODO: enable access control from ResultSet impl. (expand preCheck function)
 * for example:
 * ban access from DomResultSet.join
 */
/**
 * Clones a list of nodes or a single node
 * Supports depth up to 1.
 *
 * @memberof {Array|Element}
 */
function cloneDomElement(eles, deep) {
    if (eles instanceof Element) {
        return eles.cloneNode(!!deep);
    }
    if (Mini.isArrayLike(this)) {
        return Mini.arrayEach(eles, function(ele) {
            return cloneDomElement(ele, deep);
        });
    }
}

/**
 * Clones the current ResultSet
 *
 * @param {boolean} [deep] do deep copy or not
 */
function cloneDom(deep) {
    return cloneDomElement(this || [], deep);
}

/**
 * Find elements satisfying the specific selector under the current ResultSet
 *
 * @param {String} selector selector string
 * @returns {Array|NodeList|Element} ResultSet
 */
function find(selector) {
    return Selector.findElement(this, selector);
}

registerComponent("clone",        cloneDom);
registerComponent("css",          Ops.cssAttr);
registerComponent("text",         Ops.text);
registerComponent("attribute",    Attr.attribute);
registerComponent("getClasses",   Attr.getClasses);
registerComponent("addClass",     Attr.addClass);
registerComponent("removeClass",  Attr.removeClass);
registerComponent("append",       NodeOps.append);
registerComponent("prepend",      NodeOps.prepend);
registerComponent("insertHead",   NodeOps.insertHead);
registerComponent("insertTail",   NodeOps.insertTail);
registerComponent("parent",       Ops.parent);
registerComponent("width",        Ops.width);
registerComponent("height",       Ops.height);
registerComponent("find",         find);

var wrap = ARS.wrapperGen(DomIdentifier);

RS.wrapDom = wrap;

//RS.H$ is a CSS selector processor
RS.H$ = Selector;

module.exports = RS;