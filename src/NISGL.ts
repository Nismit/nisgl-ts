import { NISGLProgram } from "./NISGLProgram";
import { NISGLBuffer } from "./NISGLBuffer";
import { NISGLTexture } from "./NISGLTexture";
import { NISGLFrameBuffer } from "./NISGLFrameBuffer";

const GL_DEPTH_BUFFER_BIT = 0x00000100;
const GL_COLOR_BUFFER_BIT = 0x00004000;

export class NISGL {
  private _message = new Error("Exeption Error");
  readonly _gl: WebGLRenderingContext;

  constructor(gl: WebGLRenderingContext) {
    this._gl = gl;
  }

  /**
   * Get rendering context
   * @return {WebGLRenderingContext}  WebGL Context
   */
  public get context(): WebGLRenderingContext {
    return this._gl;
  }

  /**
   * Create program instance
   * @param {string} vertex - Vertex shader source
   * @param {string} fragment - Fragment shader source
   * @return {NISGLProgram} NISGLProgram instance
   */
  public createProgram(
    vertex?: string,
    fragment?: string
  ): NISGLProgram | undefined {
    const gl = this._gl;
    const program = gl.createProgram();

    if (program === null) {
      this.emitMessage("Program creation error");
      return;
    }

    if ((!vertex && fragment) || (vertex && !fragment)) {
      this.emitMessage("Missing Vertex or Fragment shader");
      return;
    }

    return new NISGLProgram(gl, program, vertex, fragment);
  }

  /**
   * Create index buffer instance
   * @return {NISGLBuffer} NISGLBuffer instance
   */
  public indexBuffer(data?: BufferSource): NISGLBuffer | undefined {
    const gl = this._gl;
    const buffer = gl.createBuffer();

    if (buffer === null) {
      this.emitMessage("Index Buffer creation error");
      return;
    }

    return new NISGLBuffer(gl, buffer, "index", data);
  }

  /**
   * Create array buffer instance
   * @return {NISGLBuffer} NISGLBuffer instance
   */
  public arrayBuffer(data?: BufferSource): NISGLBuffer | undefined {
    const gl = this._gl;
    const buffer = gl.createBuffer();

    if (buffer === null) {
      this.emitMessage("Array Buffer creation error");
      return;
    }

    return new NISGLBuffer(gl, buffer, "array", data);
  }

  /**
   * Create texture instance
   * @returns {NISGLTexture} NISGLTexture instance
   */
  public createTexture(): NISGLTexture {
    const gl = this._gl;

    return new NISGLTexture(gl);
  }

  /**
   * Create frame buffer instance
   * @param {number} width
   * @param {number} height
   * @return {NISGLFrameBuffer}
   */
  public createFrameBuffer(width?: number, height?: number): NISGLFrameBuffer {
    const gl = this._gl;

    return new NISGLFrameBuffer(gl, width, height);
  }

  /**
   * Initalize canvas
   * @param {number} r Red Color Value, default 0.0
   * @param {number} g Green Color Value, default 0.0
   * @param {number} b Blue Color Value, default 0.0
   * @param {number} a Alpha Color Value, default 1.0
   * @param {number} depth Depath, default 1.0
   */
  public clear(
    r: number = 0.0,
    g: number = 0.0,
    b: number = 0.0,
    a: number = 1.0,
    depth: number = 1.0
  ): void {
    const gl = this._gl;
    gl.clearColor(r, g, b, a);
    gl.clearDepth(depth);
    gl.clear(GL_COLOR_BUFFER_BIT | GL_DEPTH_BUFFER_BIT);
  }

  /**
   * Flush
   */
  flush() {
    this._gl.flush();
  }

  /**
   * Emit Error Message
   * @param {Error | string | null} error Error Message
   * @return {Error} Error message
   */
  public emitMessage(error?: Error | string | null): Error {
    if (typeof error === "string") {
      throw new Error(error);
    } else if (error) {
      throw error;
    } else {
      throw this._message;
    }
  }
}
