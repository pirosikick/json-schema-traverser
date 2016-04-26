export default function nodeType(node) {
  if (node.anyOf) {
    return 'anyOf';
  }
  if (node.allOf) {
    return 'allOf';
  }
  return node.type;
};
