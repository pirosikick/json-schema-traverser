import test from 'ava';
import NodePath from '../lib/path';

test('path.visit())', t => {
  t.plan(4);
  const schema = { type: 'object', properties: {} };
  const path = new NodePath(schema, {
    enter(node) { t.is(node, schema); },
    exit(node) { t.is(node, schema); },
    object: {
      enter(node) { t.is(node, schema); },
      exit(node) { t.is(node, schema); }
    }
  });
  path.visit();
});
