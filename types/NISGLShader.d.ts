import NISGL from './NISGL';
export default class NISGLShader {
    private _gl;
    private _shader;
    private _compiled;
    constructor(gl: NISGL, shader: WebGLShader);
    /**
     * Get raw shader
     * @return Return shader
     */
    getShader(): WebGLShader;
    /**
     * Delete shader
     */
    deleteShader(): void;
    /**
     * Get status the shader already compiled
     */
    isCompiled(): boolean;
    /**
     * Compile the shader
     * @param source Shader
     */
    compile(source: string): void;
}
