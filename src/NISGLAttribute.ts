import GL_CONST from './constants';
import { NISGL } from './NISGL';
import { NISGLProgram } from './NISGLProgram';

export class NISGLAttribute {
  private _gl: NISGL;
  private _program: NISGLProgram;
  private _isEnabled: boolean = false;

  constructor(gl: NISGL, program: NISGLProgram) {
    this._gl = gl;
    this._program = program;
  }

  public getAttributeLocation(name: string): GLint | void {
    const gl = this._gl.getGLContext();
    const program = this._program.getProgram();

    if (gl.getAttribLocation(program, name) !== -1) {
      return gl.getAttribLocation(program, name);
    } else {
      this._gl.emitMessage('Not found Attribute Location');
      return;
    }
  }

  public enableVertexAttribute(index: GLint) {
    const gl = this._gl.getGLContext();
    gl.enableVertexAttribArray(index);
    this._isEnabled = true;
  }

  public vertexAttributePointer(
    index: GLint,
    size: GLint,
    type: number = GL_CONST.FLOAT,
    normalized: boolean = false,
    stride: number = 0,
    offset: number = 0
  ) {
    const gl = this._gl.getGLContext();
    if (this._isEnabled) {
      gl.vertexAttribPointer(index, size, type, normalized, stride, offset);
    } else {
      this._gl.emitMessage('Not enabled vertex attribute yet');
    }
  }
}