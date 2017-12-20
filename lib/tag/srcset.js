const Image = require('../Image');

module.exports = (node) => {
  const opts = node.options;

  const url = node.url;

  const srcset = node.getAttribute('srcset')
    .split(',')
    .map(replaceSrcset)
    .filter(v => v !== null)
    .join(',');

  node.srcset = srcset;

  return srcset;

  function replaceSrcset(candidate) {
    const match = candidate.replace(/^\s/g, '').match(/^(?:\d+[wx])$/);
    if (match === null)
      return candidate;

    const m = match[0];

    if (m === '1x' && opts.resolution.srcset) {
      if (node instanceof Image && opts.resolution.skip1x)
        return null;
      if (opts.resolution.skip1xSuffix) {
        url.suffix('');
        return url.format();
      }
    }

    const type = m[m.length - 1] === 'x'
      ? 'resolution'
      : 'responsive';

    const candidateValue = opts[type].suffix;

    if (candidateValue === opts[type].suffix && !opts[type].srcset)
      return null;

    const suffix = candidateValue.replace('[match]', m.substring(0, m.length - 1));
    url.suffix(suffix);

    return m === '1x'
      ? url.format()
      : url.format() + ' ' + m;
  }
};
