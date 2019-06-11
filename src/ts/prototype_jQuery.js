"use strict";
exports.__esModule = true;
function isJquery(thing) {
    return (thing instanceof ($ || jQuery));
}
exports.isJquery = isJquery;
/**
 * Natively binds a callback to the onchange event handler, jQuery's built-in .change() does not catch custom dispatched change events
 * @param {Function} callback [the callback to execute]
 */
function nativeOnChange(callback) {
    // console.log('nativeOnChange')
    if (typeof callback !== 'function')
        throw new Error('You need to pass a function.');
    if (this.length == 0)
        throw new Error('Nothing selected to bind a callback to.');
    return this.each(function (i, e) {
        e.onchange = callback;
    });
}
/**
 * Disable a HTML control, like a button.
 * @param {boolean} state [true to disable, false to enable]
 */
function disableFunction(state) {
    return this.each(function () {
        this.disabled = state;
    });
}
/**
 * Toggles visibility of an element, but inspecting and manipulating the CSS
 */
function toggleVisibilityFunction() {
    var hasHiddenClass = this.hasClass('hidden');
    var notDisplaying = this.css('display') == 'none';
    var hidden = this.css('visibility') == 'hidden';
    if (this.length == 0) {
        console.error('Nothing to toggle!');
    }
    if (hasHiddenClass)
        this.removeClass('hidden');
    if (notDisplaying) {
        this.css({ 'display': 'block' });
        if (hidden)
            this.css({ 'visibility': 'visible' });
        return;
    }
    if (!notDisplaying) {
        this.css({ 'display': 'none' });
        if (!hidden)
            this.css({ 'visibility': 'hidden' });
        return;
    }
}
/**
 * Hides an element, setting the 'display' and 'visibility' CSS property
 */
function hideInDomFunction() {
    this.css({ 'display': 'none', 'visibility': 'hidden' });
}
/**
 * Shows an element in the DOM, setting both the 'display' and 'visibility' CSS property
 * @param {string} displayValue [optional, pass a custom value for the 'display' CSS property]
 */
function showInDomFunction(displayValue) {
    if (this.hasClass('hidden'))
        this.removeClass('hidden');
    if (displayValue == null)
        displayValue = 'block';
    this.css({ 'display': displayValue, 'visibility': 'visible' });
}
/**
 *
 */
function getPopover() {
    console.log('getPopover');
}
/**
 * Extend the jQuery prototype
 */
$.fn.extend({
    disable: disableFunction,
    toggleVisibility: toggleVisibilityFunction,
    hideInDom: hideInDomFunction,
    showInDom: showInDomFunction,
    onChange: nativeOnChange,
    getPopover: getPopover
});
exports["default"] = isJquery;
