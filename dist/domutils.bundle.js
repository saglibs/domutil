(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var DOM = require('./src/cssselector');

var Detect = require('coreutil/src/detect');
var RS = require('./src/domresultset');
var Attr = require('./src/cssattribute');

var Core = {};

extend(Core, RS);
extend(Core, Attr);

function extend(baseObject, targetObject) {
    var keys = Object.keys(baseObject) || [];

    for (var i = 0; i < keys.length; i++) {
        targetObject[keys[i]] = baseObject[keys[i]];
    }

    return targetObject;
}

Detect.root.H$ = DOM;

module.exports = DOM;
},{"./src/cssattribute":7,"./src/cssselector":9,"./src/domresultset":10,"coreutil/src/detect":4}],2:[function(require,module,exports){
/*
 * MiniCore module
 *
 * Provides a simplest set of some basic utils.
 * Should be used internally.
 */

var Mini = {};

var MAX_ARRAY_INDEX = Math.pow(2, 53) - 1;
var isArrayLike = function(collection) {
    if (collection === null || collection === undefined) return 0;
    var length = collection['length'];
    return typeof length == 'number' && length >= 0 && length <= MAX_ARRAY_INDEX;
};

/**
 * Check if something is array-like
 *
 * @param collection anything to check
 * @return {boolean}
 * @type {isArrayLike}
 */
Mini.isArrayLike = isArrayLike;

/**
 * Iterates on an array. Fast and should not be used on objects.
 *
 * @param {Array} array
 * @param {Function} iteratee
 * @returns {Array} result map
 */
Mini.arrayEach = function(array, iteratee) {
    var length = array.length;

    if (isArrayLike(array) && length > 0) {
        var result = [];
        var n = length;
        length++;
        while (--length) {
            result[n - length] = iteratee(array[n - length]);
        }
        return result;
    }
};

Mini.hiddenProperty = function(v) {
    return {
        value: v,
        configurable: false,
        enumerable: false,
        writable: true
    };
};

//No <IE9 Compat
Mini.keys = function() {
    if (arguments[0]) {
        return Object.keys(arguments[0]);
    }
    return Object.keys(this);
};

module.exports = Mini;
},{}],3:[function(require,module,exports){
/*
 * ResultSet: Array or Element, they share the same filter/checker
 */

/**
 * Abstract ResultSet Module
 *
 * @static
 * @memberof H
 * @type {Object}
 */
var ARS = {};

var Mini = require('../mini');
var H = require('./shims');

ARS.modules = {};
ARS.checkTargets = {};
ARS.checkers = {};

var MODULE = '__Module__';

/**
 * Register a ResultSet channel
 * @param {String} identifier ResultSet channel identifier
 * @param {Array} targets ResultSet element prototypes, should always contains Array.prototype
 * @param {Function} valuePrechecker value validity prechecker function
 */
ARS.registerChannel = function(identifier, targets, valuePrechecker) {
    ARS.modules[identifier] = {};
    ARS.checkTargets[identifier] = targets;
    ARS.checkers[identifier] = valuePrechecker;

    Mini.arrayEach(targets || [], function(target) {
        if (!target[MODULE]) {
            H.addProperty(target, MODULE, Mini.hiddenProperty(MODULE));
        }
    });
};

/**
 * Register ResultSet process functions.
 *
 * @param {String} channel channel identifier
 * @param {String} name target function mount point
 * @param {Function} func Checker function. This provides ability of checking content validity to target functions.
 */
ARS.registerChannelFunction = function(channel, name, func) {
    /**
     * To avoid lodash internal error. (on Object.prototype)
     * (ResultSet member functions `filter`, `toArray` and so-on conflict with the lodash ver.)
     * @type {*|_.noop}
     */
    func.push = H.noop;
    Mini.arrayEach(ARS.checkTargets[channel] || [], function(target) {
        if (!target[name]) {
            H.addProperty(target, name, Mini.hiddenProperty(func));
        }
    });
};

/**
 * Wrapper function generator.
 *
 * @param {String} identifier channel identifier
 * @returns {wrap} wrapper function to wrap any value into specific ResultSet form
 */
ARS.wrapperGen = function(identifier) {
    //assuming prototype exists
    function transform(obj) {
        if (obj.prototype && obj.prototype.__Module__ && obj.prototype.__Module__ !== identifier) {
            obj.prototype.__Module__ = identifier;
        }
        if (obj.__proto__ && obj.__proto__.__Module__ && obj.__proto__.__Module__ !== identifier) {
            obj.__proto__.__Module__ = identifier;
        }
    }

    function transformArray(obj) {
        if (Mini.isArrayLike(obj) && typeof obj != 'string') {
            Mini.arrayEach(obj, function(son) {
                //if input is a string, will cause infinite loop
                if (son !== obj || typeof obj !== 'object') {
                    transformArray(son);
                }
            });
        }
        transform(obj, identifier);
    }

    /**
     * Wrap an object to ResultSet
     *
     * @static
     * @param {Array|Object} v anything to wrap
     * @returns {*} wrapped ResultSet object
     */
    function wrap(v) {
        transformArray(v);
        return v;
    }

    return wrap;
};

module.exports = ARS;
},{"../mini":2,"./shims":5}],4:[function(require,module,exports){
/*
 * Env Detection Module
 */

var C = {};

C.__isRoot__ = true;

C.__name = '$H';

C.isArrayLike = function(value) {
    if (value == null || value == undefined) {
        return false;
    }
    var length = value["length"];
    var toString = Object.prototype.toString.call(value);
    if (toString == "[object Function]" || toString == "[object GeneratorFunction]") {
        return false;
    }
    if (typeof length == "number") {
        if (length > -1 && length < Number.MAX_VALUE && length % 1 === 0) {
            return true;
        }
    }
    return false;
};

C.isObject = function(value) {
    var toString = Object.prototype.toString.call(value);
    return !!(toString == "[object Function]" || toString == "[object GeneratorFunction]");

};

/**
 * Check if a value can be parsed to an integer
 *
 * @static
 * @memberof H
 * @param {*} i value to be checked
 * @returns {boolean}
 */
C.isInteger = function(i) {
    return  /^-?\d+$/.test(i + "") || /^(-?\d+)e(\d+)$/.test(i + "");
};

/**
 * Checks if a value can be parsed into a float.
 *
 * @static
 * @memberof H
 * @param {*} v value to be checked
 * @returns {boolean}
 */
C.isFloat = function(v) {
    return /^(-?\d+)(\.\d+)?$/.test(v + "") || /^(-?\d+)(\.\d+)?e(-?\d+)$/.test(v + "");
};

var processObj = undefined;

try {
    processObj = eval('process');
} catch (e) {}

/**
 * Flag of is in node.js environment or not.
 *
 * @static
 * @memberof H
 * @type {boolean}
 */
C.isNodejs = 'object' === typeof processObj && Object.prototype.toString.call(processObj) === '[object process]';

C.root = {};

try {
    //noinspection JSUnresolvedVariable
    C.root = GLOBAL;
} catch (e) {
    C.root = window;
}

C.root.__catching = false;

C.__catching = false;

//noinspection JSUnresolvedVariable
// C.root = C.isNodejs ? GLOBAL : window;

//noinspection JSUnresolvedVariable
var root = C.root;

//noinspection JSUnresolvedVariable
root.navigator = root.navigator || {userAgent: ""};

C.root = root;

/**
 * Get IE version.
 * Returns 0 in non-IE environment.
 *
 * @static
 * @memberof H
 * @returns {number}
 */
C.getIE = function() {
    var MSIEs = navigator.userAgent.split('MSIE ')[1] || "0";
    var DNETs = navigator.userAgent.split('rv:')[1] || "0";

    MSIEs = MSIEs.split(".")[0];
    DNETs = DNETs.split(".")[0];

    var msie = ~~MSIEs;
    var dnet = ~~DNETs;

    if (msie != 0) {
        return msie;
    }
    if (dnet != 0) {
        return dnet;
    }

    return 0;
};

/**
 * Check if is in IE or is in a specified version of IE.
 *
 * @static
 * @memberof H
 * @param {Number} [v] version to check
 * @returns {boolean}
 */
C.isIE = function(v) {
    if (v !== undefined) {
        return C.getIE() == v;
    } else {
        return C.getIE() !== 0;
    }
};

/**
 * Flag of is in IE.
 *
 * @static
 * @memberof H
 * @type {boolean}
 */
C.likeIE = !!C.getIE();

/**
 * Flag of is in browsers on iPhone.
 *
 * @static
 * @memberof H
 * @type {boolean}
 */
C.isiPhone = navigator.userAgent.indexOf('iPhone') !== -1;

/**
 * Flag of is in browsers of Lollipop systems
 * @type {boolean}
 */
C.isLollipop = navigator.userAgent.indexOf('Android 5.') !== -1;

//root.hasOwnProperty shims
if (!root.hasOwnProperty) {
    root.hasOwnProperty = function(p) {
        //Note: in IE<9, p cannot be a function (for window)
        return !!root[p];
    };
}

/**
 * Check if canvas drawing is supported in current browser.
 *
 * @static
 * @memberof H
 * @returns {boolean}
 */
C.isCanvasSupported = function () {
    if (C.isNodejs) return false;
    var canvas = document.createElement('canvas');
    return root.hasOwnProperty("__cv") ? root.__cv : root.__cv = !!(canvas.getContext && canvas.getContext('2d'));
};

/**
 * Check if webgl drawing is supported in current browser.
 *
 * @static
 * @memberof H
 * @returns {boolean}
 */
C.isWebGLSupported = function () {
    if (C.isNodejs) return false;
    var canvas = document.createElement('canvas');
    return root.hasOwnProperty("__gl") ? root.__gl : root.__gl = !!(root['WebGLRenderingContext'] && canvas.getContext('webgl'));
};

// C.isCanvasSupported();
// C.isWebGLSupported();

/**
 * Language string
 *
 * @static
 * @memberof H
 * @type {string}
 */
C.language = C.isNodejs ? "" : (navigator.language || navigator['browserLanguage'] || "").toLowerCase();

module.exports = C;

},{}],5:[function(require,module,exports){
var S = {};

var H = require('./detect');
var root = H.root;

var noop = function() {
    return function() {};
};

var navigator = H.root.navigator || {userAgent: ""};

/**
 * Add property to object
 *
 * @static
 * @memberof H
 * @param {Object} object to operate
 * @param {String} key field to fill in
 * @param {Object} descriptor property descriptor
 */
var addProperty = noop();
//defineProperty in IE8 only accepts DOM elements as parameters, while in Safari 5 it's opposite
if (!Object.defineProperty || (0 < H.getIE() <= 8 && navigator.userAgent.indexOf('MSIE') !== -1)) {
    addProperty = function(instance, k, descriptor) {
        instance[k] = descriptor.value;

        if (H.isObject(descriptor[k])) {
            instance[k].ienumerable = !descriptor.enumerable;
        } else {
            if (!instance[k].ienumerables) {
                instance[k].ienumerables = [];
            }
            if (!descriptor.enumerable && instance[k].ienumerables instanceof Array) {
                instance[k].ienumerables.push(k);
            } else if (instance['ienumerables']) {
                instance['ienumerables'][k] = undefined;
                delete instance['ienumerables'][k];
            }
        }

        //configurable, writable to be impl.
    };

    addProperty.__userDefined__ = true;

    if (!Object.defineProperty) Object.defineProperty = addProperty;
} else {
    addProperty = Object.defineProperty;
}

/**
 * Create object and copy all properties into it.
 *
 * @static
 * @memberof H
 * @param {Object} base base class
 * @param {Object} reference object to copy properties from
 * @example
 *
 * var obj = H.createObject(Object.prototype, {a: 1, b: 2})
 */
var createObject = function() {
    function F() {}

    return function(o, p) {
        F.prototype = o;
        var instance = new F();
        if (p) {
            //p is a descriptor with key name k
            //is this enough for replacing H.each(H.keys ?
            for (var k in p) {
                if (p.hasOwnProperty(k)) addProperty(instance, k, p[k]);
            }
        }
        return instance;
    };
}();

//emulate legacy getter/setter API using ES5 APIs
try {
    if (!Object.prototype.__defineGetter__ &&
        addProperty({},"x",{get: function(){return true;}}).x) {
        addProperty(Object.prototype, "__defineGetter__",
            {enumerable: false, configurable: true,
                value: function(name,func)
                {addProperty(this,name,
                    {get:func,enumerable: true,configurable: true});
                }});
        addProperty(Object.prototype, "__defineSetter__",
            {enumerable: false, configurable: true,
                value: function(name,func)
                {addProperty(this,name,
                    {set:func,enumerable: true,configurable: true});
                }});
    }
} catch(defPropException) {/*Do nothing if an exception occurs*/}

// Avoid `console` errors in browsers that lack a console.
(function() {
    var method;
    var noop = function () {};
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeline', 'timelineEnd', 'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = root.console || {};
    if (!root.console) root.console = console;

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
}());

//Polyfill for IE<9
if (!String.prototype.trim) {
    String.prototype.trim = function () {
        return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
    };
}

S.addProperty = addProperty;
S.createObject = createObject;

S.noop = function() {};

module.exports = S;

},{"./detect":4}],6:[function(require,module,exports){
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
 * @param {Array|Element|NodeList|Object} eles ResultSet
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
},{"./funchelper":11}],7:[function(require,module,exports){
/*
 * CSS Attribute Operation Basic
 */
var Attr = {};

var Func = require('./funchelper');
var Vendor = require('./lightvendor');
var Mini = require('coreutil/mini');

Attr.__setVendorProvider = function(v) {
    if (v.compose) {
        Vendor = v;
    }
};

var AttributeMap = {
    'width': ['innerWidth', 'clientWidth'],
    'height': ['innerHeight', 'clientHeight'],
    'parent': ['parentElement', 'parentNode'],
    'text': ['innerText', 'textContent']
};

/**
 * Extracts the only element in a ResultSet if there's only one.
 *
 * @param {Element|NodeList|Array} object ResuleSet to check
 * @returns {*|null} extracted Element object
 */
function getSingleElement(object) {
    if (object instanceof Element) {
        return object;
    }
    var count = 0, vals = [];
    if (Mini.isArrayLike(object)) {
        Mini.arrayEach(object, function(v) {
            if (v instanceof Element) {
                count ++;
                vals.push(v);
            }
        });
        if (count === 1) {
            return vals[0];
        }
    }
    return false;
}

function queryAttrAlias(attr) {
    var c = Vendor.toCamel(attr);
    var f = Vendor.fromCamel(attr);
    var c_alias = Vendor.attrs[c] || [];
    var f_alias = Vendor.attrs[f] || [];
    return c_alias.concat(f_alias).concat([attr]);
}

/*
 * Getters
 */
function directRetrieveAttribute(ele, attr) {
    var mapped = AttributeMap[attr] || [];
    for (var i = 0; i < mapped.length; i++) {
        var ret = ele[mapped[i]];

        if (ret !== undefined) return ret;
    }
}

function innerGetAttribute(ele, attr) {
    return getComputedStyle(ele)[attr];
}

function innerGetDeclaredAttr(ele, attr) {
    return (ele.style || {})[attr];
}

function innerGetAttributeUntil(ele, attr, style) {
    var func = style === 1 ? innerGetAttribute : innerGetDeclaredAttr;
    var direct = directRetrieveAttribute(ele, attr);
    if (direct !== undefined) return direct;
    var attrs = queryAttrAlias(attr);
    for (var i = 0; i < (attrs || []).length; i++) {
        var ret = func(ele, attrs[i]);
        if (ret) return ret;
    }
}

function collectElementsAttributes(eles, attr, style) {
    return Func.createWalker(eles, innerGetAttributeUntil, [eles, attr, style]);
}

/*
 * Setters
 */
//sometimes direct way doesn't work, cuz some shortcut attributes like clientWidth are readonly
function directSetAttribute(ele, attr, val) {
    var mapped = AttributeMap[attr] || [];
    for (var i = 0; i < mapped.length; i++) {
        if (ele[mapped[i]]) {
            ele[mapped[i]] = val;
            return true;
        }
    }
    return false;
}

function innerSetAttribute(ele, attr, val) {
    ele.style[attr] = val;
}

function innerSetAttributeUntil(ele, attr, val) {
    //some attributes are read-only. try but don't believe it
    directSetAttribute(ele, attr, val);
    var attrs = queryAttrAlias(attr) || [];
    for (var i = 0; i < attrs.length; i++) {
        innerSetAttribute(ele, attrs[i], val);
    }
}

/**
 * Walks on ResultSet and set attributes of each to val
 *
 * @param {Element|NodeList|Array|Object} eles ResultSet to check
 * @param {String} attr attribute name
 * @param {String} val attribute value to set
 * @returns {*}
 */
function walkAndSetAttributes(eles, attr, val) {
    return Func.createWalker(eles, innerSetAttributeUntil, [eles, attr, val]);
}

/**
 * Get computed style of a ResultSet
 *
 * @param {Element|NodeList|Array|Object} ele ResultSet to check
 * @param {String} attr attribute name
 */
function getCssAttribute(ele, attr) {
    ele = getSingleElement(ele);
    if (!ele || !attr) {
        return;
    }
    return collectElementsAttributes(ele, attr, 1);
}

//getAttribute and setAttribute is in DOM.Element, do not overwrite it
Attr.getCssAttribute = getCssAttribute;
Attr.getSingleElement = getSingleElement;
Attr.setCssAttribute = walkAndSetAttributes;

module.exports = Attr;
},{"./funchelper":11,"./lightvendor":12,"coreutil/mini":2}],8:[function(require,module,exports){
/*
 * CSS Attributes Operate
 */
var Attr = require('./cssattribute');
var Mini = require('coreutil/mini');

var Func = require('./funchelper');

var Ops = {};

/*
 * Simple Attributes
 */

function attributeGetterGen(attr) {
    return function(ele) {
        return Attr.getCssAttribute(ele, attr);
    };
}

function attributeSetterGen(attr) {
    return function(ele, val) {
        return Attr.setCssAttribute(ele, attr, val);
    };
}

/**
 * Get or set the specific attribute on all elements in the ResultSet
 *
 * @param {String} attr attribute name
 * @returns {*|null}
 */
function attributeOpAssembled(attr) {
    return Func.assembleFunctions(attributeGetterGen(attr), attributeSetterGen(attr), 0);
}

Ops.text =    attributeOpAssembled('text');
Ops.height =  attributeOpAssembled('height');
Ops.width =   attributeOpAssembled('width');
Ops.parent =  attributeOpAssembled('parent');

//General CSS Attributes
Ops.cssAttr = function(attr, value) {
    if (typeof attr === 'string' && arguments.length === 1) {
        //get
        return Attr.getCssAttribute(this, attr);
    } else if (typeof attr === 'object') {
        //set
        var ele = this;
        var key;
        var keys = Mini.keys(attr) || [];
        for (var i = 0; i < keys.length; i++) {
            key = keys[i];
            Attr.setCssAttribute(ele, key, attr[key]);
        }
    } else if (arguments.length === 2) {
        Attr.setCssAttribute(this, attr, value);
    }
};

/*
 * Class
 */

module.exports = Ops;
},{"./cssattribute":7,"./funchelper":11,"coreutil/mini":2}],9:[function(require,module,exports){
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
},{"./domresultset":10,"coreutil/mini":2}],10:[function(require,module,exports){
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
    if (val instanceof Array || val instanceof htmlElementObj || val instanceof NodeList) {
        return true;
    }
}

//, Node.prototype node can be added as event targets, but not css now.
ARS.registerChannel(DomIdentifier, [Element.prototype, Array.prototype, NodeList.prototype], checker);

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
},{"./attribute":6,"./cssoperators":8,"./cssselector":9,"./nodeop":13,"coreutil/mini":2,"coreutil/src/abstractresultset":3}],11:[function(require,module,exports){
var Func = {};
var Mini = require('coreutil/mini');

function assembleFunctions(func1, func2, desiredArgsSize, earlyExitSize) {
    return function() {
        if (arguments.length === earlyExitSize) return;
        var func = arguments.length === desiredArgsSize ? func1 : func2;
        return func.apply(this, [this].concat(Array.prototype.slice.call(arguments)));
    };
}

Func.assembleFunctions = assembleFunctions;

Func.noop = function(v) {
    return v;
};

function copyArray(arr) {
    var ret = [];
    for (var i = 0; i < arr.length; i++) {
        ret[i] = arr[i];
    }
    return ret;
}

function recursivelyDomSomething(elements, collector, initArgs, argProcessor) {
    //eles, ...args
    function gen(eles) {
        var args = arguments;
        if (eles instanceof Element) {
            return collector.apply(eles, args);
        }
        if (Mini.isArrayLike(eles)) {
            var ret = [];
            for (var i = 0; i < eles.length; i++) {
                var ele = eles[i];
                if (ele instanceof Element || Mini.isArrayLike(ele)) {
                    var newArgs = copyArray(args);
                    newArgs[0] = ele;
                    ret[i] = gen.apply(ele, (argProcessor || Func.noop)(newArgs, i));
                }
            }
            return ret;
        }
    }
    return gen.apply(elements, initArgs);
}

Func.createWalker = recursivelyDomSomething;

function arraySplit(arr, ele) {
    var a = [];
    var b = [];
    var e;
    for (var i = 0; i < arr.length; i++) {
        if ((e = arr[i]) != ele) {
            a.push(e);
        } else {
            b.push(e);
        }
    }
    return [a, b];
}

function ensureArrayContains(arr, ele) {
    return arraySplit(arr, ele)[0].concat([ele]);
}

function ensureArrayWithout(arr, ele) {
    return arraySplit(arr, ele)[0];
}

Func.arrayEnsureContains = ensureArrayContains;
Func.arrayEnsureWithout = ensureArrayWithout;

module.exports = Func;
},{"coreutil/mini":2}],12:[function(require,module,exports){
var L = {};

L.toCamel = function(str) {
    return str.replace(/-[a-z]/g, function($1) {
        return $1[1].toUpperCase();
    });
};

L.fromCamel = function(str) {
    return str.replace(/[A-Z]/g, function($1) {
        return '-' + $1.toLowerCase();
    });
};

L.capitalize = function(str) {
    return str[0].toUpperCase() + str.substr(1);
};

L.compose = function(attr) {
    var c = L.toCamel(attr);
    var f = L.fromCamel(attr);
    var ret = [c, f];
    var cC = c;
    if (c && c[0]) {
        cC = L.capitalize(c);
    }
    var available = ["ms", "webkit", "moz", "o"];
    for (var i = 0; i < available.length; i++) {
        ret.push(available[i] + cC);
        ret.push(L.fromCamel(L.capitalize(available[i]) + cC));
    }
    return ret;
};

module.exports = L;
},{}],13:[function(require,module,exports){
var N = {};

var Func = require('./funchelper');
var Mini = require('coreutil/mini');

function insertElementAfter(targetElement, newElement) {
    if (typeof newElement === 'string') {
        return targetElement.insertAdjacentHTML('afterend', newElement);
    }
    if (targetElement.nodeType !== Element.DOCUMENT_NODE) {
        targetElement.parentNode.insertBefore(newElement, targetElement.nextSibling);
    }
}

function insertElementBefore(targetElement, newElement) {
    if (typeof newElement === 'string') {
        return targetElement.insertAdjacentHTML('beforebegin', newElement);
    }
    if (targetElement.nodeType !== Element.DOCUMENT_NODE) {
        targetElement.parentNode.insertBefore(newElement, targetElement);
    }
}

function insertElementAtBeginning(targetElement, newElement) {
    if (typeof newElement === 'string') {
        return targetElement.insertAdjacentHTML('afterbegin', newElement);
    }
    targetElement.insertBefore(newElement, targetElement.firstChild);
}

function insertElementAtEnd(targetElement, newElement) {
    if (typeof targetElement === 'string') {
        return targetElement.insertAdjacentHTML('beforeend', newElement);
    }
    targetElement.appendChild(newElement);
    // targetElement.insertBefore(newElement, targetElement.lastChild);
}

function basePender(strategy) {
    return function(base, newElement) {
        return Func.createWalker(base, strategy, [base, newElement]);
    };
}

var baseAppend = basePender(insertElementAtEnd);
var basePrepend = basePender(insertElementAtBeginning);
var baseInsertHead = basePender(insertElementBefore);
var baseInsertEnd = basePender(insertElementAfter);

//can be abstracted
function pender(basePender) {
    return function(newElements) {
        var base = this;
        if (Mini.isArrayLike(newElements)) {
            Mini.arrayEach(newElements, function(ele) {
                basePender(base, ele);
            });
        } else {
            basePender(base, newElements);
        }
    };
}

var append = pender(baseAppend);
var prepend = pender(basePrepend);
var insertAtHead = pender(baseInsertHead);
var insertAtEnd = pender(baseInsertEnd);

N.append = append;
N.prepend = prepend;
N.insertHead = insertAtHead;
N.insertTail = insertAtEnd;

module.exports = N;
},{"./funchelper":11,"coreutil/mini":2}]},{},[1]);
