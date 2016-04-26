import test from 'ava';
import nodeType from '../lib/nodeType';

test(`nodeType({ type: '...' })`, t => {
  t.is(nodeType({ type: 'object' }), 'object');
});

test(`nodeType({ anyOf: [...] })`, t => {
  t.is(nodeType({ anyOf: [] }), 'anyOf');
});

test(`nodeType({ allOf: [...] })`, t => {
  t.is(nodeType({ allOf: [] }), 'allOf');
});
