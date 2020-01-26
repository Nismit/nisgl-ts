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
   * @return Return WebGLRenderingContext
   */
  public get context(): WebGLRenderingContext {
    return this._gl;
  }

  /**
   * Create shader instance
   * @param type Allow these types gl.VERTEX_SHADER | gl.FRAGMENT_SHADER
   * @return Shader class
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
   * @returns Return Program class
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
   * Use program
   * @param program Program object
   */
  public useProgram(program: NISGLProgram): void {
    const gl = this._gl;

    if (program === null) {
      this.emitMessage('There is no program, can not use the program');
      return;
    }

    gl.useProgram(program.getProgram);
  }

  /**
   * Create buffer instance
   * @returns Return Buffer class
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
   * @param r Red Color Value, default 0.0
   * @param g Green Color Value, default 0.0
   * @param b Blue Color Value, default 0.0
   * @param a Alpha Color Value, default 1.0
   * @param depth Depath, default 1.0
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
   * @return Return Error
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