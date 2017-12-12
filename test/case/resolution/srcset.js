const assert = require('power-assert');
const posthtml = require('../../posthtml');
const options = require('../../../lib/options');

const case1 = undefined;

const case2 = {
  resolution: {
    skip1x: false
  }
};

const case3 = {
  resolution: {
    skip1xSuffix: false
  }
};

const case4 = {
  resolution: {
    skip1x: false, skip1xSuffix: false
  }
};

const case5 = {
  resolution: {
    srcReplace: -1
  }
};

const case6 = {
  resolution: {
    skip1xSuffix: false, srcReplace: -1
  }
};

const case7 = {
  resolution: {
    src: true, srcset: false
  }
};


describe('srcset', () => {

  it(`Basic src pattern.(resolution) use [case1]`, async () => {
    const html = `<img src="path/to/filename.png" srcset="1x, 2x, 3x">`;
    const correct = `<img src="path/to/filename.png" srcset="path/to/filename@2x.png 2x,path/to/filename@3x.png 3x">`;

    assert.equal(await posthtml(html, case1), correct);
  });

  it(`Basic src pattern.(resolution) use [case2 - resolution.skip1x: false -]`, async () => {
    const html = `<img src="path/to/filename.png" srcset="1x, 2x, 3x">`;
    const correct = `<img src="path/to/filename.png" srcset="path/to/filename.png,path/to/filename@2x.png 2x,path/to/filename@3x.png 3x">`;

    assert.equal(await posthtml(html, case2), correct);
  });

  it(`Basic src pattern.(resolution) use [case3 - resolution.skip1xSuffix: false -]`, async () => {
    const html = `<img src="path/to/filename.png" srcset="1x, 2x, 3x">`;
    const correct = `<img src="path/to/filename@1x.png" srcset="path/to/filename@2x.png 2x,path/to/filename@3x.png 3x">`;

    assert.equal(await posthtml(html, case3), correct);
  });

  it(`Basic src pattern.(resolution) use [case4 - case 2 + 3 -]`, async () => {
    const html = `<img src="path/to/filename.png" srcset="1x, 2x, 3x">`;
    const correct = `<img src="path/to/filename@1x.png" srcset="path/to/filename@1x.png,path/to/filename@2x.png 2x,path/to/filename@3x.png 3x">`;

    assert.equal(await posthtml(html, case4), correct);
  });

  it(`Basic src pattern.(resolution) use [case5 - resolution.srcReplace: -1 -]`, async () => {
    const html = `<img src="path/to/filename.png" srcset="1x, 2x, 3x">`;
    const correct = `<img src="path/to/filename.png" srcset="path/to/filename@2x.png 2x,path/to/filename@3x.png 3x">`;

    assert.equal(await posthtml(html, case5), correct);
  });

  it(`Basic src pattern.(resolution) use [case6 - case 3 + 5 -]`, async () => {
    const html = `<img src="path/to/filename.png" srcset="1x, 2x, 3x">`;
    const correct = `<img src="path/to/filename.png" srcset="path/to/filename@2x.png 2x,path/to/filename@3x.png 3x">`;

    assert.equal(await posthtml(html, case6), correct);
  });

  it(`Basic src pattern.(resolution) use [case6 - case 3 + 5 -]`, async () => {
    const html = `<img src="path/to/filename.png" srcset="1x, 2x, 3x">`;
    const correct = `<img src="path/to/filename.png" srcset="path/to/filename@2x.png 2x,path/to/filename@3x.png 3x">`;

    assert.equal(await posthtml(html, case6), correct);
  });

  it(`Basic src pattern.(resolution) use [case7 - resolution: { src: true, srcset: false } -]`, async () => {
    const html = `<img src="path/to/filename.png" srcset="1x, 2x, 3x">`;
    const correct = `<img src="path/to/filename.png" srcset="1x, 2x, 3x">`;

    assert.equal(await posthtml(html, case7), correct);
  });


  it(`Src set suffix pattern.(resolution) use [case1]`, async () => {
    const html = `<img src="path/to/filename@2x.png" srcset="1x, 2x, 3x">`;
    const correct = `<img src="path/to/filename.png" srcset="path/to/filename@2x.png 2x,path/to/filename@3x.png 3x">`;

    assert.equal(await posthtml(html, case1), correct);
  });

  it(`Src set suffix pattern.(resolution) use [case2 - resolution.skip1x: false -]`, async () => {
    const html = `<img src="path/to/filename@2x.png" srcset="1x, 2x, 3x">`;
    const correct = `<img src="path/to/filename.png" srcset="path/to/filename.png,path/to/filename@2x.png 2x,path/to/filename@3x.png 3x">`;

    assert.equal(await posthtml(html, case2), correct);
  });

  it(`Src set suffix pattern.(resolution) use [case3 - resolution.skip1xSuffix: false -]`, async () => {
    const html = `<img src="path/to/filename@2x.png" srcset="1x, 2x, 3x">`;
    const correct = `<img src="path/to/filename@1x.png" srcset="path/to/filename@2x.png 2x,path/to/filename@3x.png 3x">`;

    assert.equal(await posthtml(html, case3), correct);
  });

  it(`Src set suffix pattern.(resolution) use [case5 - resolution.srcReplace: -1 -]`, async () => {
    const html = `<img src="path/to/filename@2x.png" srcset="1x, 2x, 3x">`;
    const correct = `<img src="path/to/filename@2x.png" srcset="path/to/filename@2x.png 2x,path/to/filename@3x.png 3x">`;

    assert.equal(await posthtml(html, case5), correct);
  });


  it(`Result empty.(resolution) use [case1]`, async () => {
    const html = `<img src="path/to/filename.png" srcset="path/to/filename@2x.png 2x">`;
    const correct = `<img src="path/to/filename.png" srcset="path/to/filename@2x.png 2x">`;

    assert.equal(await posthtml(html, case1), correct);
  });

  it(`Mixed.(resolution) use [case1]`, async () => {
    const html = `<img src="path/to/filename.png" srcset="path/to/filename@2x.png 2x, 3x">`;
    const correct = `<img src="path/to/filename.png" srcset="path/to/filename@2x.png 2x,path/to/filename@3x.png 3x">`;

    assert.equal(await posthtml(html, case1), correct);
  });

  it(`Mixed.(resolution) use [case7 - resolution: { src: true, srcset: false } -]`, async () => {
    const html = `<img src="path/to/filename.png" srcset="path/to/filename@2x.png 2x, 3x">`;
    const correct = `<img src="path/to/filename.png" srcset="path/to/filename@2x.png 2x">`;

    assert.equal(await posthtml(html, case7), correct);
  });

});
