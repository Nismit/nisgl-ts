import { NISGL } from "./NISGL";
export declare class NISGLBuffer {
    private _gl;
    private _buffer;
    constructor(gl: NISGL, buffer: WebGLBuffer);
    getBuffer(): WebGLBuffer;
    createVertexBufferObject(source: ArrayBuffer | ArrayBufferView, usage?: number): void;
    createIndexBufferObject(source: ArrayBuffer | ArrayBufferView, usage?: number): void;
}
