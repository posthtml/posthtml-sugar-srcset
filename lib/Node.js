const ImageURL = require('./ImageURL');

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

    return check;
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

}

module.exports = Node;
