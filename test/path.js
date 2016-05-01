import test from 'ava';
import NodePath from '../lib/path';

test('path.visit()', t => {
  t.plan(3 * 4);
  const node = { type: 'object', properties: {} };
  const state = {};
  const callback = function (path, _state) {
    t.is(_state, state);
    t.is(this, state);
    t.is(path.node, node);
  };
  const opts = {
    enter: callback,
    exit: callback,
    object: {
      enter: callback,
      exit: callback
    }
  };
  const path = new NodePath({ node, opts, state });
  path.visit();
});
