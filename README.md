# antd-cropper-img

> The best image cropper for [Ant Design Upload]

![GitHub branch checks state](https://img.shields.io/github/checks-status/sinashahoveisi/antd-cropper-img/master?logo=github&style=plastic)
![GitHub issues](https://img.shields.io/github/issues/sinashahoveisi/antd-cropper-img?logo=github&style=plastic)
![GitHub](https://img.shields.io/github/license/sinashahoveisi/antd-cropper-img?style=plastic)
![npm](https://img.shields.io/npm/v/antd-cropper-img?logo=npm&style=plastic)
![Website](https://img.shields.io/website?down_message=offline&style=plastic&up_message=online&url=https%3A%2F%2Fsinasho.ir)
![GitHub language count](https://img.shields.io/github/languages/count/sinashahoveisi/antd-cropper-img?logo=TypeScript&style=plastic)
![GitHub top language](https://img.shields.io/github/languages/top/sinashahoveisi/antd-cropper-img?logo=TypeScript&style=plastic)
![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/sinashahoveisi/antd-cropper-img?style=plastic)


## What is this?

This package is a [React] component that can show [Cropperjs] modal before upload image in ant design.


### Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Demo](#demo)
- [Props](#props)
  - [Cropper](#Cropper)
  - [Modal](#Modal)
- [Creator](#creator)
- [License](#license)

## Installation
You can install this package in two ways simultaneously

install with [npm]
```sh
npm install antd-cropper-img
```

install with [yarn]
```sh
yarn add antd-cropper-img
```

## Usage

```tsx
import { Upload } from 'antd';
import CropperImage from 'antd-cropper-img';

const App = () => (
  <CropperImage>
      <Upload>+ Add image</Upload>
  </CropperImage>
)
```

## Demo

[![Edit antd-img-crop](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/i7xvuu?file=/src/App.tsx&fontsize=14&hidenavigation=1&theme=dark)

## Props
props are divided into two groups, `CropperProps` and `ModalProps`

### Cropper

#### dragMode

- Type: `String`
- Default: `'crop'`
- Options:
    - `'crop'`: create a new crop box
    - `'move'`: move the canvas
    - `'none'`: do nothing

Define the dragging mode of the cropper.

#### initialAspectRatio

- Type: `Number`
- Default: `NaN`

Define the initial aspect ratio of the crop box. By default, it is the same as the aspect ratio of the canvas (image wrapper).

> Only available when the `aspect` option is set to `NaN`.

#### aspect

- Type: `Number`
- Default: `NaN`

Define the fixed aspect ratio of the crop box. By default, the crop box has a free ratio.

### initialCrop

- Type: `initialCropProps`
- Default: `null`

initialize cropper image 

#### checkCrossOrigin

- Type: `Boolean`
- Default: `true`

Check if the current image is a cross-origin image.

If so, a `crossOrigin` attribute will be added to the cloned image element, and a timestamp parameter will be added to the `src` attribute to reload the source image to avoid browser cache error.

Adding a `crossOrigin` attribute to the image element will stop adding a timestamp to the image URL and stop reloading the image. But the request (XMLHttpRequest) to read the image data for orientation checking will require a timestamp to bust the cache to avoid browser cache error. You can set the `checkOrientation` option to `false` to cancel this request.

#### guides

- Type: `Boolean`
- Default: `true`

Show the dashed lines above the crop box.

#### center

- Type: `Boolean`
- Default: `true`

Show the center indicator above the crop box.

#### movable

- Type: `Boolean`
- Default: `true`

Enable to move the image.

### restore

- Type: `Boolean`
- Default: `true`

Restore the cropped area after resizing the window.

#### rotatable

- Type: `Boolean`
- Default: `true`

Enable to rotate the image.

#### scalable

- Type: `Boolean`
- Default: `true`

Enable to scale the image.

### zoomable

- Type: `Boolean`
- Default: `true`

Enable to zoom the image.

### zoomAmount
- Type: `Number`
- Default: `1`

Amount to zoom on button click.

### zoomStep
- Type: `Number`
- Default: `0.3`

Amount to step on zoom slider.

### zoomOnTouch

- Type: `Boolean`
- Default: `true`

Enable to zoom the image by dragging touch.

### zoomOnWheel

- Type: `Boolean`
- Default: `true`

Enable to zoom the image by mouse wheeling.

### wheelZoomRatio

- Type: `Number`
- Default: `0.1`

Define zoom ratio when zooming the image by mouse wheeling.

### cropBoxMovable

- Type: `Boolean`
- Default: `true`

Enable to move the crop box by dragging.

#### minZoom

- Type: `Number`
- Default: `0`

Minimum zoom factor.

#### maxZoom

- Type: `Number`
- Default: `3`

Maximum zoom factor.

#### cropBoxResizable

- Type: `Boolean`
- Default: `true`

Enable to resize the crop box by dragging.

### toggleDragModeOnDblclick

- Type: `Boolean`
- Default: `true`

Enable to toggle drag mode between `"crop"` and `"move"` when clicking twice on the cropper.

> Requires [`dblclick`](https://developer.mozilla.org/en-US/docs/Web/Events/dblclick) event support.


### minContainerWidth

- Type: `Number`
- Default: `200`

The minimum width of the container.

### minContainerHeight

- Type: `Number`
- Default: `100`

The minimum height of the container.

### minCanvasWidth

- Type: `Number`
- Default: `0`

The minimum width of the canvas (image wrapper).

### minCanvasHeight

- Type: `Number`
- Default: `0`

The minimum height of the canvas (image wrapper).

### minCropBoxWidth

- Type: `Number`
- Default: `0`

The minimum width of the crop box.

**Note:** This size is relative to the page, not the image.

### minCropBoxHeight

- Type: `Number`
- Default: `0`

The minimum height of the crop box.

**Note:** This size is relative to the page, not the image.


---


### Modal

#### modalTitle

- Type: `String`
- Default: `'Edit image'`

Title of modal.

#### modalWidth

- Type: `Number` \| `String`
- Default: `520`

Width of modal in pixels number or percentages.

#### okText

- Type: `String`
- Default: `'OK'`

Text of modal confirm button.

#### cancelText

- Type: `String`
- Default: `'Cancel'`

Text of modal cancel button.

#### closable

- Type: `Boolean`
- Default: `true`

Whether a close (x) button is visible on top right of the modal dialog or not.

#### closeIcon

- Type: `ReactNode`
- Default: `undefined`

Custom close icon.


#### hasMask

- Type: `Boolean`
- Default: `true`

Whether show mask or not.

#### maskTransitionName

- Type: `String`
- Default: `'fade'`

MaskTransitionName of modal, use `'none'` to disable the default transition effect.

#### modalTransitionName

- Type: `String`
- Default: `'fade'`

TransitionName of modal, use `'none'` to disable the default transition effect.

#### wrapClassName

- Type: `String`
- Default: -

The class name of the container of the modal dialog.

#### onModalOk

- Type: `function`
- Default: -

Call when click modal confirm button.

#### onModalCancel

- Type: `function`
- Default: -

Call when click modal mask, top right "x", or cancel button.

#### afterCloseModal

- Type: `function`
- Default: -

Specify a function that will be called when modal is closed completely.

#### zIndex

- Type: `Number`
- Default: `1000`

The `z-index` of the Modal.

#### modalStyle

- Type: `CSSProperties`
- Default: -

Style of floating layer, typically used at least for adjusting the position.

#### maskStyle

- Type: `CSSProperties`
- Default: -

Style for modal's mask element.

#### bodyStyle

- Type: `CSSProperties`
- Default: -

Body style for modal body element. Such as height, padding etc.

#### beforeCrop

- Type: `function`
- Default: -

Call before modal open, if return `false`, it'll not open.

#### onUploadFail

- Type: `function`
- Default: -

Call when upload failed.



## Creator

Sina Shah Oveisi [@sinashahoveisi](https://sinasho.ir)

> I love programming. I am interested in popular frameworks or programming languages and I am currently coding with JavaScript and React framework.


## License
[MIT License][license] © [Sina Shahoveisi][author]

[Ant Design Upload]: https://ant.design/components/upload/

[react]: http://reactjs.org

[npm]: https://docs.npmjs.com/cli/install

[yarn]: https://docs.yarn.com/cli/install

[Cropperjs]: https://github.com/fengyuanchen/cropperjs

[author]: https://github.com/sinashahoveisi

[license]: https://github.com/sinashahoveisi/antd-cropper-img/blob/master/LICENSE