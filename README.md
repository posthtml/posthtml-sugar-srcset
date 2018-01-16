# posthtml-sugar-srcset

[![npm version](https://badge.fury.io/js/posthtml-sugar-srcset.svg)](https://badge.fury.io/js/posthtml-sugar-srcset)
[![Build Status](https://travis-ci.org/Tsuguya/posthtml-sugar-srcset.svg?branch=master)](https://travis-ci.org/Tsuguya/posthtml-sugar-srcset)

Sugar for srcset attributes of the image tag.

## Install

```
$ npm install --save-dev posthtml-sugar-srcset
```

## How it works

```html
<img src="path/to/image.png" srcset="2x, 3x" alt="Text representation of image.">
<img src="path/to/image@2x.png" alt="Text representation of image.">

<img src="path/to/image-320w.png" sizes="100vw" srcset="320w, 640w, 980w" alt="Text representation of image.">

<picture>
  <source src="path/to/filename-large.png" media="(min-width: 1000px)" srcset="1x, 2x, 3x">
  <source src="path/to/filename-medium.png" media="(min-width: 800px)" srcset="1x, 2x, 3x">
  <img src="path/to/filename-small.png" srcset="1x, 2x, 3x" alt="Text representation of image.">
</picture>
```

Output:

```html
<img src="path/to/image.png" srcset="path/to/image@2x.png 2x,path/to/image@3x.png 3x" alt="Text representation of image.">
<img src="path/to/image.png" srcset="path/to/image@2x.png 2x" alt="Text representation of image.">

<img src="path/to/image-320w.png" sizes="100vw" srcset="path/to/image-320w.png 320w,path/to/image-640w.png 640w,path/to/image-980w.png 980w" alt="Text representation of image.">

<picture>
  <source media="(min-width: 1000px)" srcset="path/to/filename-large.png,path/to/filename-large@2x.png 2x,path/to/filename-large@3x.png 3x">
  <source media="(min-width: 800px)" srcset="path/to/filename-medium.png,path/to/filename-medium@2x.png 2x,path/to/filename-medium@3x.png 3x">
  <img src="path/to/filename-small.png" srcset="path/to/filename-small@2x.png 2x,path/to/filename-small@3x.png 3x" alt="Text representation of image.">
</picture>
```

## Usage

``` js
const posthtml = require('posthtml');
const srcset = require('posthtml-sugar-srcset');

posthtml([srcset()])
  .process(html)
  .then(res => console.log(res.html));
```

## Options

#### resolution

Type: `Object`

#### resolution.src

Type: `boolean`  
Default: `true`

If false, pixel density descriptor will not be converted.

#### resolution.srcset

Type: `boolean`  
Default: `true`

If false, pixel density descriptor will not be converted.

##### resolution.suffix

Type: `string`  
Default: `@[match]x`

Reference string.  
If this pattern is included in src, it is based on the character excluding the pattern.

##### resolution.pixelRatio

Type: `Array`  
Default: `[1, 2, 3, 4]`

src based filtering list.

##### resolution.skip1x

Type: `boolean`  
Default: `true`

If srcset is 1x, omitted.

##### resolution.skip1xSuffix

Type: `boolean`  
Default: `true`

If true, omitting the 1x word input of srcset.

##### resolution.srcReplace

Type: `number`  
Default: `1`

Default value of src.  
If -1, base string is used.

#### responsive

Type: `Object`

##### responsive.src

Type: `boolean`  
Default: `true`

If false, width descriptor will not be converted.

##### responsive.srcset

Type: `boolean`  
Default: `true`

If false, width descriptor will not be converted.

##### responsive.width

Type: `Array`  
Default `[]`

src based filtering list.  
Only be used if `responsive.src: true`.

ex)

```js
srcset({
  responsive: {
    src: true,
    width: [320, 640]
  }
})
```

##### responsive.suffix

Type: `string`  
Default: `-[match]w`

Reference string.  
If this pattern is included in src, it is based on the character excluding the pattern.

##### responsive.srcReplace

Type: `number`  
Default: `-1`

Default value of src.  
If -1, base string is used.

#### replace

Type: `Object`  
Default: `{}`

Is the alias that can be used in sizes and media.  
Valid only in the source tag with a picture tag to the parent.

ex)

``` js
replace({
    defaultSizes: '50vw',
    sp: '(max-width: 320px) 100vw',
    pc: '320px'
    large: '(max-width: 1600px)',
    medium: '(max-width: 900px)'
})
```

Before

```html
<img src="path/to/image.png" srcset="320w, 640w" alt="Text representation of image.">
<img src="path/to/image.png" sizes="sp, pc" srcset="320w, 640w" alt="Text representation of image.">
<picture>
  <source src="image-large.png" media="large">
  <source src="image-medium.png" media="medium">
  <img src="image.png" alt="Text representation of image." srcset="2x, 3x, 4x">
</picture>
```

After

```html
<img src="path/to/image.png" srcset="path/to/image-320w.png 320w,path/to/image-640w.png 640w" alt="Text representation of image." sizes="50vw">
<img src="path/to/image.png" sizes="(max-width: 320px) 100vw,320px" srcset="path/to/image-320w.png 320w,path/to/image-640w.png 640w" alt="Text representation of image.">
<picture>
  <source media="(max-width: 1600px)" srcset="image-large.png,image-large@2x.png 2x,image-large@3x.png 3x,image-large@4x.png 4x">
  <source media="(max-width: 900px)" srcset="image-medium.png,image-medium.png@2x 2x,image-medium.png@3x 3x,image-medium.png@4x 4x">
  <img src="image.png" alt="Text representation of image." srcset="image@2x.png 2x,image@3x.png 3x,image@4x.png 4x">
</picture>
```

#### sourceSrc

Type: `boolean`  
Default: `true`

If you true, to use the src attribute of the source tag.  
After use, delete it.
