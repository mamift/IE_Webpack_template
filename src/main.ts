// import './bootstrap-sass-2.3.2.2/vendor/assets/stylesheets/bootstrap/bootstrap.scss'
import './scss/style.scss'

import { randomString, moveContent, toggleVisibilityOfThingOnCheckedInputs, randomNumber, loadScript, getMapOfAllRadios } from './ts/functions'
import isJquery from './ts/prototype_jQuery'
import './ts/prototype_Function'
import './ts/prototype_String'
import './ts/keyboardShortcuts'

var isEmpty = "".isNullorEmptyOrWhitespace()
var caseInsensitiveCompare = "test".caseInsensitiveCompare("TEST")

console.log("isEmpty", isEmpty)
console.log("caseInsensitiveCompare", caseInsensitiveCompare)
console.log("format", "this is {0}".format('a test'))
console.log("contains", "'metro' does not contain".contains('my'))
console.log("parseIntFromString", "102 and so on".parseFirstIntFromString())

class objet {
	public name: string

	constructor() {
		this.name = "default"
	}
}

var t = new objet()

console.log(t)
console.log(t.name)



// loadScript('https://use.fontawesome.com/aef4b5f8fc.js')