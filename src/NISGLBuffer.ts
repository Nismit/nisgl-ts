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

  public createVertexBufferObject(source: ArrayBuffer | ArrayBufferView, usage: number) {
    const gl = this._gl.getGLContext();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.getBuffer());
    gl.bufferData(gl.ARRAY_BUFFER, source, gl.STATIC_DRAW);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);
  }

  public createIndexBufferObject(source: ArrayBuffer | ArrayBufferView, usage: number) {
    const gl = this._gl.getGLContext();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.getBuffer());
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, source, gl.STATIC_DRAW);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
  }
}