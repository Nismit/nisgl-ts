import { NISGLTexture } from "./NISGLTexture";
declare type AttachmentType = NISGLTexture | NISGLRenderBuffer;
export declare class NISGLFrameBuffer {
    readonly _gl: WebGLRenderingContext;
    readonly _frameBuffer: WebGLFramebuffer;
    private _width;
    private _height;
    private _attachments;
    constructor(gl: WebGLRenderingContext, width?: number, height?: number);
    /**
     * Bind FrameBuffer
     */
    bind(): void;
    /**
     * Unbind FrameBuffer
     */
    unbind(): void;
    /**
     * Dispose the FrameBuffer instance
     */
    dispose(): void;
    /**
     * Resize
     * If it has attachment(s), the attachments runs resize as well
     * @param {number} width
     * @param {number} height
     */
    resize(width: number, height: number): void;
    /**
     * Set Depth Buffer
     */
    attachDepth(): void;
    /**
     * Set Texture Buffer
     */
    attachTexture(): void;
    /**
     * Get Depth Buffer
     * @returns {WebGLRenderbuffer | null}
     */
    getDepth(): AttachmentType | null;
    /**
     * Get Texture Buffer
     * @returns {NISGLTexture | null}
     */
    getTexture(): AttachmentType | null;
}
declare class NISGLRenderBuffer {
    readonly _gl: WebGLRenderingContext;
    readonly _renderBuffer: WebGLRenderbuffer;
    private _width;
    private _height;
    constructor(gl: WebGLRenderingContext);
    /**
     * Bind RenderBuffer
     */
    bind(): void;
    /**
     * Dispose RenderBuffer
     */
    dispose(): void;
    /**
     * Resize RenderBuffer
     * @param {number} width
     * @param {number} height
     */
    resize(width: number, height: number): void;
    /**
     * Set width/height into RenderBuffer
     */
    storage(): void;
}
export {};
