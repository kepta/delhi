import { VNode } from './VNode';
//
// function isRegistered(tagName) {
//   switch(document.createElement(tagName).constructor) {
//     case HTMLElement: return false;
//     case HTMLUnknownElement: return undefined;
//   }
//   return true;
// }

export function createElement(tagName, properties) {
  const element = document.createElement(tagName);
  Object.keys(properties).forEach(p => {
    if (p === 'supra') {
    } else if (p.charAt(0) === p.charAt(0).toUpperCase()) {
      element[p] = properties[p];
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
  const x = createElement(vNode.tagName, vNode.properties);
  vNode.children.forEach(c => {
    if (c instanceof VNode) {
      x.appendChild(createTree(c));
    } else if (c instanceof Array) {
      c.forEach(o => x.appendChild(createTree(o)));
    } else {
      x.appendChild(document.createTextNode(c));
    }
  });
  return x;
}

export function diffTree(n, old) {
  if (!n) {
    console.debug("remove", n, old);
    old.parentNode.removeChild(old);
    return;
  }
  if ((n && n._c && n._c.length === 0) || n.length === 0) {
    let fc = old.firstChild;
    while (fc) {
      old.removeChild(fc);
      fc = old.firstChild;
      console.log('removed', old);
    }
    return;
  }
  const children = old.childNodes;
  children.forEach((child, i) => {
    // if ( Array.isArray(n))
    console.log(child);
    const x = diffTree(Array.isArray(n) ? n[i] : n._c[i], child);
  });
}
