const setSrcsetForResolution = (node, match) => {
  const opts = node.options;
  const url = node.url;

  const srcset = opts.resolution.pixelRatio.filter(ratio => ratio <= match)
    .map(ratio => {
      if (ratio === 1 && opts.resolution.skip1x && node.node.tag === 'img')
        return null;

      const suffix = opts.resolution.suffix.replace('[match]', ratio);

      if (ratio === 1 && opts.resolution.skip1xSuffix) {
        url.suffix('');
      } else {
        url.suffix(suffix);
      }

      return ratio === 1
        ? url.format()
        : url.format() + ` ${ratio}x`;
    })
    .filter(v => v !== null)
    .join(',');

  node.srcset = srcset;
};

const setSrcsetForResponsive = (node, match) => {
  const opts = node.options;
  const url = node.url;

  const widthList = opts.responsive.width.filter(width => width <= match);

  const srcset = widthList.map(width => {
    const suffix = opts.responsive.suffix.replace('[match]', width);
    url.suffix(suffix);
    return url.format() + ` ${width}w`;
  })
    .filter(v => v !== null)
    .join(',');

  node.srcset = srcset;
};

exports.setSrcsetForResolution = setSrcsetForResolution;
exports.setSrcsetForResponsive = setSrcsetForResponsive;
