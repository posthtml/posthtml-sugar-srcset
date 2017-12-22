function convertFromIdentifierToSrcset(node) {
  return function replaceSrcset(candidate) {
    const opts = node.options;
    const url = node.url;
    const trim = candidate.trim();
    const identifier = trim[trim.length - 1];
    const num = Number(trim.slice(0, -1));

    if (identifier !== 'x' && identifier !== 'w') {
      return candidate;
    }

    if (!Number.isFinite(num)) {
      return candidate;
    }

    // Decimals are invalid.
    if (identifier === 'w' && (num % 1 !== 0 || num.toString() + identifier !== trim)) {
      return candidate;
    }

    if (trim === '1x' && opts.resolution.srcset) {
      if (node.node.tag === 'img' && opts.resolution.skip1x)
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
  };
}

module.exports = convertFromIdentifierToSrcset;
