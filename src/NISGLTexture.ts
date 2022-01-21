export class NISGLTexture {
  readonly _gl: WebGLRenderingContext;
  readonly _texture: WebGLTexture;
  private _width: number;
  private _height: number;

  constructor(gl: WebGLRenderingContext) {
    this._gl = gl;
    this._texture = <WebGLTexture>gl.createTexture();
    this._width = 0;
    this._height = 0;
  }

  /**
   *
   * @param {number} id
   */
  public bind(id?: number): void {
    const gl = this._gl;
    if (id !== undefined) {
      gl.activeTexture(gl.TEXTURE0 + (0 | id));
    }
    gl.bindTexture(gl.TEXTURE_2D, this._texture);
  }

  public dispose() {
    const gl = this._gl;
    gl.deleteTexture(this._texture);
  }

  /**
   * Set texture from image (e.g. jpg/png)
   * @param {TexImageSource} source
   */
  public fromImage(source: TexImageSource): void {
    const gl = this._gl;

    this._width = source.width;
    this._height = source.height;

    gl.bindTexture(gl.TEXTURE_2D, this._texture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, source);

    // need to generate mipmap?
    gl.generateMipmap(gl.TEXTURE_2D);

    // TODO configurable
    // gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    // gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    // gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    // gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
  }

  // prettier-ignore
  public fromData(width: number, height:number, data: ArrayBufferView | null) {
    const gl = this._gl;

    this._width = width;
    this._height = height;

    data = data || null;

    gl.bindTexture(gl.TEXTURE_2D, this._texture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, this._width, this._height, 0, gl.RGBA, gl.UNSIGNED_BYTE, data);

    // TODO configurable
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  }
}
