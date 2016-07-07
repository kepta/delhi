export class VNode {
  constructor(t, p, c) {
    this._tagName = t;
    this._prop = p;
    this._c = c;
  }

  set tagName(t) {
    this._tagName = t;
  }

  get tagName() {
    return this._tagName;
  }

  set properties(p) {
    this._prop = p;
  }

  get properties() {
    if (!this._prop) return [];
    return this._prop;
  }

  set children(c) {
    this._c = c;
  }

  get children() {
    if (!this._c) return [];
    return this._c;
  }
}

export function DOMTree(tagName, properties, ...children) {
  return new VNode(tagName, properties, children);
}
