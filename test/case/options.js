const assert = require('power-assert');
const options = require('../../lib/options');

describe('Options test', () => {

  it(`{ resolution: { src: false }}`, async () => {
    const opt = options({ resolution: { src: false }});
    assert.deepEqual(opt.resolution, {
      suffix: '@[match]x',
      pixelRatio: [1, 2, 3, 4],
      skip1x: true,
      skip1xSuffix: true,
      srcReplace: 1,

      src: false,
      srcset: true
    });
  });

  it(`{ responsive: { srcset: false }}`, async () => {
    const opt = options({ responsive: { srcset: false }});
    assert.deepEqual(opt.responsive, {
      suffix: '-[match]w',
      width: [],
      srcReplace: -1,

      src: false,
      srcset: false
    });
  });

  it(`{ replace: { foo: 'test' }}`, async () => {
    const opt = options({ replace: { foo: 'test' }});
    assert.deepEqual(opt.replace, { foo: 'test' });
  });

});
