import isJquery from './prototype_jQuery'

declare global {
  interface Window {
    moveContent?: Function
    toggleVisibilityOfThingOnCheckedInputs?: Function
    getMapOfAllRadios?: Function
  }

  interface HTMLScriptElement extends Node {
    [key: string]: any
  }
}

/**
 * Generates a random string
 * @param  {number} length [length of the random string]
 * @return {string} [returns the random string]
 */
export function randomString(length: number): string {
  let text = ''
  let possible = 'abcdefghijklmnopqrstuvwxyz'

  for (let i = 0; i < length; i++) {
    let randomChar = possible.charAt(Math.floor(Math.random() * possible.length))
    text += randomChar
  }

  return text.toLowerCase()
}

/**
 * Generates a random number in between a min and max value
 * @param  {number} min [the minimum value]
 * @param  {number} max [the maximum value]
 * @return {number}     [the random number]
 */
export function randomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * max) + min
}

/**
 * Loads a javascript file dynamically, by appending a <script> tag to the head
 * @param {string}    url            [the URL of the javascript file]
 * @param {Function}         onloader? [the callback to execute when the script loads]
 * @param {any}       optional_attrs [an object to append any optional attributes to the script HTML element]
 */
export function loadScript(url: string, onloader?: (...params: any[]) => any, optional_attrs?: any) {
  let isIE78: boolean = /\bMSIE 7/.test(navigator.userAgent) || /\bMSIE 8/.test(navigator.userAgent)
  let script: HTMLScriptElement = document.createElement('script')
  script.type = 'text/javascript'
  script.src = url

  if (optional_attrs != null) {
    for (let attr in optional_attrs) {
      script.setAttribute(attr, optional_attrs[attr])
    }
  }
  let head = document.getElementsByTagName('head')[0]
  head.appendChild(script)

  if (isIE78) {
    script['onreadystatechange'] = function() {
      let readystate: string = script['readyState']
      // console.log(readystate)
      if (readystate == 'loaded' || readystate == 'complete') {
        // console.log(this)
        onloader()
      }
    }
  } else {
    script['onload'] = onloader
  }

  return script
}

/**
 * Moves DOM content wrapped in a jQuery object into another element (contained in another jQuery object)
 * @param {any}  target
 * @param {any}  destination
 * @param {boolean} show [pass true to show the content after it has been moved]
 */
export function moveContent(target: any, destination: any, show: boolean) {
  if (!isJquery(target)) { target = $(target) }
  if (!isJquery(destination)) { destination = $(destination) }
  if (show === true) { target.showInDom() }

  target.detach()

  target.appendTo(destination)
}

/**
 * Toggles the visibility of a jQuery target when specified inputs trigger the change events
 * @param {jQuery} inputs [the inputs to detect a change event]
 * @param {jQuery} thingToShow [the thing to toggle visibility for]
 * @param {number[]} indecesOfInputsToTriggerChangeEv [pass an array of numbers to limit the change detection to only given inputs]
 * @param {Function} callback [optional callback to execute on the change event: gets passed the thingToShow and the <input> element]
 */
export function toggleVisibilityOfThingOnCheckedInputs(inputs: any, thingToShow: any, indecesOfInputsToTriggerChangeEv: number[], callback?: (_thingToShow: any, _inputEl: any) => void) {
  if (!isJquery(inputs)) inputs = $(inputs)
  if (!isJquery(thingToShow)) thingToShow = $(thingToShow)

  if (inputs.length == 0) throw new Error('Invoking toggleVisibilityOfThingOnCheckedInputs() with unqueryable selector or invalid jQuery object!')
  if (thingToShow.length == 0) throw new Error('Invoking toggleVisibilityOfThingOnCheckedInputs() with unqueryable selector or invalid jQuery object!')

  inputs.each(function(i, e) {
    if (!isJquery(e)) e = $(e)

    if (indecesOfInputsToTriggerChangeEv.indexOf(i) !== -1) {
      // console.log('iterating over ', el)
      e.onChange(function(ev) {
        if (callback != null) {
          callback(thingToShow, e)
        }
        if (e.prop('checked')) {
          // console.log('showInDom')
          thingToShow.showInDom()
        } else {
          // console.log('hideInDom')
          thingToShow.hideInDom()
        }
      })
    } else {
      e.onChange(function(ev) {
        if (e.prop('checked')) thingToShow.hideInDom()
      })
    }
  })
}

/**
 * Returns an object comprising a named-map of all the inputs, grouped by their name attribute
 * @return {Object} [the named input array map]
 */
export function getMapOfAllRadios(containerSelector?: string): Object {
  var nameMap: Object = {}
  var allRadios = containerSelector != null ? $(`${containerSelector} input[type="radio"]`) : $('input[type="radio"]')

  // map them all by name first
  allRadios.each(function(i, e) {
    e = $(e)
    var name = e.attr('name')
    if (nameMap[name] == null) {
      nameMap[name] = [e]
    } else {
      for (var savedName in nameMap) {
        if (name == savedName) {
          nameMap[name].push(e)
        }
      }
    }
  })

  return nameMap
}