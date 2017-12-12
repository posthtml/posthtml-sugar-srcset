const url = require('url');

const { setSizes } = require('../common');
const tagSrcset = require('../tag/srcset');
const share = require('../share');

const replaceResolutionSrc = (img, urlObj, filePath) => {
  const opts = share.get('option');

  if(opts.resolution.srcReplace < 0)
    return;

  if(opts.resolution.skip1xSuffix) {
    urlObj.pathname = filePath.first + filePath.last;
  } else {
    const suffix = opts.resolution.suffix.replace('[match]', opts.resolution.srcReplace);
    urlObj.pathname = filePath.first + suffix + filePath.last;
  }  img.attrs['src'] = url.format(urlObj);
};

const replaceResponsiveSrc = (img, urlObj, filePath) => {
  const opts = share.get('option');

  setSizes(img);
  const suffix = opts.responsive.suffix.replace('[match]', opts.responsive.srcReplace);
  urlObj.pathname = filePath.first + suffix + filePath.last;

  img.attrs['src'] = url.format(urlObj);
};


module.exports = img => {
  const opts = share.get('option');

  const src = img.attrs['src'];
  const { urlObj, filePath, srcset } = tagSrcset(img, src);

  if(opts.removeSrc) {
    delete img.attrs['src'];
  } else if(srcset[srcset.length - 1] === 'x') {
    replaceResolutionSrc(img, urlObj, filePath)
  } else if(srcset[srcset.length - 1] === 'w' && opts.responsive.srcReplace >= 0) {
    replaceResponsiveSrc(img, urlObj, filePath);
  }
};
