import NISGLShader from './NISGLShader';
import NISGLProgram from './NISGLProgram';
import NISGLBuffer from './NISGLBuffer';
export default class NISGL {
    private _message;
    private _gl;
    constructor(gl: WebGLRenderingContext);
    /**
     * Get rendering context
     * @return Return WebGLRenderingContext
     */
    get context(): WebGLRenderingContext;
    /**
     * Create shader instance
     * @param type Allow these types gl.VERTEX_SHADER | gl.FRAGMENT_SHADER
     * @return Shader class
     */
    createShader(type: number): NISGLShader | null;
    /**
     * Create program instance
     * @returns Return Program class
     */
    createProgram(): NISGLProgram | null;
    /**
     * Use program
     * @param program Program object
     */
    useProgram(program: NISGLProgram): void;
    /**
     * Create buffer instance
     * @returns Return Buffer class
     */
    createBuffer(): NISGLBuffer | null;
    /**
     * Initalize canvas
     * @param r Red Color Value, default 0.0
     * @param g Green Color Value, default 0.0
     * @param b Blue Color Value, default 0.0
     * @param a Alpha Color Value, default 1.0
     * @param depth Depath, default 1.0
     */
    clear(r?: number, g?: number, b?: number, a?: number, depth?: number): void;
    /**
     * Emit Error Message
     * @param error {Error|string|null} Error Message
     * @return Return Error
     */
    emitMessage(error?: Error | string | null): Error;
}
