const url = require('url');

const { splitPath, getSourceSrc } = require('../common');
const share = require('../share');

const { setSrcsetForResolution, setSrcsetForResponsive } = require('../tag/src');

const checkResolution = $$ => {
  setSrcsetForResolution($$);
  delete $$.node.attrs['src'];
};

const checkResponsive = $$ => {
  setSrcsetForResponsive($$);
  delete $$.node.attrs['src'];
};

module.exports = (source, imageSrc) => {
  const opts = share.get('option');
  const { resolutionSuffixPattern, responsiveSuffixPattern } = share.get('suffix');

  const src = getSourceSrc(source, imageSrc);
  const media = source.attrs['media'];

  if(Object.keys(opts.replace).indexOf(media) !== -1) {
    source.attrs['media'] = opts.replace[media];
  }

  const urlObj = url.parse(src);
  const filePath = splitPath(urlObj.pathname);

  const resolutionMatch = filePath.rawFirst.match(resolutionSuffixPattern);
  const responsiveMath = filePath.rawFirst.match(responsiveSuffixPattern);

  const $$ = {
    node : source,
    urlObj: urlObj,
    filePath: filePath
  };

  if(resolutionMatch !== null) {
    $$.match = resolutionMatch[1];
    if(opts.resolution.src) {
      checkResolution($$);
    }
    return;
  }

  if(responsiveMath !== null && opts.responsive.src) {
    $$.match = responsiveMath[1];
    checkResponsive($$);
  }
};
