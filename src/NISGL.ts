import { NISGLShader } from './NISGLShader';
import { NISGLProgram } from './NISGLProgram';

export class NISGL {
  private _message = new Error('Exeption Error');
  private _gl: WebGLRenderingContext;

  constructor(gl: WebGLRenderingContext) {
    this._gl = gl;
  }

  /**
   * @return {WebGLRenderingContext} Returns WebGL Context
   */
  public getGLContext(): WebGLRenderingContext {
    return this._gl;
  }

  /**
   * Create shader instance
   * @param {number} type gl.VERTEX_SHADER | gl.FRAGMENT_SHADER
   * @return {NISGLShader} Shader object
   */
  public createShader(type: number) {
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
  public createProgram() {
    const gl = this._gl;
    const program = gl.createProgram();

    if (program === null) {
      this.emitMessage(this._message);
      return null;
    }

    return new NISGLProgram(this, program);
  }

  /**
   * 
   * @param error 
   */
  public emitMessage(error?: Error | string | null) {
    if (typeof error === 'string') {
      throw new Error(error);
    } else if (error) {
      throw error;
    } else {
      throw this._message;
    }
  }
}