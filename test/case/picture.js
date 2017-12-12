const assert = require('power-assert');
const posthtml = require('../posthtml');
const options = require('../../lib/options');

const case1 = options();

const case2 = options({
  replace: {
    large: '(min-width: 1000px)',
    medium: '(min-width: 800px)'
  }
});

const case3 = options({
  sourceSrc: false
});

const case4 = options({
  replace: {
    large: '(min-width: 1000px)',
    medium: '(min-width: 800px)'
  },
  sourceSrc: false
});

const case5 = options({
  responsive: { srcReplace: 320 }
});

const case6 = options({
  responsive: { src: true }
});

const case7 = options({
  responsive: {
    src: true,
    width: [320, 640, 900]
  },
});

const case8 = options({
  responsive: {
    src: true,
    width: [320, 640, 900],
  },
  replace: {
    large: '(min-width: 1000px)',
    medium: '(min-width: 800px)'
  }
});

describe('picture', () => {

  it(`No:1. Resolution check. use [case1] `, async () => {
    const html = `
<picture>
  <source src="path/to/filename-large.png" media="large" srcset="1x, 2x, 3x">
  <source src="path/to/filename-medium.png" media="medium" srcset="1x, 2x, 3x">
  <img src="path/to/filename-small.png" srcset="1x, 2x, 3x" alt="">
</picture>`;

    const correct = `
<picture>
  <source media="large" srcset="path/to/filename-large.png,path/to/filename-large@2x.png 2x,path/to/filename-large@3x.png 3x">
  <source media="medium" srcset="path/to/filename-medium.png,path/to/filename-medium@2x.png 2x,path/to/filename-medium@3x.png 3x">
  <img src="path/to/filename-small.png" srcset="path/to/filename-small@2x.png 2x,path/to/filename-small@3x.png 3x" alt="">
</picture>`;

    assert.equal(await posthtml(html, case1), correct);
  });

  it(`No:2. Resolution check. use [case2 - replace: { large: '(min-width: 1000px)', medium: '(min-width: 800px)' } -] `, async () => {
    const html = `
<picture>
  <source src="path/to/filename-large.png" media="large" srcset="1x, 2x, 3x">
  <source src="path/to/filename-medium.png" media="medium" srcset="1x, 2x, 3x">
  <img src="path/to/filename-small.png" srcset="1x, 2x, 3x" alt="">
</picture>`;

    const correct = `
<picture>
  <source media="(min-width: 1000px)" srcset="path/to/filename-large.png,path/to/filename-large@2x.png 2x,path/to/filename-large@3x.png 3x">
  <source media="(min-width: 800px)" srcset="path/to/filename-medium.png,path/to/filename-medium@2x.png 2x,path/to/filename-medium@3x.png 3x">
  <img src="path/to/filename-small.png" srcset="path/to/filename-small@2x.png 2x,path/to/filename-small@3x.png 3x" alt="">
</picture>`;

    assert.equal(await posthtml(html, case2), correct);
  });

  it(`No:3. Resolution check. use [case3 - sourceSrc: false -] `, async () => {
    const html = `
<picture>
  <source src="path/to/filename-large.png" media="large" srcset="1x, 2x, 3x">
  <source src="path/to/filename-medium.png" media="medium" srcset="1x, 2x, 3x">
  <img src="path/to/filename-small.png" srcset="1x, 2x, 3x" alt="">
</picture>`;

    const correct = `
<picture>
  <source media="large" srcset="path/to/filename-small.png,path/to/filename-small@2x.png 2x,path/to/filename-small@3x.png 3x">
  <source media="medium" srcset="path/to/filename-small.png,path/to/filename-small@2x.png 2x,path/to/filename-small@3x.png 3x">
  <img src="path/to/filename-small.png" srcset="path/to/filename-small@2x.png 2x,path/to/filename-small@3x.png 3x" alt="">
</picture>`;

    assert.equal(await posthtml(html, case3), correct);
  });

  it(`No:4. Resolution check. use [case4 - case 2 + 3 -] `, async () => {
    const html = `
<picture>
  <source src="path/to/filename-large.png" media="large" srcset="1x, 2x, 3x">
  <source src="path/to/filename-medium.png" media="medium" srcset="1x, 2x, 3x">
  <img src="path/to/filename-small.png" srcset="1x, 2x, 3x" alt="">
</picture>`;

    const correct = `
<picture>
  <source media="(min-width: 1000px)" srcset="path/to/filename-small.png,path/to/filename-small@2x.png 2x,path/to/filename-small@3x.png 3x">
  <source media="(min-width: 800px)" srcset="path/to/filename-small.png,path/to/filename-small@2x.png 2x,path/to/filename-small@3x.png 3x">
  <img src="path/to/filename-small.png" srcset="path/to/filename-small@2x.png 2x,path/to/filename-small@3x.png 3x" alt="">
</picture>`;

    assert.equal(await posthtml(html, case4), correct);
  });


  it(`No:5. Resolution check. No src. use [case1] `, async () => {
    const html = `
<picture>
  <source media="large" srcset="1x, 2x, 3x">
  <source media="medium" srcset="1x, 2x, 3x">
  <img src="path/to/filename-small.png" srcset="1x, 2x, 3x" alt="">
</picture>`;

    const correct = `
<picture>
  <source media="large" srcset="path/to/filename-small.png,path/to/filename-small@2x.png 2x,path/to/filename-small@3x.png 3x">
  <source media="medium" srcset="path/to/filename-small.png,path/to/filename-small@2x.png 2x,path/to/filename-small@3x.png 3x">
  <img src="path/to/filename-small.png" srcset="path/to/filename-small@2x.png 2x,path/to/filename-small@3x.png 3x" alt="">
</picture>`;

    assert.equal(await posthtml(html, case1), correct);
  });

  it(`No:6. Resolution check. No src. use [case2 - replace: { large: '(min-width: 1000px)', medium: '(min-width: 800px)' } -] `, async () => {
    const html = `
<picture>
  <source media="large" srcset="1x, 2x, 3x">
  <source media="medium" srcset="1x, 2x, 3x">
  <img src="path/to/filename-small.png" srcset="1x, 2x, 3x" alt="">
</picture>`;

    const correct = `
<picture>
  <source media="(min-width: 1000px)" srcset="path/to/filename-small.png,path/to/filename-small@2x.png 2x,path/to/filename-small@3x.png 3x">
  <source media="(min-width: 800px)" srcset="path/to/filename-small.png,path/to/filename-small@2x.png 2x,path/to/filename-small@3x.png 3x">
  <img src="path/to/filename-small.png" srcset="path/to/filename-small@2x.png 2x,path/to/filename-small@3x.png 3x" alt="">
</picture>`;

    assert.equal(await posthtml(html, case2), correct);
  });

  it(`No:7. Resolution check. No src. use [case3 - sourceSrc: false -] `, async () => {
    const html = `
<picture>
  <source media="large" srcset="1x, 2x, 3x">
  <source media="medium" srcset="1x, 2x, 3x">
  <img src="path/to/filename-small.png" srcset="1x, 2x, 3x" alt="">
</picture>`;

    const correct = `
<picture>
  <source media="large" srcset="path/to/filename-small.png,path/to/filename-small@2x.png 2x,path/to/filename-small@3x.png 3x">
  <source media="medium" srcset="path/to/filename-small.png,path/to/filename-small@2x.png 2x,path/to/filename-small@3x.png 3x">
  <img src="path/to/filename-small.png" srcset="path/to/filename-small@2x.png 2x,path/to/filename-small@3x.png 3x" alt="">
</picture>`;

    assert.equal(await posthtml(html, case3), correct);
  });

  it(`No:8. Resolution check. No src. use [case4 - case 2 + 3 -] `, async () => {
    const html = `
<picture>
  <source media="large" srcset="1x, 2x, 3x">
  <source media="medium" srcset="1x, 2x, 3x">
  <img src="path/to/filename-small.png" srcset="1x, 2x, 3x" alt="">
</picture>`;

    const correct = `
<picture>
  <source media="(min-width: 1000px)" srcset="path/to/filename-small.png,path/to/filename-small@2x.png 2x,path/to/filename-small@3x.png 3x">
  <source media="(min-width: 800px)" srcset="path/to/filename-small.png,path/to/filename-small@2x.png 2x,path/to/filename-small@3x.png 3x">
  <img src="path/to/filename-small.png" srcset="path/to/filename-small@2x.png 2x,path/to/filename-small@3x.png 3x" alt="">
</picture>`;

    assert.equal(await posthtml(html, case4), correct);
  });

  it(`No:9. Resolution check. extend. use [case1] `, async () => {
    const html = `
<picture>
  <source src="path/to/filename-large@3x.png" media="large">
  <source src="path/to/filename-medium@3x.png" media="medium">
  <img src="path/to/filename-small@3x.png" alt="">
</picture>`;

    const correct = `
<picture>
  <source media="large" srcset="path/to/filename-large.png,path/to/filename-large@2x.png 2x,path/to/filename-large@3x.png 3x">
  <source media="medium" srcset="path/to/filename-medium.png,path/to/filename-medium@2x.png 2x,path/to/filename-medium@3x.png 3x">
  <img src="path/to/filename-small.png" alt="" srcset="path/to/filename-small@2x.png 2x,path/to/filename-small@3x.png 3x">
</picture>`;

    assert.equal(await posthtml(html, case1), correct);
  });


  it(`No:10. Responsive check. use [case1] `, async () => {
    const html = `
<picture>
  <source src="path/to/filename-large.png" media="large" srcset="320w, 640w, 900w">
  <source src="path/to/filename-medium.png" media="medium" srcset="320w, 640w, 900w">
  <img src="path/to/filename-small.png" srcset="320w, 640w, 900w" alt="">
</picture>`;

    const correct = `
<picture>
  <source media="large" srcset="path/to/filename-large-320w.png 320w,path/to/filename-large-640w.png 640w,path/to/filename-large-900w.png 900w">
  <source media="medium" srcset="path/to/filename-medium-320w.png 320w,path/to/filename-medium-640w.png 640w,path/to/filename-medium-900w.png 900w">
  <img src="path/to/filename-small.png" srcset="path/to/filename-small-320w.png 320w,path/to/filename-small-640w.png 640w,path/to/filename-small-900w.png 900w" alt="">
</picture>`;

    assert.equal(await posthtml(html, case1), correct);
  });

  it(`No:11. Responsive check. use [case2 - replace: { large: '(min-width: 1000px)', medium: '(min-width: 800px)' } -] `, async () => {
    const html = `
<picture>
  <source src="path/to/filename-large.png" media="large" srcset="320w, 640w, 900w">
  <source src="path/to/filename-medium.png" media="medium" srcset="320w, 640w, 900w">
  <img src="path/to/filename-small.png" srcset="320w, 640w, 900w" alt="">
</picture>`;

    const correct = `
<picture>
  <source media="(min-width: 1000px)" srcset="path/to/filename-large-320w.png 320w,path/to/filename-large-640w.png 640w,path/to/filename-large-900w.png 900w">
  <source media="(min-width: 800px)" srcset="path/to/filename-medium-320w.png 320w,path/to/filename-medium-640w.png 640w,path/to/filename-medium-900w.png 900w">
  <img src="path/to/filename-small.png" srcset="path/to/filename-small-320w.png 320w,path/to/filename-small-640w.png 640w,path/to/filename-small-900w.png 900w" alt="">
</picture>`;

    assert.equal(await posthtml(html, case2), correct);
  });

  it(`No:12. Responsive check. use [case5 - responsiveSrcReplace: 320 -] `, async () => {
    const html = `
<picture>
  <source src="path/to/filename-large.png" media="large" srcset="320w, 640w, 900w">
  <source src="path/to/filename-medium.png" media="medium" srcset="320w, 640w, 900w">
  <img src="path/to/filename-small.png" srcset="320w, 640w, 900w" alt="">
</picture>`;

    const correct = `
<picture>
  <source media="large" srcset="path/to/filename-large-320w.png 320w,path/to/filename-large-640w.png 640w,path/to/filename-large-900w.png 900w">
  <source media="medium" srcset="path/to/filename-medium-320w.png 320w,path/to/filename-medium-640w.png 640w,path/to/filename-medium-900w.png 900w">
  <img src="path/to/filename-small-320w.png" srcset="path/to/filename-small-320w.png 320w,path/to/filename-small-640w.png 640w,path/to/filename-small-900w.png 900w" alt="">
</picture>`;

    assert.equal(await posthtml(html, case5), correct);
  });

  it(`No:13. Responsive check. No src. use [case1] `, async () => {
    const html = `
<picture>
  <source media="large" srcset="320w, 640w, 900w">
  <source media="medium" srcset="320w, 640w, 900w">
  <img src="path/to/filename-small.png" srcset="320w, 640w, 900w" alt="">
</picture>`;

    const correct = `
<picture>
  <source media="large" srcset="path/to/filename-small-320w.png 320w,path/to/filename-small-640w.png 640w,path/to/filename-small-900w.png 900w">
  <source media="medium" srcset="path/to/filename-small-320w.png 320w,path/to/filename-small-640w.png 640w,path/to/filename-small-900w.png 900w">
  <img src="path/to/filename-small.png" srcset="path/to/filename-small-320w.png 320w,path/to/filename-small-640w.png 640w,path/to/filename-small-900w.png 900w" alt="">
</picture>`;

    assert.equal(await posthtml(html, case1), correct);
  });

  it(`No:14. Responsive check. No src. use [case5 - responsiveSrcReplace: 320 -] `, async () => {
    const html = `
<picture>
  <source media="large" srcset="320w, 640w, 900w">
  <source media="medium" srcset="320w, 640w, 900w">
  <img src="path/to/filename-small.png" srcset="320w, 640w, 900w" alt="">
</picture>`;

    const correct = `
<picture>
  <source media="large" srcset="path/to/filename-small-320w.png 320w,path/to/filename-small-640w.png 640w,path/to/filename-small-900w.png 900w">
  <source media="medium" srcset="path/to/filename-small-320w.png 320w,path/to/filename-small-640w.png 640w,path/to/filename-small-900w.png 900w">
  <img src="path/to/filename-small-320w.png" srcset="path/to/filename-small-320w.png 320w,path/to/filename-small-640w.png 640w,path/to/filename-small-900w.png 900w" alt="">
</picture>`;

    assert.equal(await posthtml(html, case5), correct);
  });

  it(`No:15. Responsive check. extend. use [case1] `, async () => {
    const html = `
<picture>
  <source src="path/to/filename-large-640w.png" media="large">
  <source src="path/to/filename-medium-640w.png" media="medium">
  <img src="path/to/filename-small-640w.png" alt="">
</picture>`;

    const correct = `
<picture>
  <source src="path/to/filename-large-640w.png" media="large">
  <source src="path/to/filename-medium-640w.png" media="medium">
  <img src="path/to/filename-small-640w.png" alt="">
</picture>`;

    assert.equal(await posthtml(html, case1), correct);
  });

  it(`No:16. Responsive check. extend. use [case6 - responsive: true -] `, async () => {
    const html = `
<picture>
  <source src="path/to/filename-large-640w.png" media="large">
  <source src="path/to/filename-medium-640w.png" media="medium">
  <img src="path/to/filename-small-640w.png" alt="">
</picture>`;

    const correct = `
<picture>
  <source media="large">
  <source media="medium">
  <img src="path/to/filename-small-640w.png" alt="">
</picture>`;

    assert.equal(await posthtml(html, case6), correct);
  });

  it(`No:17. Responsive check. extend. use [case7 - responsive: true, responsiveWidth: [320, 640, 900] -] `, async () => {
    const html = `
<picture>
  <source src="path/to/filename-large-640w.png" media="large">
  <source src="path/to/filename-medium-640w.png" media="medium">
  <img src="path/to/filename-small-640w.png" alt="">
</picture>`;

    const correct = `
<picture>
  <source media="large" srcset="path/to/filename-large-320w.png 320w,path/to/filename-large-640w.png 640w">
  <source media="medium" srcset="path/to/filename-medium-320w.png 320w,path/to/filename-medium-640w.png 640w">
  <img src="path/to/filename-small-640w.png" alt="" srcset="path/to/filename-small-320w.png 320w,path/to/filename-small-640w.png 640w">
</picture>`;

    assert.equal(await posthtml(html, case7), correct);
  });

  it(`No:18. Responsive check. extend. use [case8 - case 2 + 7 -] `, async () => {
    const html = `
<picture>
  <source src="path/to/filename-large-640w.png" media="large">
  <source src="path/to/filename-medium-640w.png" media="medium">
  <img src="path/to/filename-small-640w.png" alt="">
</picture>`;

    const correct = `
<picture>
  <source media="(min-width: 1000px)" srcset="path/to/filename-large-320w.png 320w,path/to/filename-large-640w.png 640w">
  <source media="(min-width: 800px)" srcset="path/to/filename-medium-320w.png 320w,path/to/filename-medium-640w.png 640w">
  <img src="path/to/filename-small-640w.png" alt="" srcset="path/to/filename-small-320w.png 320w,path/to/filename-small-640w.png 640w">
</picture>`;

    assert.equal(await posthtml(html, case8), correct);
  });
});

