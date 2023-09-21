import type {FC, RefObject, CSSProperties, ReactNode} from 'react';
import type {ReadyEvent, CropStartEvent, CropEndEvent, CropMoveEvent, CropEvent, ZoomEvent} from 'cropperjs'

export interface initialCropProps {
    x?: number;
    y?: number;
    width?: number;
    height?: number;
    rotate?: number;
    scaleX?: number;
    scaleY?: number;
}

export interface CropperImageRefProps {
    setZoom: (amount: number) => void;
    setRotate: (degree: number) => void;
}

export interface CropperImageProps {
    ref?: RefObject<CropperImageRefProps>;
    aspect?: number;
    cropBoxResizable?: boolean;
    cropBoxMovable?: boolean;
    toggleDragModeOnDblclick?: boolean;
    checkCrossOrigin?: boolean;
    dragMode?: 'move' | 'crop' | 'none'
    rotatable?: boolean;
    restore?: boolean;
    movable?: boolean;
    scalable?: boolean;
    guides?: boolean;
    center?: boolean;
    zoomable?: boolean;
    zoomOnTouch?: boolean;
    zoomOnWheel?: boolean;
    wheelZoomRatio?: number;
    minZoom?: number;
    maxZoom?: number;
    initialAspectRatio?: number;
    initialCrop?: initialCropProps;
    minCanvasHeight?: number;
    minCanvasWidth?: number;
    minContainerHeight?: number;
    minContainerWidth?: number;
    minCropBoxHeight?: number;
    minCropBoxWidth?: number;

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