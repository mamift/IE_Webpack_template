
declare const key: Function

import { loadScript } from './functions'

loadScript('https://cdnjs.cloudflare.com/ajax/libs/keymaster/1.6.1/keymaster.min.js', function() {
  console.log('alt+c - example')

  key('alt+c', function() {
    console.log('hey! this is a keyboard shortcuht')
  })
})