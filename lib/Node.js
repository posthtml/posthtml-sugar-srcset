const ImageURL = require('./ImageURL');
const convertFromIdentifierToSrcset = require('./convertFromIdentifierToSrcset');

class Node {
  constructor(node, options) {
    this.node = node;
    this.options = options;
  }

  get src() {
    return this.getAttribute('src');
  }

  get url() {
    return this.imageUrl;
  }

  set url(src) {
    this.imageUrl = new ImageURL(src, this.options.suffix);
  }

  set srcset(srcset) {
    if (srcset !== '')
      this.setAttribute('srcset', srcset);

    const check = this.getAttribute('srcset') !== '';

    if (!check) {
      this.removeAttribute('srcset');
      this.removeAttribute('sizes');
    }

    if (check && this.url.type === 'responsive') {
      this.replaceSizes();
    }
  }

  getAttribute(name) {
    return this.node.attrs[name];
  }

  setAttribute(name, value) {
    this.node.attrs[name] = value;
  }

  removeAttribute(name) {
    delete this.node.attrs[name];
  }

  hasSrcSet() {
    const srcset = this.getAttribute('srcset');
    return srcset !== undefined;
  }

  replaceSizes() {
    const { replace } = this.options;

    const sizes = this.getAttribute('sizes');
    const keys = Object.keys(replace);

    if (sizes === undefined || sizes.length === 0) {
      if ('defaultSizes' in replace)
        this.setAttribute('sizes', replace.defaultSizes);
    } else if (keys.length > 1) {
      const newSizes = sizes.split(',')
        .map(key => replace[key.replace(/^\s+/g, '')] || key)
        .join(',');

      this.setAttribute('sizes', newSizes);
    }
  }

  fixSrcset() {
    const { resolution, responsive } = this.options;
    if (this.hasSrcSet()) {
      if (resolution.srcset || responsive.srcset)
        this.fixSrcsetFromSrcset();
    } else if (resolution.src || responsive.src) {
      this.fixSrcsetFromSrc();
    }
  }

  fixSrcsetFromSrc() {
    const type = this.url.type;
    if (type && this.options[type].src) {
      if (type === 'resolution') {
        this.fixSrcsetFromSrcOfResolution();
      } else {
        this.fixSrcsetFromSrcOfResponsive();
      }
    }
  }

  fixSrcsetFromSrcOfResolution() {
    this.srcset = this.getSrcsetFromSrc(
      this.options.resolution.pixelRatio,
      this.resolutionCallback
    );
  }

  fixSrcsetFromSrcOfResponsive() {
    this.srcset = this.getSrcsetFromSrc(
      this.options.responsive.width,
      this.responsiveCallback
    );
  }

  getSrcsetFromSrc(targets, fn) {
    const url = this.url;
    const match = url.match;

    return targets.filter(ratio => ratio <= match)
      .map(fn.bind(this))
      .filter(v => v !== null)
      .join(',');
  }

  resolutionCallback(ratio) {
    const { resolution } = this.options;
    const url = this.imageUrl;
    const suffix = resolution.suffix.replace('[match]', ratio);

    ratio === 1 && resolution.skip1xSuffix
      ? url.suffix()
      : url.suffix(suffix);

    return ratio === 1
      ? url.format()
      : url.format() + ' ' + ratio + 'x';
  }

  responsiveCallback(width) {
    const { responsive } = this.options;
    const url = this.imageUrl;

    url.suffix(responsive.suffix.replace('[match]', width));
    return url.format() + ' ' + width + 'w';
  }

  getSrcsetFromSrcset() {
    return this.getAttribute('srcset')
      .split(',')
      .map(convertFromIdentifierToSrcset(this))
      .filter(v => v !== null)
      .join(',');
  }

  fixSrcsetFromSrcset() {
    this.srcset = this.getSrcsetFromSrcset();
  }
}

module.exports = Node;
