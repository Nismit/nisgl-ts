export class NISGLTexture {
  readonly _gl: WebGLRenderingContext;
  readonly _texture: WebGLTexture;
  private _width: number;
  private _height: number;
  private _format: GLenum;

  constructor(gl: WebGLRenderingContext, format?: GLenum) {
    this._gl = gl;
    this._texture = <WebGLTexture>gl.createTexture();
    this._width = 0;
    this._height = 0;
    this._format = format || gl.UNSIGNED_BYTE;
    // this.setFilter(true, false, false);
  }

  /**
   * Bind Texture
   * @param {number} id - Set Active Texture (Default: 0)
   */
  public bind(id?: number): void {
    const gl = this._gl;
    if (id !== undefined) {
      gl.activeTexture(gl.TEXTURE0 + (0 | id));
    }
    gl.bindTexture(gl.TEXTURE_2D, this._texture);
  }

  /**
   * Dispose Texture
   */
  public dispose() {
    const gl = this._gl;
    gl.deleteTexture(this._texture);
  }

  /**
   * Set Texture Format
   * @param {GLenum} format
   */
  public setFormat(format: GLenum) {
    this._format = format;
  }

  /**
   * Set filter to texture
   * @example
   * Parameter list:
   * false, false, false = gl.NEAREST (9728) - Defualt
   * true, false, false = gl.LINEAR (9729)
   * false, true, false = gl.NEAREST_MIPMAP_NEAREST (9984)
   * true, true, false =  gl.LINEAR_MIPMAP_NEAREST (9985)
   * false, true, true = gl.LNEAREST_MIPMAP_LINEAR (9986)
   * true, true, true = gl.LINEAR_MIPMAP_LINEAR (9987)
   * false, false, true = gl.NEAREST (9728)
   *
   * @param {boolean} liner
   * @param {boolean} nearMipmap
   * @param {boolean} linerMipmap
   */
  public setFilter(
    liner: boolean = false,
    nearMipmap: boolean = false,
    linerMipmap: boolean = false
  ) {
    const gl = this._gl;
    gl.texParameteri(
      gl.TEXTURE_2D,
      gl.TEXTURE_MAG_FILTER,
      getFilterConstants(liner, false, false)
    );
    gl.texParameteri(
      gl.TEXTURE_2D,
      gl.TEXTURE_MIN_FILTER,
      getFilterConstants(liner, nearMipmap, linerMipmap)
    );
  }

  /**
   * Set Repeat Wrap
   */
  public setRepeatWrap() {
    const gl = this._gl;
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);
  }

  /**
   * Set Clamp Wrap
   */
  public setClampWrap() {
    const gl = this._gl;
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  }

  /**
   * Set Mirror Wrap
   */
  public setMirrorWrap() {
    const gl = this._gl;
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.MIRRORED_REPEAT);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.MIRRORED_REPEAT);
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
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, this._format, source);

    // need to generate mipmap?
    // gl.generateMipmap(gl.TEXTURE_2D);
  }

  // prettier-ignore
  public fromData(width: number, height:number, data: ArrayBufferView | null) {
    const gl = this._gl;

    this._width = width;
    this._height = height;

    data = data || null;

    gl.bindTexture(gl.TEXTURE_2D, this._texture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, this._width, this._height, 0, gl.RGBA, this._format, data);
  }
}

// util
/**
 * Get WebGL Texture Constants
 * @param {boolean} liner
 * @param {boolean} nearMipmap
 * @param {boolean} linerMipmap
 * @returns {GLenum} Return Texture Constants
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API/Constants#textures}
 */
function getFilterConstants(
  liner: boolean,
  nearMipmap: boolean,
  linerMipmap: boolean
): GLenum {
  return (
    0x2600 | +liner | (+nearMipmap << 8) | (+(nearMipmap && linerMipmap) << 1)
  );
}
