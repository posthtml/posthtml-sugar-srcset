const Node = require('./Node');

class Image extends Node {
  constructor(node, options) {
    super(node, options);
    this.url = this.src;
  }

  searchParent(tree) {
    for (const rootContent of tree) {
      const res = Image.searchContent(this.node, rootContent);
      if (res)
        return res;
    }
    return {};
  }

  fixSrcsetFromSrcOfResolution() {
    super.fixSrcsetFromSrcOfResolution();
    const { resolution } = this.options;

    if (resolution.srcReplace >= 0) {
      const suffix = resolution.skip1xSuffix
        ? ''
        : resolution.suffix.replace('[match]', resolution.srcReplace);
      this.url.suffix(suffix);
      this.setAttribute('src', this.url.format());
    }
  }

  resolutionCallback(ratio) {
    if (ratio === 1 && this.options.resolution.skip1x)
      return null;
    return super.resolutionCallback(ratio);
  }

  fixSrcsetFromSrcOfResponsive() {
    super.fixSrcsetFromSrcOfResponsive();

    const { responsive } = this.options;
    if (responsive.srcReplace < 0)
      return;

    const suffix = responsive.suffix.replace('[match]', responsive.srcReplace);
    this.url.suffix(suffix);
    this.setAttribute('src', this.url.format());
  }

  fixSrcsetFromSrcset() {
    const { responsive } = this.options;
    const srcset = this.srcset = this.getSrcsetFromSrcset();

    if (srcset[srcset.length - 1] === 'x') {
      this.replaceSrcWithResolution();
    } else if (srcset[srcset.length - 1] === 'w' && responsive.srcReplace >= 0) {
      this.replaceSrcWithResponsive();
    }
  }

  replaceSrcWithResolution() {
    const { resolution } = this.options;
    if (resolution.srcReplace < 0)
      return;
    const suffix = resolution.skip1xSuffix
      ? ''
      : resolution.suffix.replace('[match]', resolution.srcReplace);
    this.url.suffix(suffix);
    this.setAttribute('src', this.url.format());
  }

  replaceSrcWithResponsive() {
    const { responsive } = this.options;
    this.replaceSizes();
    this.url.suffix(responsive.suffix.replace('[match]', responsive.srcReplace));
    this.setAttribute('src', this.url.format());
  }
}

Image.searchContent = function(node, tree) {
  if (!Array.isArray(tree.content))
    return tree.content === node ? node : false;
  if (tree.content.includes(node))
    return tree;

  const res = tree.content.map(child => Image.searchContent(node, child)).filter(Boolean);
  return res.length > 0 ? res[0] : false;
};

module.exports = Image;
