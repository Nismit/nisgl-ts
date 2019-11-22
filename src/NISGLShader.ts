import { NISGL } from './NISGL';

export class NISGLShader {
  private _gl: NISGL;
  private _shader: WebGLShader;
  private _compiled: boolean = false;

  constructor(gl: NISGL, shader: WebGLShader) {
    this._gl = gl;
    this._shader = shader;
  }

  /**
   * Get raw shader
   * @returns {WebGLShader}
   */
  public getShader(): WebGLShader {
    return this._shader;
  }

  /**
   * Delete shader
   */
  public deleteShader(): void {
    this._gl.getGLContext().deleteShader(this._shader);
  }

  /**
   * Get status the shader already compiled
   * @returns {boolean}
   */
  public isCompiled(): boolean {
    return this._compiled;
  }

  /**
   * Compile the shader
   * @param source 
   */
  public compile(source: string): void {
    const gl = this._gl.getGLContext();

    gl.shaderSource(this._shader, source);
    gl.compileShader(this._shader);
    this._compiled = gl.getShaderParameter(this._shader, gl.COMPILE_STATUS);

    if (!this._compiled) {
      this._gl.emitMessage(gl.getShaderInfoLog(this._shader));
      return;
    }
  }
}