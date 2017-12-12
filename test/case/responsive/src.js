const assert = require('power-assert');
const posthtml = require('../../posthtml');

const case1 = {
  responsive: {
    src: true,
    width: [320, 640],
    srcReplace: 320
  }
};

const case2 = {
  responsive: {
    src: true,
    width: [320, 640],
    srcReplace: 640
  }
};

const case3 = {
  responsive: {
    src: true,
    width: [320, 640],
    // srcReplace: -1 // default value
  }
};

const case4 = {
  responsive: {
    // src: false, // default value
    width: [320, 640],
    srcReplace: 640
  }
};

const case5 = {
  responsive: {
    src: true,
    width: [320, 640],
    srcReplace: 320
  },
  replace: { defaultSizes: '(max-width: 700px) 50vw, 700px' }
};

const case6 = {
  responsive: {
    src: true,
    width: [320, 640],
    srcReplace: 320
  },
  replace: { test: '(max-width: 700px) 50vw', test2: '(max-width: 1000px) 80vw', test3: '500px' }
};

const case7 = {
  responsive: {
    src: true,
    width: [320, 640],
    srcReplace: 320
  },
  replace: { defaultSizes: '(max-width: 700px) 50vw, 700px', test: '(max-width: 700px) 50vw', test2: '(max-width: 1000px) 80vw', test3: '500px' }
};

describe('srcset', () => {

  it(`Responsive size. use [case1]`, async () => {
    const html = `<img src="path/to/filename-320w.png">`;
    const correct = `<img src="path/to/filename-320w.png" srcset="path/to/filename-320w.png 320w">`;

    assert.equal(await posthtml(html, case1), correct);
  });

  it(`Responsive size. use [case2 - responsive.srcReplace: 640 -]`, async () => {
    const html = `<img src="path/to/filename-320w.png">`;
    const correct = `<img src="path/to/filename-640w.png" srcset="path/to/filename-320w.png 320w">`;

    assert.equal(await posthtml(html, case2), correct);
  });

  it(`Responsive size. use [case3 - responsive.srcReplace: -1 -]`, async () => {
    const html = `<img src="path/to/filename-320w.png">`;
    const correct = `<img src="path/to/filename-320w.png" srcset="path/to/filename-320w.png 320w">`;

    assert.equal(await posthtml(html, case3), correct);
  });

  it(`Responsive size. use [case4 - responsive: { src: false, srcset: true } -]`, async () => {
    const html = `<img src="path/to/filename-320w.png">`;
    const correct = `<img src="path/to/filename-320w.png">`;

    assert.equal(await posthtml(html, case4), correct);
  });

  it(`Responsive size. use [case5 - replace: { defaultSizes: '(max-width: 700px) 50vw,700px' } -]`, async () => {
    const html = `<img src="path/to/filename-320w.png">`;
    const correct = `<img src="path/to/filename-320w.png" srcset="path/to/filename-320w.png 320w" sizes="(max-width: 700px) 50vw, 700px">`;

    assert.equal(await posthtml(html, case5), correct);
  });

  it(`Responsive size. use [case6 - replace: { test: '(max-width: 700px) 50vw', test2: '(max-width: 1000px) 80vw', test3: '500px' } -]`, async () => {
    const html = `<img src="path/to/filename-320w.png">`;
    const correct = `<img src="path/to/filename-320w.png" srcset="path/to/filename-320w.png 320w">`;

    assert.equal(await posthtml(html, case6), correct);
  });

  it(`Responsive size. use [case7 - case 5 + 6 -]`, async () => {
    const html = `<img src="path/to/filename-320w.png">`;
    const correct = `<img src="path/to/filename-320w.png" srcset="path/to/filename-320w.png 320w" sizes="(max-width: 700px) 50vw, 700px">`;

    assert.equal(await posthtml(html, case7), correct);
  });


  it(`Max check for Responsive size. use [case1]`, async () => {
    const html = `<img src="path/to/filename-640w.png">`;
    const correct = `<img src="path/to/filename-320w.png" srcset="path/to/filename-320w.png 320w,path/to/filename-640w.png 640w">`;

    assert.equal(await posthtml(html, case1), correct);
  });

  it(`Max check for Responsive size. use [case2 - responsive.srcReplace: 640 -]`, async () => {
    const html = `<img src="path/to/filename-640w.png">`;
    const correct = `<img src="path/to/filename-640w.png" srcset="path/to/filename-320w.png 320w,path/to/filename-640w.png 640w">`;

    assert.equal(await posthtml(html, case2), correct);
  });


  it(`Not change sizes. use [case1]`, async () => {
    const html = `<img src="path/to/filename-640w.png" sizes="50vw">`;
    const correct = `<img src="path/to/filename-320w.png" sizes="50vw" srcset="path/to/filename-320w.png 320w,path/to/filename-640w.png 640w">`;

    assert.equal(await posthtml(html, case1), correct);
  });

  it(`Not change sizes. use [case5 - replace: { defaultSizes: '(max-width: 700px) 50vw,700px' } -]`, async () => {
    const html = `<img src="path/to/filename-640w.png" sizes="50vw">`;
    const correct = `<img src="path/to/filename-320w.png" sizes="50vw" srcset="path/to/filename-320w.png 320w,path/to/filename-640w.png 640w">`;

    assert.equal(await posthtml(html, case5), correct);
  });


  it(`Multi sizes. use [case5 - replace: { defaultSizes: '(max-width: 700px) 50vw,700px' } -]`, async () => {
    const html = `<img src="path/to/filename-640w.png" sizes="test, test2, test3">`;
    const correct = `<img src="path/to/filename-320w.png" sizes="test, test2, test3" srcset="path/to/filename-320w.png 320w,path/to/filename-640w.png 640w">`;

    assert.equal(await posthtml(html, case5), correct);
  });

  it(`Multi sizes. use [case6 - replace: { test: '(max-width: 700px) 50vw', test2: '(max-width: 1000px) 80vw', test3: '500px' } -]`, async () => {
    const html = `<img src="path/to/filename-640w.png" sizes="test, test2, test3">`;
    const correct = `<img src="path/to/filename-320w.png" sizes="(max-width: 700px) 50vw,(max-width: 1000px) 80vw,500px" srcset="path/to/filename-320w.png 320w,path/to/filename-640w.png 640w">`;

    assert.equal(await posthtml(html, case6), correct);
  });

  it(`Multi sizes. use [case7 - case 5 + 6 -]`, async () => {
    const html = `<img src="path/to/filename-640w.png" sizes="test, test2, test3">`;
    const correct = `<img src="path/to/filename-320w.png" sizes="(max-width: 700px) 50vw,(max-width: 1000px) 80vw,500px" srcset="path/to/filename-320w.png 320w,path/to/filename-640w.png 640w">`;

    assert.equal(await posthtml(html, case7), correct);
  });

  it(`Mix sizes. use [case7 - case 5 + 6 -]`, async () => {
    const html = `<img src="path/to/filename-640w.png" sizes="test, test2, 1000px">`;
    const correct = `<img src="path/to/filename-320w.png" sizes="(max-width: 700px) 50vw,(max-width: 1000px) 80vw, 1000px" srcset="path/to/filename-320w.png 320w,path/to/filename-640w.png 640w">`;

    assert.equal(await posthtml(html, case7), correct);
  });
});
