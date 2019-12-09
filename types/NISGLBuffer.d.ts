import { NISGL } from './NISGL';
export declare class NISGLBuffer {
    private _gl;
    private _buffer;
    constructor(gl: NISGL, buffer: WebGLBuffer);
    /**
     * Get buffer instance
     * @return Return WebGLBuffer
     */
    get getBuffer(): WebGLBuffer;
    /**
     * Delete buffer
     */
    deleteBuffer(): void;
    /**
     * Attach vertex model data into the buffer
     * @param source A model data
     * @param usage Type of the model data, default GL_CONST.STATIC_DRAW
     */
    createVertexPosition(source: ArrayBuffer | ArrayBufferView, usage?: number): void;
    createVertexIndex(source: ArrayBuffer | ArrayBufferView, usage?: number): void;
}
