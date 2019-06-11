
interface String {
  isNullorEmptyOrWhitespace(): boolean
  caseInsensitiveCompare(otherString: string): boolean
  format(): string
  contains(theString: string): boolean,
  parseFirstIntFromString(): number
}

/**
 * Extension method: tests if a string is null or empty or just whitespace
 * @return {boolean} [description]
 */
String.prototype.isNullorEmptyOrWhitespace = function(): boolean {
  let me: string = this
  // tests if the string is entirely whitespace
  let isAllWhitespace: boolean = (/^[\s]+$/g).test(me)

  return (me == null || me.length == 0) || isAllWhitespace
}

/**
 * Extension method: compares one string against another, using case insensitive comparison
 * @param  {string}  otherString [the current string]
 * @return {boolean}             [true if both strings are the same, ignoring case]
 */
String.prototype.caseInsensitiveCompare = function(otherString: string): boolean {
  let me: string = this

  return (otherString.toLowerCase() == me.toLowerCase())
}

/**
 * Format a string, accepts any number of arguments
 */
String.prototype.format = function(...strings: string[]) {
  let me: string = this
  return me.replace(/{(\d+)}/g, function(match: string, number) {
    return typeof strings[number] != 'undefined' ? strings[number] : match
  })
}

/**
 * Checks if a strings contains another string
 * @param {string} theString [the string to see if its contained in the string]
 */
String.prototype.contains = function(theString: string): boolean {
  let me: string = this
  return (me.indexOf(theString, 0) !== -1)
}

/**
 * Extracts all numeric chars from a string, ignoring the presence or order of any non-numeric characters.
 * @return {number} [description]
 */
String.prototype.parseFirstIntFromString = function(): number {
  let me: string = this

  let numbersOnly = me.replace(/[^\d]+/g, '')

  return parseInt(numbersOnly)
}