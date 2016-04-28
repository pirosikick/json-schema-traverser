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
  opts = correctOpt(opts);
  return Object.keys(opts)
  .filter(key => !/^(enter|exit)$/.test(key))
  .reduce((newOpts, key) => {
    const value = correctOpt(opts[key]);
    if (value.exit || value.enter) {
      key.split('|').filter(k => !!k).forEach(key => {
        newOpts[key] = value;
      });
    }
    return newOpts;
  }, {});
};

/**
 * function () {} => { enter: function () {} }
 * { enter: 'not function' } => {}
 */
function correctOpt(opt) {
  if (typeof opt === 'function') {
    return { enter: opt };
  } else if (typeof opt !== 'object') {
    return {};
  }

  ['enter', 'exit'].forEach(key => {
    if (opt[key] && typeof opt[key] !== 'function') {
      delete opt[key]
    }
  });

  return opt;
}
