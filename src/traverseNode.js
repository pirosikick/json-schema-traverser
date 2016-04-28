import nodeType from './nodeType';
import Context from './context';

const VISTOR_KEYS = {
  'object': 'properties',
  'anyOf': 'anyOf',
  'allOf': 'allOf',
  'oneOf': 'oneOf'
};

export default function traverseNode(node, opts, state, parentPath) {
  const key = VISTOR_KEYS[nodeType(node)];
  if (key) {
    const ctx = new Context(opts, state, parentPath);
    ctx.visit(node, key);
  }
  return;
}
