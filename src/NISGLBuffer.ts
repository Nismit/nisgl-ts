import GL_CONST from './constants';
import NISGL from './NISGL';

export default class NISGLBuffer {
  private _gl: NISGL;
  private _buffer: WebGLBuffer;
  private _isCreatedBuffer: boolean = false;

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
    this._isCreatedBuffer = false;
  }

  /**
   * Bind buffer data
   * Must be created buffer data before run this function
   * @param type Bind type allow 'position' or 'index'
   */
  public bindBuffer(type: string): void {
    const gl = this._gl.context;

    if(this._isCreatedBuffer) {
      switch(type) {
        case 'position':
          gl.bindBuffer(gl.ARRAY_BUFFER, this._buffer);
          break;
        case 'index':
          gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this._buffer);
          break;
        default:
          this._gl.emitMessage('Incorrect bind type. Should be "position" or "index"');
          return;
      }
    } else {
      this._gl.emitMessage('This buffer is not created yet');
      return;
    }
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
    this._isCreatedBuffer = true;
  }

  public createVertexIndex(
    source: ArrayBuffer | ArrayBufferView,
    usage: number = GL_CONST.STATIC_DRAW
  ): void {
    const gl = this._gl.context;
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this._buffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, source, usage);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
    this._isCreatedBuffer = true;
  }
}