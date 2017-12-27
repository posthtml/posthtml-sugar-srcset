const assert = require('power-assert');
const suffix = require('../../lib/suffix');

const { resolutionSuffixPattern, responsiveSuffixPattern } = suffix({
  resolution: { suffix: '@[match]x' },
  responsive: { suffix: '-[match]w' }
});

describe('Suffix RegExp test', () => {
  it('match.', () => {
    const mx = 'image@100x'.match(resolutionSuffixPattern);
    const mw = 'image-100w'.match(responsiveSuffixPattern);
    assert.equal(mx[0], '@100x');
    assert.equal(mw[0], '-100w');
  });

  it('not match.', () => {
    const mx = 'image'.match(resolutionSuffixPattern);
    const mw = 'image'.match(responsiveSuffixPattern);
    assert.equal(mx, null);
    assert.equal(mw, null);
  });

  it('not match. last character match identifier.', () => {
    const mx = 'imagex'.match(resolutionSuffixPattern);
    const mw = 'imagew'.match(responsiveSuffixPattern);
    assert.equal(mx, null);
    assert.equal(mw, null);
  });

  it('not match. [match] is empty.', () => {
    const mx = 'image@x'.match(resolutionSuffixPattern);
    const mw = 'image-w'.match(responsiveSuffixPattern);
    assert.equal(mx, null);
    assert.equal(mw, null);
  });

  it('not match. [match] is other string.', () => {
    const mx = 'image@dummyx'.match(resolutionSuffixPattern);
    const mw = 'image-dummyw'.match(responsiveSuffixPattern);
    assert.equal(mx, null);
    assert.equal(mw, null);
  });

  it('not match. [match] invalid float.', () => {
    const mx = 'image@.e1x'.match(resolutionSuffixPattern);
    const mw = 'image-.e1w'.match(responsiveSuffixPattern);
    assert.equal(mx, null);
    assert.equal(mw, null);
  });

  it('only resolution match. [match] is float value. 1', () => {
    const mx = 'image@1.1x'.match(resolutionSuffixPattern);
    const mw = 'image-1.1w'.match(responsiveSuffixPattern);
    assert.equal(mx[0], '@1.1x');
    assert.equal(mw, null);
  });

  it('only resolution match. [match] is float value. 2', () => {
    const mx = 'image@1.1e+1x'.match(resolutionSuffixPattern);
    const mw = 'image-1.1e+1w'.match(responsiveSuffixPattern);
    assert.equal(mx[0], '@1.1e+1x');
    assert.equal(mw, null);
  });

  it('only resolution match. [match] is float value. 3', () => {
    const mx = 'image@1.1e-1x'.match(resolutionSuffixPattern);
    const mw = 'image-1.1e-1w'.match(responsiveSuffixPattern);
    assert.equal(mx[0], '@1.1e-1x');
    assert.equal(mw[0], '-1w');
  });

  it('only resolution match. [match] is float value. 4', () => {
    const mx = 'image@.1e1x'.match(resolutionSuffixPattern);
    const mw = 'image-.1e1w'.match(responsiveSuffixPattern);
    assert.equal(mx[0], '@.1e1x');
    assert.equal(mw, null);
  });

  it('only resolution match. [match] is float value. 5', () => {
    const mx = 'image@0.e1x'.match(resolutionSuffixPattern);
    const mw = 'image-0.e1w'.match(responsiveSuffixPattern);
    assert.equal(mx[0], '@0.e1x');
    assert.equal(mw, null);
  });
});
