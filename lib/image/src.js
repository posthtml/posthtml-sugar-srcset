const url = require('url');

const { splitPath } = require('../common');
const share = require('../share');

const { setSrcsetForResolution, setSrcsetForResponsive } = require('../tag/src');

const checkResolution = $$ => {
  const opts = share.get('option');

  setSrcsetForResolution($$);

  if(opts.removeSrc) {
    delete $$.node.attrs['src'];
  } else if(opts.resolution.srcReplace >= 0) {
    if(opts.resolution.skip1xSuffix) {
      $$.urlObj.pathname = $$.filePath.first + $$.filePath.last;
    } else {
      const suffix = opts.resolution.suffix.replace('[match]', opts.resolution.srcReplace);
      $$.urlObj.pathname = $$.filePath.first + suffix + $$.filePath.last;
    }

    $$.node.attrs['src'] = url.format($$.urlObj);
  }
};

const checkResponsive = $$ => {
  const opts = share.get('option');

  setSrcsetForResponsive($$);

  if(opts.responsive.srcReplace < 0)
    return;

  const suffix = opts.responsive.suffix.replace('[match]', opts.responsive.srcReplace);
  $$.urlObj.pathname = $$.filePath.first + suffix + $$.filePath.last;

  $$.node.attrs['src'] = url.format($$.urlObj);
};


module.exports = img => {
  const opts = share.get('option');
  const { resolutionSuffixPattern, responsiveSuffixPattern } = share.get('suffix');

  const src = img.attrs['src'];
  const urlObj = url.parse(src);
  const filePath = splitPath(urlObj.pathname);

  const resolutionMatch = filePath.rawFirst.match(resolutionSuffixPattern);
  const responsiveMath = filePath.rawFirst.match(responsiveSuffixPattern);

  const $$ = {
    node : img,
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
