var Mini = require('coreutil/mini');

var Attr = {};

function noop(v) {return v}

//TODO: this code style apprears for 3 times+, abstract it in the future
function innerGetAttribute(ele, attr) {
    return ele.getAttribute(attr);
}

function walkAndGetAttributes(eles, attr, postProcess, additionalAttr) {
    if (eles instanceof Element) {
        return (postProcess || noop)(innerGetAttribute(eles, attr), additionalAttr);
    }
    if (Mini.isArrayLike(eles)) {
        return Mini.arrayEach(eles, function(ele) {
            if (ele instanceof Element || Mini.isArrayLike(ele)) {
                return walkAndGetAttributes(ele, attr);
            }
        });
    }
}

function innerSetAttribute(ele, attr, val) {
    ele.setAttribute(attr, val);
}

function walkAndSetAttributes(eles, attr, val) {
    if (eles instanceof Element) {
        return innerSetAttribute(eles, attr, val);
    }
    if (Mini.isArrayLike(eles)) {
        return Mini.arrayEach(eles, function(ele) {
            if (ele instanceof Element || Mini.isArrayLike(ele)) {
                return walkAndSetAttributes(ele, attr, val);
            }
        });
    }
}

function walkAndSetAttributesBySet(eles, attr, valSet) {
    if (eles instanceof Element) {
        return innerSetAttribute(eles, attr, valSet);
    }
    if (Mini.isArrayLike(eles)) {
        var ret = [];
        for (var i = 0; i < eles.length; i++) {
            var ele = eles[i];
            var vals = valSet[i];

            if (ele instanceof Element || Mini.isArrayLike(ele)) {
                ret[i] = walkAndSetAttributesBySet(ele, attr, vals);
            }
        }
        return ret;
    }
}

//ele.attribute(attr, [val])
function assembledAttributeGetterSetter() {
    if (arguments.length === 0) return;
    var func = arguments.length === 1 ? walkAndGetAttributes : walkAndSetAttributes;
    return func.apply(this, [this].concat(Array.prototype.slice.call(arguments)));
}

Attr.attribute = assembledAttributeGetterSetter;

function splitClassString(val) {
    return (val || "").trim().split(/[\s]+/) || [];
}

function splitInsertClassString(val, clzz) {
    var clss = splitClassString(val);

    for (var i = 0; i < clss.length; i++) {
        if (clzz == clss[i]) {
            return clss;
        }
    }

    clss.push(clzz);

    return clss.join(' ');
}

function splitRemoveClassString(val, clzz) {
    var clss = splitClassString(val);
    var post = [];

    for (var i = 0; i < clss.length; i++) {
        if (clzz != clss[i]) {
            post.push(clss[i]);
        }
    }

    return post.join(' ');
}

function getClasses(alternative, parameter) {
    return walkAndGetAttributes(this, 'class', alternative || splitClassString, parameter);
}

function addClass(className) {
    var clss = getClasses.apply(this, [splitInsertClassString, className]);

    walkAndSetAttributesBySet(this, "class", clss);
}

function removeClass(className) {
    var clss = getClasses.apply(this, [splitRemoveClassString, className]);

    walkAndSetAttributesBySet(this, "class", clss);
}

Attr.getClasses = getClasses;
Attr.addClass = addClass;
Attr.removeClass = removeClass;

module.exports = Attr;