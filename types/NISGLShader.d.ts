import { NISGL } from "./NISGL";
export declare class NISGLShader {
    private _gl;
    private _shader;
    private _compiled;
    constructor(gl: NISGL, shader: WebGLShader);
    getShader(): WebGLShader;
    deleteShader(): void;
    isCompiled(): boolean;
    compile(source: string): void;
}
