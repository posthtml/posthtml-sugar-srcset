const Node = require('./Node.js');

class Source extends Node {
  constructor(node, image) {
    super(node, image.options);
    this.image = image;
    this.url = this.src;
  }

  get src() {
    const { sourceSrc } = this.options;

    if (sourceSrc) {
      const src = this.getAttribute('src');
      if (src !== undefined && src !== '')
        return src;
    }

    return this.image.getAttribute('src');
  }

  replaceMedia() {
    const media = this.getAttribute('media');
    const options = this.image.options;
    if (Object.keys(options.replace).indexOf(media) !== -1) {
      this.setAttribute('media', options.replace[media]);
    }
  }
}

module.exports = Source;
