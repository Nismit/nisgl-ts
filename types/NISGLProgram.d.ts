import { NISGL } from "./NISGL";
import { NISGLShader } from "./NISGLShader";
export declare class NISGLProgram {
    private _gl;
    private _program;
    private _linked;
    constructor(gl: NISGL, program: WebGLProgram);
    deleteProgram(): void;
    getProgram(): WebGLProgram;
    useProgram(): void;
    linkProgram(shaders: NISGLShader[]): void;
    getUniformLocation(name: string): WebGLUniformLocation | null;
}
