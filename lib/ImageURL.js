const url = require('url');
const path = require('path');

class ImageURL {
  constructor(src, suffix) {
    this.src = src;
    this.url = url.parse(src);
    this.parse(suffix);
  }

  get type() {
    return this.matchPattern && this.matchPattern.type;
  }

  get match() {
    return this.matchPattern && this.matchPattern.match;
  }

  suffix(suffix) {
    this.url.pathname = suffix !== undefined
      ? this.first + suffix + this.last
      : this.first + this.last;
  }

  format() {
    return this.url.format(this.url);
  }

  parse({ resolutionSuffixPattern, responsiveSuffixPattern }) {
    const pathname = this.url.pathname;

    const firstLength = pathname.length - path.extname(pathname).length;
    let first = pathname.substring(firstLength , 0);
    this.matchPattern = patternMatch(first, {
      resolution: resolutionSuffixPattern,
      responsive: responsiveSuffixPattern
    });

    if (this.matchPattern) {
      first = first.replace(this.matchPattern.pattern, '');
    }
    this.first = first;
    this.last = pathname.substring(firstLength, pathname.length);
  }
}

function patternMatch(str, patterns) {
  for (const type of Object.keys(patterns)) {
    const pattern = patterns[type];
    const m = str.match(pattern);

    if (m && m[0] !== '') {
      return { match: m[1], pattern, type };
    }
  }

}

module.exports = ImageURL;
