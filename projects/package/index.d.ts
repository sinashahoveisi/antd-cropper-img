import type {FC, RefObject, CSSProperties, ReactNode} from 'react';

export interface CropperImageRefProps {
    setZoom: (amount: number) => void;
    setRotate: (degree: number) => void;
}

export interface CropperImageProps {
    ref?: RefObject<CropperImageRefProps>;
    aspect?: number;
    cropBoxResizable?: boolean;
    checkCrossOrigin?: boolean;
    dragMode?: 'move' | 'crop' | 'none'
    zoomable?: boolean;
    rotatable?: boolean;
    movable?: boolean;
    scalable?: boolean;
    guides?: boolean;
    center?: boolean;
    initialAspectRatio?: number;
    minZoom?: number;
    maxZoom?: number;

    modalTitle?: string;
    modalWidth?: number | string;
    okText?: ReactNode;
    cancelText?: ReactNode;
    closable?: boolean;
    hasMask?: boolean;
    closeIcon?: ReactNode;
    maskTransitionName?: string;
    modalTransitionName?: string;
    wrapClassName?: string;
    onModalOk?: (file: void | boolean | string | Blob | File) => void;
    afterCloseModal?: () => void;
    onModalCancel?: () => void;
    zIndex?: number;
    modalStyle?: CSSProperties;
    maskStyle?: CSSProperties;
    bodyStyle?: CSSProperties;

    beforeCrop?: (file: File, fileList: File[]) => boolean | Promise<boolean>;
    onUploadFail?: (err: Error) => void;

    children: JSX.Element;
}

declare const CropperImg: FC<CropperImageProps>;

export default CropperImg;