import test from "ava";
import traverse from "../lib";

test(`traverse(schema, opts)`, t => {
  const schema = {
    type: 'object',
    properties: {
      hoge: {
        type: 'string'
      }
    }
  };
  const actual = [];
  traverse(schema, {
    enter(path) { actual.push('enter') },
    exit(path) { actual.push('exit') },
    string: {
      enter(path) { actual.push('string:enter') },
      exit(path) { actual.push('string:exit') }
    }
  });
  t.deepEqual(['enter', 'string:enter', 'exit', 'string:exit'], actual);
});

