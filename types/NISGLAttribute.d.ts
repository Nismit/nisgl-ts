import { NISGL } from "./NISGL";
import { NISGLProgram } from "./NISGLProgram";
export declare class NISGLAttribute {
    private _gl;
    private _program;
    private _isEnabled;
    constructor(gl: NISGL, program: NISGLProgram);
    getAttributeLocation(name: string): GLint | void;
    enableVertexAttribute(index: GLint): void;
    vertexAttributePointer(index: GLint, size: GLint, type?: number, normalized?: boolean, stride?: number, offset?: number): void;
}
