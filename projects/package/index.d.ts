import type { FC , RefObject} from 'react';
import {ReactCropperProps, ReactCropperElement} from 'react-cropper';

export interface CropperImageProps {
    ref?: RefObject<ReactCropperElement>;
    aspect?: number;
    fillColor?: string;
    cropBoxResizable?: boolean;

    hasZoom?: boolean;
    hasRotate?: boolean;
    minZoom?: number;
    maxZoom?: number;

    modalTitle?: string;
    modalWidth?: number | string;
    modalOk?: string;
    modalCancel?: string;
    modalMaskTransitionName?: string;
    modalTransitionName?: string;
    onModalOk?: (file: void | boolean | string | Blob | File) => void;
    onModalCancel?: () => void;

    beforeCrop?: (file: File, fileList: File[]) => boolean | Promise<boolean>;
    onUploadFail?: (err: Error) => void;
    cropperProps?: Partial<ReactCropperProps>;

    children: JSX.Element;
}

declare const CropperImg: FC<CropperImageProps>;

export default CropperImg;