import GL_CONST from "./constants";
import { NISGLProgram } from "./NISGLProgram";
import { NISGLBuffer } from "./NISGLBuffer";
export class NISGL {
  private _message = new Error("Exeption Error");
  private _gl: WebGLRenderingContext;

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
    gl.clear(GL_CONST.COLOR_BUFFER_BIT | GL_CONST.DEPTH_BUFFER_BIT);
  }

  /**
   * Flush
   */
  flush() {
    this._gl.flush();
  }

  /**
   * Emit Error Message
   * @param {Error | string | null} error {Error|string|null} Error Message
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
