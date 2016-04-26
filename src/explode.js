/**
 * { object () {} }
 * => { object: { enter: function () {} }
 *
 * { 'object|string' () {} }
 * => {
 *      object: { enter: function () {} },
 *      string: { enter: function () {} }
 *    }
 */
export default function explode(opts) {
  const newOpts = {};
  Object.keys(opts).forEach(key => {
    let value = opts[key];
    if (typeof value === 'function') {
      value = { enter: value };
    }
    key.split('|').filter(k => !!k).forEach(key => {
      newOpts[key] = value;
    });
  });
  return newOpts;
};
