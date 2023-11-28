import {
  useState,
  useCallback,
  useMemo,
  useRef,
  forwardRef,
  useImperativeHandle,
  ForwardRefRenderFunction,
  ForwardedRef
} from 'react';
import AntRow from 'antd/es/row';
import AntCol from 'antd/es/col';
import AntButton from 'antd/es/button';
import AntSlider from 'antd/es/slider';
import AntModal from 'antd/es/modal';
import AntUpload from 'antd/es/upload';
import type {UploadProps} from 'antd';
import type {RcFile} from 'antd/lib/upload';
import {Cropper, ReactCropperElement} from 'react-cropper';
import type {CropperImageProps, CropperImageRefProps} from '../index';
import './styles/main.scss';

const CropperImage: ForwardRefRenderFunction<CropperImageRefProps, CropperImageProps> = (
  {
    aspect = 1,
    zoomable = true,
    rotatable = true,
    scalable = true,
    checkCrossOrigin = true,
    center = true,
    movable = true,
    guides = true,
    restore,
    dragMode = 'move',
    toggleDragModeOnDblclick,
    initialAspectRatio,
    cropBoxResizable = true,
    cropBoxMovable = true,
    initialCrop,
    minZoom = 1,
    maxZoom = 3,
    wheelZoomRatio,
    zoomOnWheel,
    zoomOnTouch,
    minCanvasHeight,
    minCanvasWidth,
    minContainerHeight,
    minContainerWidth,
    minCropBoxHeight = 10,
    minCropBoxWidth = 10,
    zoomAmount = 1,
    zoomStep = 0.3,
    modalTitle = 'Edit Image',
    modalWidth,
    modalStyle,
    okText,
    cancelText,
    maskTransitionName,
    modalTransitionName,
    onModalOk,
    onModalCancel,
    closeIcon,
    closable,
    maskStyle,
    hasMask,
    wrapClassName,
    bodyStyle,
    afterCloseModal,
    zIndex,

    beforeCrop,
    onUploadFail,
    children
  },
  forwardedRef: ForwardedRef<CropperImageRefProps>
) => {
  const cb = useRef<Pick<CropperImageProps, 'onModalOk' | 'onModalCancel' | 'beforeCrop' | 'onUploadFail'>>({});
  cb.current.onModalOk = onModalOk;
  cb.current.onModalCancel = onModalCancel;
  cb.current.beforeCrop = beforeCrop;
  cb.current.onUploadFail = onUploadFail;

  const [image, setImage] = useState<string | undefined>(undefined);
  const [rotate, setRotate] = useState<number>(0);
  const [zoom, setZoom] = useState<number>(0);
  const fileRef = useRef<RcFile>();
  const cropperRef = useRef<ReactCropperElement>(null);
  const beforeUploadRef = useRef<UploadProps['beforeUpload']>();
  const resolveRef = useRef<CropperImageProps['onModalOk']>();
  const rejectRef = useRef<(err: Error) => void>();

  const uploadComponent = useMemo(() => {
    const upload = Array.isArray(children) ? children[0] : children;
    const {beforeUpload, accept, ...restUploadProps} = upload.props;
    beforeUploadRef.current = beforeUpload;

    return {
      ...upload,
      props: {
        ...restUploadProps,
        accept: accept || 'image/*',
        beforeUpload: (file: RcFile, fileList: RcFile[]) => {
          // eslint-disable-next-line no-async-promise-executor
          return new Promise(async (resolve, reject) => {
            if (cb.current.beforeCrop) {
              const shouldCrop = await cb.current.beforeCrop(file, fileList);
              // eslint-disable-next-line no-promise-executor-return
              if (!shouldCrop) return reject();
            }

            fileRef.current = file;
            resolveRef.current = (newFile) => {
              cb.current.onModalOk?.(newFile);
              resolve(newFile);
            };
            rejectRef.current = (uploadErr) => {
              cb.current.onUploadFail?.(uploadErr);
              reject();
            };

            const reader = new FileReader();
            reader.addEventListener('load', () => {
              if (typeof reader.result === 'string') {
                setImage(reader.result);
              }
            });
            reader.readAsDataURL(file);
          });
        }
      }
    };
  }, [children]);

  const onClose = () => {
    setImage('');
    setZoom(minZoom);
    setRotate(0);
  };

  const onCancel = useCallback(() => {
    cb.current.onModalCancel?.();
    onClose();
  }, []);

  const onOk = useCallback(async () => {
    onClose();
    if (cropperRef?.current) {
      const blob = await (await fetch(cropperRef?.current?.cropper?.getCroppedCanvas().toDataURL())).blob();
      const newFile = Object.assign(
        new File([blob], fileRef.current?.name || 'cropImage.png', {type: fileRef.current?.type || 'image/png'}),
        {uid: fileRef.current?.uid || 'newCropImage'}
      ) as RcFile;
      setImage(undefined);
      if (!beforeUploadRef?.current && resolveRef?.current) {
        return resolveRef.current(newFile);
      }

      if (beforeUploadRef?.current) {
        const result = await beforeUploadRef.current(newFile, [newFile]);

        if (result === true && resolveRef.current) {
          return resolveRef.current(newFile);
        }

        if (result === false && rejectRef.current) {
          return rejectRef.current(new Error('beforeUpload return false'));
        }

        delete newFile[AntUpload.LIST_IGNORE];
        if (result === AntUpload.LIST_IGNORE && rejectRef.current) {
          Object.defineProperty(newFile, AntUpload.LIST_IGNORE, {
            value: true,
            configurable: true
          });
          return rejectRef.current(new Error('beforeUpload return LIST_IGNORE'));
        }

        if (typeof result === 'object' && result !== null && resolveRef.current) {
          return resolveRef.current(result);
        }
      }
    }
  }, []);

  const onRotate = useCallback((value: number) => {
    cropperRef?.current?.cropper?.rotateTo(value);
    setRotate(value);
  }, []);

  const onReduceRotate = useCallback(() => onRotate(rotate - 1), [rotate]);
  const onIncreaseRotate = useCallback(() => onRotate(rotate + 1), [rotate]);

  const onZoomTo = useCallback((value: number) => {
    cropperRef?.current?.cropper?.zoomTo(value);
    setZoom(value);
  }, []);

  const onReduceZoom = useCallback(() => onZoomTo(zoom - zoomAmount), [zoom]);
  const onIncreaseZoom = useCallback(() => onZoomTo(zoom + zoomAmount), [zoom]);

  useImperativeHandle(forwardedRef, () => ({
    setZoom(amount: number) {
      onZoomTo(amount);
    },
    setRotate(degree: number) {
      onRotate(degree);
    }
  }));

  return (
    <>
      {uploadComponent}
      <AntModal
        visible={!!image}
        centered
        destroyOnClose
        className="antd-cropper-img-modal"
        title={modalTitle}
        onOk={onOk}
        onCancel={onCancel}
        maskClosable={false}
        width={modalWidth}
        okText={okText}
        cancelText={cancelText}
        maskTransitionName={maskTransitionName}
        transitionName={modalTransitionName}
        closable={closable}
        closeIcon={closeIcon}
        mask={hasMask}
        maskStyle={maskStyle}
        wrapClassName={wrapClassName}
        bodyStyle={bodyStyle}
        afterClose={afterCloseModal}
        zIndex={zIndex}
        keyboard={false}
        style={modalStyle}>
        <>
          <Cropper
            ref={cropperRef}
            style={{height: '100%', width: '100%', maxHeight: '55vh', maxWidth: '95vw'}}
            src={image}
            dragMode={dragMode}
            viewMode={1}
            minCanvasHeight={minCanvasHeight}
            minCanvasWidth={minCanvasWidth}
            minCropBoxHeight={minCropBoxHeight}
            minCropBoxWidth={minCropBoxWidth}
            minContainerHeight={minContainerHeight}
            minContainerWidth={minContainerWidth}
            restore={restore}
            wheelZoomRatio={wheelZoomRatio}
            zoomOnWheel={zoomOnWheel}
            zoomOnTouch={zoomOnTouch}
            toggleDragModeOnDblclick={toggleDragModeOnDblclick}
            cropBoxMovable={cropBoxMovable}
            background={false}
            checkCrossOrigin={checkCrossOrigin}
            data={initialCrop}
            responsive
            autoCropArea={1}
            checkOrientation={false}
            modal={false}
            aspectRatio={aspect}
            initialAspectRatio={initialAspectRatio || aspect}
            cropBoxResizable={cropBoxResizable}
            guides={guides}
            center={center}
            movable={movable}
            rotatable={rotatable}
            scalable={scalable}
            zoomable={zoomable}
          />
          <AntRow gutter={[16, 32]} className="actions-row">
            {rotatable && (
              <AntCol span={24} className="action-col">
                <AntButton onClick={onReduceRotate}>↻</AntButton>
                <AntSlider min={-180} max={180} step={1} value={rotate} onChange={onRotate} className="action-slider" />
                <AntButton onClick={onIncreaseRotate}>↺</AntButton>
              </AntCol>
            )}
            {zoomable && (
              <AntCol span={24} className="action-col">
                <AntButton  onClick={onReduceZoom}>－</AntButton>
                <AntSlider
                  min={minZoom}
                  max={maxZoom}
                  step={zoomStep}
                  value={zoom}
                  onChange={onZoomTo}
                  className="action-slider"
                />
                <AntButton  onClick={onIncreaseZoom}>＋</AntButton>
              </AntCol>
            )}
          </AntRow>
        </>
      </AntModal>
    </>
  );
};

export default forwardRef(CropperImage);
