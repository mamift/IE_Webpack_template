/**
 * Extension method: tests if a string is null or empty or just whitespace
 * @return {boolean} [description]
 */
String.prototype.isNullorEmptyOrWhitespace = function () {
    var me = this;
    // tests if the string is entirely whitespace
    var isAllWhitespace = (/^[\s]+$/g).test(me);
    return (me == null || me.length == 0) || isAllWhitespace;
};
/**
 * Extension method: compares one string against another, using case insensitive comparison
 * @param  {string}  otherString [the current string]
 * @return {boolean}             [true if both strings are the same, ignoring case]
 */
String.prototype.caseInsensitiveCompare = function (otherString) {
    var me = this;
    return (otherString.toLowerCase() == me.toLowerCase());
};
/**
 * Format a string, accepts any number of arguments
 */
String.prototype.format = function () {
    var strings = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        strings[_i] = arguments[_i];
    }
    var me = this;
    return me.replace(/{(\d+)}/g, function (match, number) {
        return typeof strings[number] != 'undefined' ? strings[number] : match;
    });
};
/**
 * Checks if a strings contains another string
 * @param {string} theString [the string to see if its contained in the string]
 */
String.prototype.contains = function (theString) {
    var me = this;
    return (me.indexOf(theString, 0) !== -1);
};
/**
 * Extracts all numeric chars from a string, ignoring the presence or order of any non-numeric characters.
 * @return {number} [description]
 */
String.prototype.parseFirstIntFromString = function () {
    var me = this;
    var numbersOnly = me.replace(/[^\d]+/g, '');
    return parseInt(numbersOnly);
};
