import NISGL from './NISGL';

export default class NISGLShader {
  private _gl: NISGL;
  private _shader: WebGLShader;
  private _compiled: boolean = false;

  constructor(gl: NISGL, shader: WebGLShader) {
    this._gl = gl;
    this._shader = shader;
  }

  /**
   * Get raw shader
   * @return Return shader
   */
  public getShader(): WebGLShader {
    return this._shader;
  }

  /**
   * Delete shader
   */
  public deleteShader(): void {
    this._gl.context.deleteShader(this._shader);
  }

  /**
   * Get status the shader already compiled
   */
  public isCompiled(): boolean {
    return this._compiled;
  }

  /**
   * Compile the shader
   * @param source Shader
   */
  public compile(source: string): void {
    const gl = this._gl.context;

    gl.shaderSource(this._shader, source);
    gl.compileShader(this._shader);
    this._compiled = gl.getShaderParameter(this._shader, gl.COMPILE_STATUS);

    if (!this._compiled) {
      this._gl.emitMessage(gl.getShaderInfoLog(this._shader));
      return;
    }
  }
}