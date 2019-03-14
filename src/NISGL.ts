import { NISGLShader } from './NISGLShader';
import { NISGLProgram } from './NISGLProgram';
import { NISGLBuffer } from './NISGLBuffer';

export class NISGL {
  private _message = new Error('Exeption Error');
  private _gl: WebGLRenderingContext;

  constructor(gl: WebGLRenderingContext) {
    this._gl = gl;
  }

  /**
   * Get rendering context
   * @return {WebGLRenderingContext}
   */
  public getGLContext(): WebGLRenderingContext {
    return this._gl;
  }

  /**
   * Create shader instance
   * @param {number} type gl.VERTEX_SHADER | gl.FRAGMENT_SHADER
   * @return {NISGLShader} Shader object
   */
  public createShader(type: number): NISGLShader | null {
    const gl = this._gl;
    const shader = gl.createShader(type);

    if (shader === null) {
      this.emitMessage(this._message);
      return null;
    }

    return new NISGLShader(this, shader);
  }

  /**
   * Create program instance
   * @returns {NISGLProgram|null} Program object
   */
  public createProgram(): NISGLProgram | null {
    const gl = this._gl;
    const program = gl.createProgram();

    if (program === null) {
      this.emitMessage(this._message);
      return null;
    }

    return new NISGLProgram(this, program);
  }

  /**
   * Create buffer instance
   * @returns {NISGLBuffer|null} Buffer object
   */
  public createBuffer(): NISGLBuffer | null {
    const gl = this._gl;
    const buffer = gl.createBuffer();

    if (buffer === null) {
      this.emitMessage(this._message);
      return null;
    }

    return new NISGLBuffer(this, buffer);
  }

  /**
   * Initalize canvas
   * @param r {number} Red Color Value
   * @param g {number} Green Color Value
   * @param b {number} Blue Color Value
   * @param a {number} Alpha Color Value
   * @param depth {number} Depath
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
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  }

  /**
   * Emit Error Message
   * @param error {Error|string|null} Error Message
   */
  public emitMessage(error?: Error | string | null): Error {
    if (typeof error === 'string') {
      throw new Error(error);
    } else if (error) {
      throw error;
    } else {
      throw this._message;
    }
  }
}