import nodeType from './nodeType';

const isFunction = value => typeof value === 'function';

export default class NodePath {
  constructor(node, opts) {
    this.node = node;
    this.nodeType = nodeType(node);
    this.opts = opts;
  }

  visit() {
    this.call('enter');
    this.call('exit');
  }

  call(key) {
    if (isFunction(this.opts[key])) {
      this.opts[key](this.node);
    }
    const type = this.nodeType;
    if (this.opts[type] && isFunction(this.opts[type][key])) {
      this.opts[type][key](this.node);
    }
  }
}
