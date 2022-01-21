import { NISGLProgram } from "./NISGLProgram";
import { NISGLBuffer } from "./NISGLBuffer";
import { NISGLTexture } from "./NISGLTexture";
import { NISGLFrameBuffer } from "./NISGLFrameBuffer";
export declare class NISGL {
    private _message;
    readonly _gl: WebGLRenderingContext;
    constructor(gl: WebGLRenderingContext);
    /**
     * Get rendering context
     * @return {WebGLRenderingContext}  WebGL Context
     */
    get context(): WebGLRenderingContext;
    /**
     * Create program instance
     * @param {string} vertex - Vertex shader source
     * @param {string} fragment - Fragment shader source
     * @return {NISGLProgram} NISGLProgram instance
     */
    createProgram(vertex?: string, fragment?: string): NISGLProgram | undefined;
    /**
     * Create index buffer instance
     * @return {NISGLBuffer} NISGLBuffer instance
     */
    indexBuffer(data?: BufferSource): NISGLBuffer | undefined;
    /**
     * Create array buffer instance
     * @return {NISGLBuffer} NISGLBuffer instance
     */
    arrayBuffer(data?: BufferSource): NISGLBuffer | undefined;
    /**
     * Create texture instance
     * @returns {NISGLTexture} NISGLTexture instance
     */
    createTexture(): NISGLTexture;
    /**
     * Create frame buffer instance
     * @param {number} width
     * @param {number} height
     * @return {NISGLFrameBuffer}
     */
    createFrameBuffer(width?: number, height?: number): NISGLFrameBuffer;
    /**
     * Initalize canvas
     * @param {number} r Red Color Value, default 0.0
     * @param {number} g Green Color Value, default 0.0
     * @param {number} b Blue Color Value, default 0.0
     * @param {number} a Alpha Color Value, default 1.0
     * @param {number} depth Depath, default 1.0
     */
    clear(r?: number, g?: number, b?: number, a?: number, depth?: number): void;
    /**
     * Flush
     */
    flush(): void;
    /**
     * Emit Error Message
     * @param {Error | string | null} error Error Message
     * @return {Error} Error message
     */
    emitMessage(error?: Error | string | null): Error;
}
