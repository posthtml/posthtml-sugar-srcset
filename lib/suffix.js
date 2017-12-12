const share = require('./share');

module.exports = () => {
  /*
   See: https://html.spec.whatwg.org/multipage/embedded-content.html#image-candidate-string

   A width descriptor, consisting of: a space character, a valid non-negative integer giving a number greater than zero representing the width descriptor value, and a U+0077 LATIN SMALL LETTER W character.
   A pixel density descriptor, consisting of: a space character, a valid floating-point number giving a number greater than zero representing the pixel density descriptor value, and a U+0078 LATIN SMALL LETTER X character.
   */
  const resolutionSuffix = share.get('option').resolution.suffix.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')
      .replace('\\[match\\]', '(\\d+)') + '$';
  const resolutionSuffixPattern = new RegExp(resolutionSuffix);
  const responsiveSuffix = share.get('option').responsive.suffix.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')
      .replace('\\[match\\]', '(\\.\\d+|\\d+(?:\\.\\d+)?)') + '$';
  const responsiveSuffixPattern = new RegExp(responsiveSuffix);


  return {
    resolutionSuffix: resolutionSuffix,
    resolutionSuffixPattern: resolutionSuffixPattern,
    responsiveSuffix: responsiveSuffix,
    responsiveSuffixPattern: responsiveSuffixPattern
  };
};
