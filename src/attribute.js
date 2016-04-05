var Func = require('./funchelper');

var Attr = {};

function noop(v) {return v}

function innerGetAttribute(ele, attr) {
    return ele.getAttribute(attr);
}

function walkAndGetAttributes(eles, attr, postProcess, addtionalAttr) {
    return Func.createWalker(eles, function () {
        return (postProcess || noop)(innerGetAttribute(this, attr), addtionalAttr);
    }, [eles, attr, postProcess, addtionalAttr]);
}

function innerSetAttribute(ele, attr, val) {
    ele.setAttribute(attr, val);
}

function walkAndSetAttributes(eles, attr, val) {
    return Func.createWalker(eles, innerSetAttribute, [eles, attr, val]);
}

function walkAndSetAttributesBySet(eles, attr, valSet) {
    return Func.createWalker(eles, innerSetAttribute, [eles, attr, valSet], function(args, i) {
        args[2] = args[2][i];
    });
}

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

function getClasses(alternative, parameter) {
    return innerGetClass(this, alternative, parameter);
}

function innerGetClass(ele, alternative, parameter) {
    return walkAndGetAttributes(ele, 'class', alternative || splitClassString, parameter);
}

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