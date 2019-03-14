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
    getGLContext(): WebGLRenderingContext;
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
     * Emit Error Message
     * @param error {Error|string|null} Error Message
     */
    emitMessage(error?: Error | string | null): Error;
}
