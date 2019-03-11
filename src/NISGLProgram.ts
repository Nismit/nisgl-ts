import { NISGL } from "./NISGL";
import { NISGLShader } from "./NISGLShader";

export class NISGLProgram {
  private _gl: NISGL;
  private _program: WebGLProgram;
  private _linked: boolean = false;

  constructor(gl: NISGL, program: WebGLProgram) {
    this._gl = gl;
    this._program = program;
  }

  public getProgram() {
    return this._program;
  }

  public useProgram() {
    const gl = this._gl.getGLContext();

    if (this._linked) {
      gl.useProgram(this._program);
    } else {
      this._gl.emitMessage('Program has not linked yet.');
    }
  }

  public linkProgram(shaders: NISGLShader[]): void {
    const gl = this._gl.getGLContext();

    shaders.forEach(shader => { gl.attachShader(this._program, shader.getShader()) });
    gl.linkProgram(this._program);
    this._linked = gl.getProgramParameter(this._program, gl.LINK_STATUS);

    if (!this._linked) {
      this._gl.emitMessage(gl.getProgramInfoLog(this._program));
      return;
    }
  }
}