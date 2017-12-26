function convertFromIdentifierToSrcset(node) {
  return function(candidate) {
    const { options, url } = node;
    const trim = candidate.trim();
    const identifier = trim[trim.length - 1];
    const num = Number(trim.slice(0, -1));

    if (!validIdentifier(identifier) || !validNumber(identifier, num, trim)) {
      return candidate;
    }

    if (trim === '1x' && options.resolution.srcset) {
      if (node.node.tag === 'img' && options.resolution.skip1x)
        return null;
      if (options.resolution.skip1xSuffix) {
        url.suffix();
        return url.format();
      }
    }

    const type = identifier === 'x' ? options.resolution : options.responsive;

    if (!type.srcset)
      return null;

    url.suffix(type.suffix.replace('[match]', num));

    // 1x skippable
    return url.format() + (trim === '1x' ? '' : ' ' + trim);
  };
}

function validIdentifier(identifier) {
  return identifier === 'x' || identifier === 'w';
}

function validNumber(identifier, num, trim) {
  return Number.isFinite(num)
    // Decimals are invalid.
    && !(identifier === 'w' && (!Number.isInteger(num) || num.toString() + identifier !== trim));
}

module.exports = convertFromIdentifierToSrcset;
