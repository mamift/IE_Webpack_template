import DOMcreateElement from './JSX'

export default function() {
  var name = 'ok'
  return (<div className={name}>{name}</div>)
}

export const heading = <h1>This is a heading</h1>