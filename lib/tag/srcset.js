const url = require('url');

const { splitPath, setSrcset } = require('../common');
const share = require('../share');

module.exports = (node, src) => {
  const opts = share.get('option');

  const urlObj = url.parse(src);
  const filePath = splitPath(urlObj.pathname);
  const srcset = node.attrs['srcset']
    .split(',')
    .map(replaceSrcsetValue)
    .filter(v => v !== null)
    .join(',');

  setSrcset(node, srcset);

  return {
    urlObj: urlObj,
    filePath: filePath,
    srcset: srcset
  };

  function replaceSrcsetValue(candidate) {
    const match = candidate.replace(/^\s/g, '').match(/^(?:\d+w|(?:\.\d+|\d+(?:\.\d+)?)x)$/);
    if(match === null)
      return candidate;

    const m = match[0];

    if(m === '1x' && opts.resolution.srcset) {
      if(node.tag === 'img' && opts.resolution.skip1x)
        return null;
      if(opts.resolution.skip1xSuffix) {
        urlObj.pathname = filePath.first + filePath.last;
        return url.format(urlObj);
      }
    }

    const candidateValue = m[m.length - 1] === 'x'
      ? opts.resolution.suffix
      : opts.responsive.suffix;

    if( (candidateValue === opts.resolution.suffix && !opts.resolution.srcset)
      || (candidateValue === opts.responsive.suffix && !opts.responsive.srcset) )
      return null;

    const suffixValue = candidateValue.replace('[match]', m.substring(0, m.length - 1));

    urlObj.pathname = filePath.first + suffixValue + filePath.last;

    return m === '1x'
      ? url.format(urlObj)
      : url.format(urlObj) + ' ' + m;
  }
};
