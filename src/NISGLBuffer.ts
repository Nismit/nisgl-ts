import GL_CONST from './constants';
import { NISGL } from './NISGL';

export class NISGLBuffer {
  private _gl: NISGL;
  private _buffer: WebGLBuffer;

  constructor(gl: NISGL, buffer: WebGLBuffer) {
    this._gl = gl;
    this._buffer = buffer;
  }

  /**
   * Get buffer instance
   * @return Return WebGLBuffer
   */
  public get getBuffer(): WebGLBuffer {
    return this._buffer;
  }

  /**
   * Delete buffer
   */
  public deleteBuffer(): void {
    const gl = this._gl.context;
    gl.deleteBuffer(this._buffer);
  }

  /**
   * Attach vertex model data into the buffer
   * @param source A model data
   * @param usage Type of the model data, default GL_CONST.STATIC_DRAW
   */
  public createVertexPosition(
    source: ArrayBuffer | ArrayBufferView,
    usage: number = GL_CONST.STATIC_DRAW
  ): void {
    const gl = this._gl.context;
    gl.bindBuffer(gl.ARRAY_BUFFER, this._buffer);
    gl.bufferData(gl.ARRAY_BUFFER, source, usage);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);
  }

  public createVertexIndex(
    source: ArrayBuffer | ArrayBufferView,
    usage: number = GL_CONST.STATIC_DRAW
  ): void {
    const gl = this._gl.context;
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this._buffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, source, usage);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
  }
}