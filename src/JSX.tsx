function nonNull(val, fallback) { 
  return Boolean(val) ? val : fallback 
}

function DOMparseChildren(children: object[]) {
  return children.map(child => {
    if(typeof child === 'string') {
      return document.createTextNode(child)
    }
    return child
  })
}

export function DOMparseNode(element, properties, children) {
  const el = document.createElement(element)
  Object.keys(nonNull(properties, {})).forEach(key => {
      el[key] = properties[key]
  })
  DOMparseChildren(children).forEach(child => {
    el.appendChild(child)
  })
  return el
}

export function DOMcreateElement(element: string|object|Function, properties, ...children): HTMLElement {
  if (typeof element === 'function') {
    return element({
      ...nonNull(properties, {}),
      children
    })
  }
  return DOMparseNode(element, properties, children)
}

export default DOMcreateElement