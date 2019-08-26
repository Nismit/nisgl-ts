import GL_CONST from './constants';
import { NISGL } from './NISGL';

export class NISGLBuffer {
  private _gl: NISGL;
  private _buffer: WebGLBuffer;

  constructor(gl: NISGL, buffer: WebGLBuffer) {
    this._gl = gl;
    this._buffer = buffer;
  }

  public getBuffer(): WebGLBuffer {
    return this._buffer;
  }

  public createVertexPosition(
    source: ArrayBuffer | ArrayBufferView,
    usage: number = GL_CONST.STATIC_DRAW
  ): void {
    const gl = this._gl.getGLContext();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.getBuffer());
    gl.bufferData(gl.ARRAY_BUFFER, source, usage);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);
  }

  public createVertexIndex(
    source: ArrayBuffer | ArrayBufferView,
    usage: number = GL_CONST.STATIC_DRAW
  ): void {
    const gl = this._gl.getGLContext();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.getBuffer());
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, source, usage);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
  }
}