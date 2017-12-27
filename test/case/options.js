const assert = require('power-assert');
const options = require('../../lib/options');

describe('Options test', () => {

  it('{ resolution: { src: false }}', () => {
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

  it('{ responsive: { srcset: false }}', () => {
    const opt = options({ responsive: { srcset: false }});
    assert.deepEqual(opt.responsive, {
      suffix: '-[match]w',
      width: [],
      srcReplace: -1,

      src: false,
      srcset: false
    });
  });

  it('{ replace: { foo: \'test\' }}', () => {
    const opt = options({ replace: { foo: 'test' }});
    assert.deepEqual(opt.replace, { foo: 'test' });
  });

  it('{ resolution: false, responsive: false }', () => {
    const opt = options({ resolution: false, responsive: false });
    assert.deepEqual(opt.resolution, {
      src: false,
      srcset: false,
      suffix: '@[match]x',
      pixelRatio: [1, 2, 3, 4],
      skip1x: false,
      skip1xSuffix: false,
      srcReplace: 1,
    });

    assert.deepEqual(opt.responsive, {
      suffix: '-[match]w',
      width: [],
      srcReplace: -1,
      src: false,
      srcset: false
    });
  });

  it('undefined', () => {
    const opt = options();
    delete opt.suffix;
    assert.deepEqual(opt, {
      resolution: {
        src: true,
        srcset: true,

        suffix: '@[match]x',
        pixelRatio: [1, 2, 3, 4],
        skip1x: true,
        skip1xSuffix: true,
        srcReplace: 1,
      },
      responsive: {
        suffix: '-[match]w',
        width: [],
        srcReplace: -1,

        src: false,
        srcset: true
      },
      sourceSrc: true,
      replace: {}
    });
  });
});
