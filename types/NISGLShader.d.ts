import { NISGL } from './NISGL';
export declare class NISGLShader {
    private _gl;
    private _shader;
    private _compiled;
    constructor(gl: NISGL, shader: WebGLShader);
    /**
     * Get raw shader
     * @returns {WebGLShader}
     */
    getShader(): WebGLShader;
    /**
     * Delete shader
     */
    deleteShader(): void;
    /**
     * Get status the shader already compiled
     * @returns {boolean}
     */
    isCompiled(): boolean;
    /**
     * Compile the shader
     * @param source
     */
    compile(source: string): void;
}
