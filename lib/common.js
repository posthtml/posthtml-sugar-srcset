const path = require('path');

const share = require('./share');

exports.setSizes = img => {
  const opts = share.get('option');

  const sizes = img.attrs['sizes'];
  const keys = Object.keys(opts.replace);

  if(sizes === void 0 || sizes.length === 0) {
    if('defaultSizes' in opts.replace)
      img.attrs['sizes'] = opts.replace.defaultSizes;
  } else if(keys.length > 1) {
    const newSizes = sizes.split(',')
      .map(key => opts.replace[key.replace(/^\s+/g, '')] || key)
      .join(',');

    img.attrs['sizes'] = newSizes;
  }
};

exports.splitPath = pathname => {
  const { resolutionSuffixPattern, responsiveSuffixPattern } = share.get('suffix');

  const firstLength = pathname.length - path.extname(pathname).length;
  const first = pathname.substring(firstLength , 0);

  return {
    rawFirst: first,
    first: first.replace(resolutionSuffixPattern, '').replace(responsiveSuffixPattern, ''),
    last: pathname.substring(firstLength, pathname.length)
  };
};

exports.setSrcset = (node, srcset) => {
  if(srcset !== '')
    node.attrs['srcset'] = srcset;

  const check = node.attrs['srcset'] !== '';

  if(!check) {
    delete node.attrs['srcset'];
    delete node.attrs['sizes'];
  }

  return check;
};

exports.getSourceSrc = (source, imageSrc) => {
  const opts = share.get('option');

  if(opts.sourceSrc) {
    const sourceSrc = source.attrs['src'];
    if(sourceSrc !== void 0 && sourceSrc !== '') {
      return sourceSrc;
    }
  }

  return imageSrc;
};
