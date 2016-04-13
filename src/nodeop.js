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