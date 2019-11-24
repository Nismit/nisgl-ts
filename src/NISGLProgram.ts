import GL_CONST from './constants';
import { NISGL } from './NISGL';
import { NISGLShader } from './NISGLShader';

export class NISGLProgram {
  private _gl: NISGL;
  private _program: WebGLProgram;
  private _linked: boolean = false;

  constructor(gl: NISGL, program: WebGLProgram) {
    this._gl = gl;
    this._program = program;
  }

  public get getProgram(): WebGLProgram {
    return this._program;
  }

  public deleteProgram(): void {
    this._gl.getGLContext().deleteProgram(this._program);
  }

  public useProgram(): void {
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

  public getAttributeLocation(name: string): number {
    const gl = this._gl.getGLContext();
    const program = this._program;

    return gl.getAttribLocation(program, name);
  }

  public getUniformLocation(name: string) {
    const gl = this._gl.getGLContext();

    return gl.getUniformLocation(this._program, name);
  }

  public setAttribute(
    name: string,
    size: GLint,
    type: number = GL_CONST.FLOAT,
    normalized: boolean = false,
    stride: number = 0,
    offset: number = 0
  ) {
    const gl = this._gl.getGLContext();
    const attributeLocation = this.getAttributeLocation(name);

    if (attributeLocation === -1) {
      this._gl.emitMessage('Not found Attribute Location');
    }

    gl.enableVertexAttribArray(attributeLocation);
    gl.vertexAttribPointer(attributeLocation, size, type, normalized, stride, offset);

  }
}
