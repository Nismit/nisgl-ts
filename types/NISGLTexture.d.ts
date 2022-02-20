export declare class NISGLTexture {
    readonly _gl: WebGLRenderingContext;
    readonly _texture: WebGLTexture;
    private _width;
    private _height;
    private _format;
    constructor(gl: WebGLRenderingContext, format?: GLenum);
    /**
     * Bind Texture
     * @param {number} id - Set Active Texture (Default: 0)
     */
    bind(id?: number): void;
    /**
     * Dispose Texture
     */
    dispose(): void;
    /**
     * Set Texture Format
     * @param {GLenum} format
     */
    setFormat(format: GLenum): void;
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
    setFilter(liner?: boolean, nearMipmap?: boolean, linerMipmap?: boolean): void;
    /**
     * Set Repeat Wrap
     */
    setRepeatWrap(): void;
    /**
     * Set Clamp Wrap
     */
    setClampWrap(): void;
    /**
     * Set Mirror Wrap
     */
    setMirrorWrap(): void;
    /**
     * Set texture from image (e.g. jpg/png)
     * @param {TexImageSource} source
     */
    fromImage(source: TexImageSource): void;
    fromData(width: number, height: number, data: ArrayBufferView | null): void;
}
