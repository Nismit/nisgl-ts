export declare class NISGLTexture {
    readonly _gl: WebGLRenderingContext;
    readonly _texture: WebGLTexture;
    private _width;
    private _height;
    constructor(gl: WebGLRenderingContext);
    /**
     *
     * @param {number} id
     */
    bind(id?: number): void;
    dispose(): void;
    /**
     * Set texture from image (e.g. jpg/png)
     * @param {TexImageSource} source
     */
    fromImage(source: TexImageSource): void;
    fromData(width: number, height: number, data: ArrayBufferView | null): void;
}
