import { VNode } from './VNode';

function isRegistered(vNode) {
  switch (document.createElement(vNode.tagName).constructor) {
    case HTMLElement: return false;
    case HTMLUnknownElement: return undefined;
  }
  return true;
}
export function createElement(tagName, properties) {
  const element = document.createElement(tagName);
  Object.keys(properties).forEach(p => {
    if (p === 'supra') {
    } else if (p.charAt(0) === p.charAt(0).toUpperCase()) {
      element.props[p] = properties[p];
    } else if (p === 'className') {
      element.setAttribute('class', properties[p]);
    } else if (p === 'onClick') {
      element.addEventListener('click', properties[p]);
    } else {
      element.setAttribute(p, properties[p]);
    }
  });
  return element;
}

export function createTree(vNode) {
  if (isRegistered(vNode) === false) {
    document.registerElement(vNode.tagName, vNode.properties.supra);
  }

  const x = createElement(vNode.tagName, vNode.properties);

  vNode.children.forEach(c => {
    if (c instanceof VNode) {
      x.appendChild(createTree(c));
    } else {
      x.appendChild(document.createTextNode(c));
    }
  });
  return x;
}
