import { VNode } from './VNode';

export function createElement(tagName, properties) {
  const element = document.createElement(tagName);
  Object.keys(properties).forEach(p => {
    if (p.charAt(0) === p.charAt(0).toUpperCase()) {
      element.attachProps(p, properties[p]);
    } else if (p === 'className') {
      element.setAttribute('class', properties[p]);
    } else if (p === 'onClick') {
      element.attachClicks(properties[p]);
    } else {
      element.setAttribute(p, properties[p]);
    }
  });
  return element;
}


export function createTree(vNode) {
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
