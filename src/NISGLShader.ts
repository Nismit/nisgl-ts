import { NISGL } from './NISGL';

export class NISGLShader {
  private _gl: NISGL;
  private _shader: WebGLShader;
  private _compiled: boolean = false;

  constructor(gl: NISGL, shader: WebGLShader) {
    this._gl = gl;
    this._shader = shader;
  }

  public getShader(): WebGLShader {
    return this._shader;
  }

  public deleteShader(): void {
    this._gl.getGLContext().deleteShader(this._shader);
  }

  public isCompiled(): boolean {
    return this._compiled;
  }

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