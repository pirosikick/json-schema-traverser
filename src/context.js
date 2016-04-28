import NodePath from './path';

export default class Context {
  constructor(opts, state) {
    this.opts = opts;
    this.state = state;
  }

  visit(node, key) {
    const nodes = node[key];
    if (Array.isArray(nodes)) {
      this.visitArray(nodes, node, key);
    } else if (typeof nodes === 'object') {
      this.visitProperties(nodes, node, key);
    } else if (nodes) {
      this.visitSingle(node, key);
    }
  }

  shouldVisit(node) {
    const opts = this.opts;
    if (opts.enter || opts.exit) {
      return true;
    }
    if (opts[nodeType(node)]) {
      return true;
    }
    return false;
  }

  visitSingle(parent, key) {
    const path = new NodePath({
      opts: this.opts,
      parent,
      container: parent,
      node: parent[key],
      key: key,
    });
    path.visit();
  }

  visitArray(container, parent, listKey) {
    container.forEach((node, key) => {
      const path = new NodePath({
        opts: this.opts,
        parent,
        container,
        node,
        key,
        listKey
      });
      path.visit();
    });
  }

  visitProperties(container, parent, listKey) {
    Object.keys(container).forEach(key => {
      const path = new NodePath({
        opts: this.opts,
        parent,
        container,
        node: container[key],
        key,
        listKey
      });
      path.visit();
    });
  }
}
