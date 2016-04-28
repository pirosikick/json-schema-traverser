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
  opts = Object.assign({}, opts);
  opts = correctOpt(opts);

  Object.keys(opts)
    .filter(key => !/^(enter|exit)$/.test(key))
    .forEach(key => {
      const value = correctOpt(opts[key]);
      // "object|string": { ... }
      if (/\w\|\w/.test(key)) {
        key.split('|').forEach(key => opts[key] = value);
        delete opts[key];
      } else {
        opts[key] = value;
      }
    });

  return opts;
};

/**
 * function () {} => { enter: function () {} }
 * { enter: 'not function' } => false
 */
function correctOpt(opt) {
  if (typeof opt === 'function') {
    return { enter: opt };
  } else if (typeof opt !== 'object') {
    return {};
  }

  if (typeof opt.enter !== 'function') delete opt.enter;
  if (typeof opt.exit !== 'function') delete opt.exit;
  return opt;
}
