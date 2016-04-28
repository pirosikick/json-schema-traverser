import traverseNode from './traverseNode';
import nodeType from './nodeType';

const isFunction = value => typeof value === 'function';

export default class NodePath {
  constructor({
    parentPath,
    parent,
    container,
    node,
    key,
    listKey,
    opts,
    state
  }) {
    this.parentPath = parentPath;
    this.parent = parent;
    this.container = container;
    this.node = node;
    this.key = key;
    this.listKey = listKey;
    this.nodeType = nodeType(node);
    this.opts = opts;
    this.state = state;
  }

  visit() {
    this.call('enter');
    traverseNode(this.node, this.opts, this.state, this);
    this.call('exit');
  }

  call(key) {
    if (isFunction(this.opts[key])) {
      this.opts[key](this);
    }
    const type = this.nodeType;
    if (this.opts[type] && isFunction(this.opts[type][key])) {
      this.opts[type][key](this);
    }
  }
}
