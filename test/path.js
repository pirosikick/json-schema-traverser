import test from 'ava';
import NodePath from '../lib/path';

test('path.visit()', t => {
  t.plan(4);
  const schema = { type: 'object', properties: {} };
  const path = new NodePath(schema, {
    enter(path) { t.is(path.node, schema); },
    exit(path) { t.is(path.node, schema); },
    object: {
      enter(path) { t.is(path.node, schema); },
      exit(path) { t.is(path.node, schema); }
    }
  });
  path.visit();
});

test('check fields of the path', t => {
  t.plan(4);
  const schema = {
    type: 'object',
    properties: {
      hoge: { type: 'string' }
    }
  };
  const path = new NodePath(schema, {
    string(path) {
      t.is(path.parent, schema);
      t.is(path.container, schema.properties);
      t.is(path.key, 'hoge');
      t.is(path.listKey, 'properties');
    }
  });
  path.visit();
});
