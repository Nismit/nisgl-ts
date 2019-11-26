import { NISGL } from './NISGL';
import { NISGLShader } from './NISGLShader';
export declare class NISGLProgram {
    private _gl;
    private _program;
    private _linked;
    constructor(gl: NISGL, program: WebGLProgram);
    readonly getProgram: WebGLProgram;
    deleteProgram(): void;
    useProgram(): void;
    linkProgram(shaders: NISGLShader[]): void;
    getAttributeLocation(name: string): number;
    getUniformLocation(name: string): WebGLUniformLocation | null;
    setAttribute(name: string, size: GLint, type?: number, normalized?: boolean, stride?: number, offset?: number): void;
}
