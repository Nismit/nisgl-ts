import { NISGLProgram } from "./NISGLProgram";
export declare class NISGLBuffer {
    private _gl;
    private _buffer;
    private _bufferType;
    private _usage;
    private _attribs;
    private _type;
    constructor(gl: WebGLRenderingContext, buffer: WebGLBuffer, mode: "array" | "index", data?: BufferSource, type?: GLenum);
    /**
     * Get buffer instance
     * @return {WebGLBuffer} WebGLBuffer
     */
    get getBuffer(): WebGLBuffer;
    /**
     * Bind buffer
     */
    bind(): void;
    /**
     * Set IndexBuffer Type
     * @param {GLenum} type
     */
    setType(type: GLenum): void;
    /**
     * Dispose the buffer
     */
    dispose(): void;
    /**
     * Set data into the buffer
     * @param source
     */
    data(source: BufferSource): void;
    /**
     * Store attribute data
     * @param name Attibute name
     * @param size Size of geometry object, Must be 1,2,3 or 4 (e.g. x,y,z object is 3)
     * @param type Specifying the data type, default GL_CONST.FLOAT
     * @param normalized Normalized VBO, default false
     * @param stride default 0
     * @param offset default 0
     */
    attrib(name: string, size: number, type?: GLenum, normalized?: boolean, stride?: number, offset?: number): void;
    /**
     * Subscribe VBO attributes
     * @param {NISGLProgram} program
     */
    attribPointer(program: NISGLProgram): void;
    /**
     * Shortcut of Draw function
     * @param {GLenum} mode
     * @param {number} count
     * @param {number} offset
     */
    draw(mode: GLenum, count: number, offset?: number): void;
    drawPoints(count: number, offset: number): void;
    drawLines(count: number, offset: number): void;
    drawLineLoop(count: number, offset: number): void;
    drawLineStrip(count: number, offset: number): void;
    drawTriangles(count: number, offset: number): void;
    drawTriangleStrips(count: number, offset: number): void;
    drawTriangleFan(count: number, offset: number): void;
}
