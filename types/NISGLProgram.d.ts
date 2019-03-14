import { NISGL } from "./NISGL";
import { NISGLShader } from "./NISGLShader";
export declare class NISGLProgram {
    private _gl;
    private _program;
    private _linked;
    constructor(gl: NISGL, program: WebGLProgram);
    getProgram(): WebGLProgram;
    useProgram(): void;
    linkProgram(shaders: NISGLShader[]): void;
}
