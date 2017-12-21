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
    const trim = candidate.trim();
    const identifier = trim[trim.length - 1];
    const num = Number(trim.slice(0, -1));

    if (identifier !== 'x' && identifier !== 'w') {
      return candidate;
    }

    if (Number.isNaN(num)) {
      return candidate;
    }

    // Decimals are invalid.
    if (identifier === 'w' && num % 1 !== 0) {
      return candidate;
    }

    if (trim === '1x' && opts.resolution.srcset) {
      if (node instanceof Image && opts.resolution.skip1x)
        return null;
      if (opts.resolution.skip1xSuffix) {
        url.suffix('');
        return url.format();
      }
    }

    const type = identifier === 'x' ? 'resolution' : 'responsive';

    const candidateValue = opts[type].suffix;

    if (candidateValue === opts[type].suffix && !opts[type].srcset)
      return null;

    const suffix = candidateValue.replace('[match]', num);
    url.suffix(suffix);

    // 1x skippable
    return trim === '1x'
      ? url.format()
      : url.format() + ' ' + trim;
  }
};
