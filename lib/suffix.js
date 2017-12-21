module.exports = ({ resolution, responsive }) => {
  /*
   See: https://html.spec.whatwg.org/multipage/embedded-content.html#image-candidate-string

   A width descriptor, consisting of: a space character, a valid non-negative integer giving a number greater than zero representing the width descriptor value, and a U+0077 LATIN SMALL LETTER W character.
   A pixel density descriptor, consisting of: a space character, a valid floating-point number giving a number greater than zero representing the pixel density descriptor value, and a U+0078 LATIN SMALL LETTER X character.
   */
  const resolutionSuffix = resolution.suffix.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&')
    .replace('\\[match\\]', '((?:\\d+)(?:\\.\\d+(?:[eE][+-]?\\d+)?)?|(?:\\.\\d+(?:[eE][+-]?\\d+)?))') + '$';
  const resolutionSuffixPattern = new RegExp(resolutionSuffix);
  const responsiveSuffix = responsive.suffix.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&')
    .replace('\\[match\\]', '(\\d+)') + '$';
  const responsiveSuffixPattern = new RegExp(responsiveSuffix);


  return { resolutionSuffixPattern, responsiveSuffixPattern };
};
