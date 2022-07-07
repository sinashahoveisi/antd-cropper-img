import {useState, useCallback, useMemo, useRef, forwardRef, ForwardRefRenderFunction, ForwardedRef} from 'react';
import AntRow from 'antd/es/row';
import AntCol from 'antd/es/col';
import AntButton from 'antd/es/button';
import AntSlider from 'antd/es/slider';
import AntModal from 'antd/es/modal';
import AntUpload from 'antd/es/upload';
import type {UploadProps} from 'antd';
import type {RcFile} from 'antd/lib/upload';
import {Cropper, ReactCropperElement} from 'react-cropper';
import type {CropperImageProps} from '../index';
import './styles/main.scss';

const CropperImage: ForwardRefRenderFunction<ReactCropperElement, CropperImageProps> = (
  {
    ref,
    aspect = 1,
    quality = 0.4,
    fillColor = 'white',

    hasZoom = true,
    hasRotate = true,
    cropBoxResizable = true,
    minZoom = 1,
    maxZoom = 3,

    modalTitle = 'Edit Image',
    modalWidth,
    modalOk,
    modalCancel,
    modalMaskTransitionName,
    modalTransitionName,
    onModalOk,
    onModalCancel,

    beforeCrop,
    onUploadFail,
    cropperProps,
    children
  },
  forwardedRef: ForwardedRef<ReactCropperElement>
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

  const modalProps = useMemo(() => {
    const obj = {
      width: modalWidth,
      okText: modalOk,
      cancelText: modalCancel,
      maskTransitionName: modalMaskTransitionName,
      transitionName: modalTransitionName
    };
    Object.keys(obj).forEach((key) => {
      if (!obj[key]) delete obj[key];
    });
    return obj;
  }, [modalCancel, modalMaskTransitionName, modalOk, modalTransitionName, modalWidth]);

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
  }, [fillColor, quality, hasRotate]);

  const onRotate = useCallback((value: number) => {
    cropperRef?.current?.cropper?.rotateTo(value);
    setRotate(value);
  }, []);

  const onReduceRotate = useCallback(() => onRotate(rotate - 1), [rotate]);
  const onIncreaseRotate = useCallback(() => onRotate(rotate + 1), [rotate]);

  const onZoom = useCallback((value: number) => {
    cropperRef?.current?.cropper?.zoomTo(value);
    setZoom(value);
  }, []);

  const onReduceZoom = useCallback(() => onZoom(zoom - 1), [zoom]);
  const onIncreaseZoom = useCallback(() => onZoom(zoom + 1), [zoom]);

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
        {...modalProps}>
        <>
          <Cropper
            ref={cropperRef}
            {...cropperProps}
            style={{height: '100%', width: '100%', maxHeight: '55vh', maxWidth: '95vw'}}
            src={image}
            dragMode="move"
            viewMode={1}
            minCropBoxHeight={10}
            minCropBoxWidth={10}
            background={false}
            responsive
            autoCropArea={1}
            checkOrientation={false}
            initialAspectRatio={aspect}
            cropBoxResizable={cropBoxResizable}
            guides
          />
          <AntRow gutter={[16, 32]} className="actions-row">
            {hasRotate && (
              <AntCol span={24} className="action-col">
                <AntButton onClick={onReduceRotate}>↻</AntButton>
                <AntSlider min={-180} max={180} step={1} value={rotate} onChange={onRotate} className="action-slider" />
                <AntButton onClick={onIncreaseRotate}>↺</AntButton>
              </AntCol>
            )}
            {hasZoom && (
              <AntCol span={24} className="action-col">
                <AntButton onClick={onReduceZoom}>－</AntButton>
                <AntSlider
                  min={minZoom}
                  max={maxZoom}
                  step={0.3}
                  value={zoom}
                  onChange={onZoom}
                  className="action-slider"
                />
                <AntButton onClick={onIncreaseZoom}>＋</AntButton>
              </AntCol>
            )}
          </AntRow>
        </>
      </AntModal>
    </>
  );
};

export default forwardRef(CropperImage);
