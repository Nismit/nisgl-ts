import { NISGL } from './NISGL';
export declare class NISGLBuffer {
    private _gl;
    private _buffer;
    constructor(gl: NISGL, buffer: WebGLBuffer);
    readonly getBuffer: WebGLBuffer;
    deleteBuffer(): void;
    createVertexPosition(source: ArrayBuffer | ArrayBufferView, usage?: number): void;
    createVertexIndex(source: ArrayBuffer | ArrayBufferView, usage?: number): void;
}
