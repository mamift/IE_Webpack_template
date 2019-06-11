/**
 * ES3 compatible shim for Function.bind
 * @param {Object} oThis [object to bind the function to]
 */
Function.prototype.bind = function (oThis) {
    if (typeof this !== 'function') {
        // closest thing possible to the ECMAScript 5
        // internal IsCallable function
        throw new TypeError('Function.prototype.bind - what is trying to be bound is not callable');
    }
    var aArgs = Array.prototype.slice.call(arguments, 1), functionToBind = this, functionNOP = function () { }, functionBound = function () {
        return functionToBind.apply(this instanceof functionNOP ? this : oThis, aArgs.concat(Array.prototype.slice.call(arguments)));
    };
    if (this.prototype) {
        // Function.prototype doesn't have a prototype property
        functionNOP.prototype = this.prototype;
    }
    functionBound.prototype = new functionNOP();
    return functionBound;
};
