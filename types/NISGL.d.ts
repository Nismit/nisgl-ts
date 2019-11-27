import { NISGLShader } from './NISGLShader';
import { NISGLProgram } from './NISGLProgram';
import { NISGLBuffer } from './NISGLBuffer';
export declare class NISGL {
    private _message;
    private _gl;
    constructor(gl: WebGLRenderingContext);
    /**
     * Get rendering context
     * @return {WebGLRenderingContext}
     */
    get context(): WebGLRenderingContext;
    /**
     * Create shader instance
     * @param {number} type gl.VERTEX_SHADER | gl.FRAGMENT_SHADER
     * @return {NISGLShader} Shader object
     */
    createShader(type: number): NISGLShader | null;
    /**
     * Create program instance
     * @returns {NISGLProgram|null} Program object
     */
    createProgram(): NISGLProgram | null;
    /**
     * Create buffer instance
     * @returns {NISGLBuffer|null} Buffer object
     */
    createBuffer(): NISGLBuffer | null;
    /**
     * Initalize canvas
     * @param r {number} Red Color Value
     * @param g {number} Green Color Value
     * @param b {number} Blue Color Value
     * @param a {number} Alpha Color Value
     * @param depth {number} Depath
     */
    clear(r?: number, g?: number, b?: number, a?: number, depth?: number): void;
    /**
     * Emit Error Message
     * @param error {Error|string|null} Error Message
     */
    emitMessage(error?: Error | string | null): Error;
}
