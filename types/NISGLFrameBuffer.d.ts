import { NISGLTexture } from "./NISGLTexture";
declare type AttachmentType = NISGLTexture | NISGLRenderBuffer;
export declare class NISGLFrameBuffer {
    readonly _gl: WebGLRenderingContext;
    readonly _frameBuffer: WebGLFramebuffer;
    private _width;
    private _height;
    private _attachments;
    constructor(gl: WebGLRenderingContext, width?: number, height?: number);
    bind(): void;
    unbind(): void;
    dispose(): void;
    resize(width: number, height: number): void;
    attachDepth(): void;
    attachTexture(): void;
    getDepth(): AttachmentType | null;
    getTexture(): AttachmentType | null;
}
declare class NISGLRenderBuffer {
    readonly _gl: WebGLRenderingContext;
    readonly _renderBuffer: WebGLRenderbuffer;
    private _width;
    private _height;
    constructor(gl: WebGLRenderingContext);
    bind(): void;
    dispose(): void;
    resize(width: number, height: number): void;
    storage(): void;
}
export {};
