import GL_CONST from './constants';
import { NISGL } from "./NISGL";

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

  public bindBuffer(
    type: number = GL_CONST.ARRAY_BUFFER,
    source: ArrayBuffer | ArrayBufferView,
    usage: number = GL_CONST.STATIC_DRAW
  ): void {
    const gl = this._gl.getGLContext();
    gl.bindBuffer(type, this.getBuffer());
    gl.bufferData(type, source, usage);
    gl.bindBuffer(type, null);
  }
}