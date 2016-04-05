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