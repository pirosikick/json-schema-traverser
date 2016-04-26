import test from "ava";
import explode from '../lib/explode';

test(`explode({ object () { ... } })`, t => {
  const func = function () {};
  const opts = { object: func };
  t.deepEqual(explode(opts), {
    object: {
      enter: func
    }
  });
});

test(`explode({ 'object|string' () { ... } })`, t => {
  const func = function () {};
  const opts = { 'object|string': func };
  t.deepEqual(explode(opts), {
    object: { enter: func },
    string: { enter: func }
  });
});
