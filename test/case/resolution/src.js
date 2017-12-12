const assert = require('power-assert');
const posthtml = require('../../posthtml');

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
    src: false, srcset: true
  }
};

describe('src', () => {

  it(`Basic src pattern. use [case1]`, async () => {
    const html = `<img src="path/to/filename@3x.png">`;
    const correct = `<img src="path/to/filename.png" srcset="path/to/filename@2x.png 2x,path/to/filename@3x.png 3x">`;

    assert.equal(await posthtml(html, case1), correct, `resolution pass`);
  });

  it(`Basic src pattern. use [case2 - resolution.skip1x: false -]`, async () => {
    const html = `<img src="path/to/filename@3x.png">`;
    const correct = `<img src="path/to/filename.png" srcset="path/to/filename.png,path/to/filename@2x.png 2x,path/to/filename@3x.png 3x">`;

    assert.equal(await posthtml(html, case2), correct);
  });

  it(`Basic src pattern. use [case3 - resolution.skip1xSuffix: false -]`, async () => {
    const html = `<img src="path/to/filename@3x.png">`;
    const correct = `<img src="path/to/filename@1x.png" srcset="path/to/filename@2x.png 2x,path/to/filename@3x.png 3x">`;

    assert.equal(await posthtml(html, case3), correct);
  });

  it(`Basic src pattern. use [case4 - case 2 + 3 -]`, async () => {
    const html = `<img src="path/to/filename@3x.png">`;
    const correct = `<img src="path/to/filename@1x.png" srcset="path/to/filename@1x.png,path/to/filename@2x.png 2x,path/to/filename@3x.png 3x">`;

    assert.equal(await posthtml(html, case4), correct);
  });

  it(`Basic src pattern. use [case5 - resolution.srcReplace: -1 -]`, async () => {
    const html = `<img src="path/to/filename@3x.png">`;
    const correct = `<img src="path/to/filename@3x.png" srcset="path/to/filename@2x.png 2x,path/to/filename@3x.png 3x">`;

    assert.equal(await posthtml(html, case5), correct);
  });

  it(`Basic src pattern. use [case6 - resolution: { src: false, srcset: true } -]`, async () => {
    const html = `<img src="path/to/filename@3x.png">`;
    const correct = `<img src="path/to/filename@3x.png">`;

    assert.equal(await posthtml(html, case6), correct);
  });



  it(`Max size smaller than assert.e pixel ratio. use [case1]`, async () => {
    const html = `<img src="path/to/filename@2x.png">`;
    const correct = `<img src="path/to/filename.png" srcset="path/to/filename@2x.png 2x">`;

    assert.equal(await posthtml(html, case1), correct);
  });

  it(`Max size smaller than assert.e pixel ratio. use [case2 - resolution.skip1x: false -]`, async () => {
    const html = `<img src="path/to/filename@2x.png">`;
    const correct = `<img src="path/to/filename.png" srcset="path/to/filename.png,path/to/filename@2x.png 2x">`;

    assert.equal(await posthtml(html, case2), correct);
  });

  it(`Max size larger than assert.e pixel ratio. use [case1]`, async () => {
    const html = `<img src="path/to/filename@5x.png">`;
    const correct = `<img src="path/to/filename.png" srcset="path/to/filename@2x.png 2x,path/to/filename@3x.png 3x,path/to/filename@4x.png 4x">`;

    assert.equal(await posthtml(html, case1), correct);
  });

  it(`Max size larger than assert.e pixel ratio. use [case2 - resolution.skip1x: false -]`, async () => {
    const html = `<img src="path/to/filename@5x.png">`;
    const correct = `<img src="path/to/filename.png" srcset="path/to/filename.png,path/to/filename@2x.png 2x,path/to/filename@3x.png 3x,path/to/filename@4x.png 4x">`;

    assert.equal(await posthtml(html, case2), correct);
  });

  it(`Max size larger than assert.e pixel ratio. use [case4 - case 2 + 3 -]`, async () => {
    const html = `<img src="path/to/filename@5x.png">`;
    const correct = `<img src="path/to/filename@1x.png" srcset="path/to/filename@1x.png,path/to/filename@2x.png 2x,path/to/filename@3x.png 3x,path/to/filename@4x.png 4x">`;

    assert.equal(await posthtml(html, case4), correct);
  });


  it(`Not change. use [case1]`, async () => {
    const html = `<img src="path/to/filename.png">`;
    const correct = `<img src="path/to/filename.png">`;

    assert.equal(await posthtml(html, case1), correct);
  });

});
