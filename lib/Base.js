// import { s } from '../helper';
import { createTree } from './Tree';
import { VNode } from './VNode';

export class Base extends HTMLElement {
  createdCallback() {
    console.debug('createdCallback');
    this.props = {};
    if (this.componentWillMount) {
      this.componentWillMount();
    }
    this._vnode = this.render();
    if (this._vnode instanceof VNode) {
      this.miniDOM = createTree(this._vnode);
      this.appendChild(this.miniDOM);
    }
  }

  attachProps(key, val) {
    this.props[key] = val;
  }

  attachedCallback() {
    this.componentDidMount && this.componentDidMount();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (this.shouldComponentUpdate && this.shouldComponentUpdate(name, oldValue, newValue)) {
      this.componentWillReceiveProps(name, oldValue, newValue);
      this._render();
    }
  }

  setState(state) {
    this.state = Object.assign({}, this.state, state);
    this._render();
  }

  _render() {
    if (this.ownerDocument.defaultView) {
      this._vnode = this.render();
      if (this._vnode instanceof VNode) {
        const newDOM = createTree(this._vnode);
        this.replaceChild(newDOM, this.firstChild);
      }
    }
  }
}
