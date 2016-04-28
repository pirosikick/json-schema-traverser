import test from "ava";
import explode from '../lib/explode';

test(`explode(opts)`, t => {
  const func1 = function () {};
  const func2 = function () {};
  const opts = {
    enter () {},
    exit () {},
    object: func1,
    'array|string': func2
  };

  const actual = explode(opts);
  t.is(actual.enter, opts.enter);
  t.is(actual.exit, opts.exit);
  t.deepEqual(actual.object, { enter: func1 });
  t.deepEqual(actual.array, { enter: func2 });
  t.deepEqual(actual.string, { enter: func2 });
});

