import { NISGL } from "./NISGL";

export class NISGLBuffer {
  private _gl: NISGL;
  private _buffer: WebGLBuffer;

  constructor(gl: NISGL, buffer: WebGLBuffer) {
    this._gl = gl;
    this._buffer = buffer;
  }

  public getBuffer() {
    return this._buffer;
  }

  public createVertexBufferObject() {
    const gl = this._gl.getGLContext();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.getBuffer());
  }
}