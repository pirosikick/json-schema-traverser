import explode from './explode';
import traverseNode from './traverseNode';

export default function traverse(parent, opts, state) {
  if (typeof opts !== 'object') {
    return;
  }
  opts = explode(opts);
  traverseNode(parent, opts, state);
}
