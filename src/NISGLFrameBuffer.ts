import { NISGLTexture } from "./NISGLTexture";

type AttachmentType = NISGLTexture | NISGLRenderBuffer;

export class NISGLFrameBuffer {
  readonly _gl: WebGLRenderingContext;
  readonly _frameBuffer: WebGLFramebuffer;
  private _width: number;
  private _height: number;
  private _attachments: Attachment[] = [];

  constructor(gl: WebGLRenderingContext, width?: number, height?: number) {
    this._gl = gl;
    this._width = width ? width : 0;
    this._height = height ? height : 0;

    this._frameBuffer = <WebGLFramebuffer>gl.createFramebuffer();
    this.bind();
  }

  /**
   * Bind FrameBuffer
   */
  public bind(): void {
    const gl = this._gl;
    gl.bindFramebuffer(gl.FRAMEBUFFER, this._frameBuffer);
  }

  /**
   * Unbind FrameBuffer
   */
  public unbind(): void {
    const gl = this._gl;
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
  }

  /**
   * Dispose the FrameBuffer instance
   */
  public dispose(): void {
    const gl = this._gl;
    gl.deleteFramebuffer(this._frameBuffer);
  }

  /**
   * Resize
   * If it has attachment(s), the attachments runs resize as well
   * @param {number} width
   * @param {number} height
   */
  public resize(width: number, height: number): void {
    this._width = width;
    this._height = height;

    this._attachments.forEach((attachment) => {
      attachment.resize(this._width, this._height);
    });
  }

  /**
   * Set Depth Buffer
   */
  public attachDepth() {
    const gl = this._gl;
    const attachment = new Attachment(new NISGLRenderBuffer(gl));
    attachment.attach();
    this._attachments[gl.DEPTH_ATTACHMENT] = attachment;
  }

  /**
   * Set Texture Buffer
   * @param {GLenum | undefined} format
   */
  public attachTexture(format?: GLenum, near?: boolean) {
    const gl = this._gl;
    const texture = new NISGLTexture(gl, format);
    texture.fromData(this._width, this._height, null);
    if (near) {
      texture.setFilter(false, false, false);
    }
    const attachment = new Attachment(texture);
    attachment.attach();
    this._attachments[gl.COLOR_ATTACHMENT0] = attachment;
  }

  /**
   * Get Depth Buffer
   * @returns {WebGLRenderbuffer | null}
   */
  public getDepth() {
    const gl = this._gl;
    const attachment = this._attachments[gl.DEPTH_ATTACHMENT];
    if (attachment) {
      return attachment._target;
    }

    console.warn("The depth framebuffer does not exist");

    return null;
  }

  /**
   * Get Texture Buffer
   * @returns {NISGLTexture | null}
   */
  public getTexture() {
    const gl = this._gl;
    const attachment = this._attachments[gl.COLOR_ATTACHMENT0];
    if (attachment) {
      return attachment._target;
    }

    console.warn("The color texture framebuffer does not exist");

    return null;
  }
}

class Attachment {
  readonly _target: AttachmentType;

  constructor(target: AttachmentType) {
    this._target = target;
  }

  /**
   * Resize target
   * @param {number} width
   * @param {number} height
   */
  public resize(width: number, height: number) {
    if (this._target instanceof NISGLTexture) {
      this._target.fromData(width, height, null);
    } else {
      this._target.resize(width, height);
    }
  }

  /**
   * Attach Texture or RenderBuffer to FrameBuffer
   */
  public attach() {
    const gl = this._target._gl;

    if (this._target instanceof NISGLTexture) {
      gl.framebufferTexture2D(
        gl.FRAMEBUFFER,
        gl.COLOR_ATTACHMENT0,
        gl.TEXTURE_2D,
        this._target._texture,
        0
      );
    } else {
      gl.framebufferRenderbuffer(
        gl.FRAMEBUFFER,
        gl.DEPTH_ATTACHMENT,
        gl.RENDERBUFFER,
        this._target._renderBuffer
      );
    }
  }

  /**
   * Deattach Texture or RenderBuffer to FrameBuffer
   */
  public deattach() {
    const gl = this._target._gl;

    if (this._target instanceof NISGLTexture) {
      gl.framebufferTexture2D(
        gl.FRAMEBUFFER,
        gl.COLOR_ATTACHMENT0,
        gl.TEXTURE_2D,
        null,
        0
      );
    } else {
      gl.framebufferRenderbuffer(
        gl.FRAMEBUFFER,
        gl.DEPTH_ATTACHMENT,
        gl.FRAMEBUFFER,
        null
      );
    }
  }

  /**
   * Dispose Target
   */
  public dispose() {
    this._target.dispose();
  }
}

class NISGLRenderBuffer {
  readonly _gl: WebGLRenderingContext;
  readonly _renderBuffer: WebGLRenderbuffer;
  private _width: number = 0;
  private _height: number = 0;

  constructor(gl: WebGLRenderingContext) {
    this._gl = gl;
    this._renderBuffer = <WebGLRenderbuffer>gl.createRenderbuffer();
  }

  /**
   * Bind RenderBuffer
   */
  public bind() {
    const gl = this._gl;
    gl.bindRenderbuffer(gl.RENDERBUFFER, this._renderBuffer);
  }

  /**
   * Dispose RenderBuffer
   */
  public dispose() {
    const gl = this._gl;
    gl.deleteRenderbuffer(this._renderBuffer);
  }

  /**
   * Resize RenderBuffer
   * @param {number} width
   * @param {number} height
   */
  public resize(width: number, height: number) {
    this._width = width;
    this._height = height;
    this.storage();
  }

  /**
   * Set width/height into RenderBuffer
   */
  public storage() {
    const gl = this._gl;
    gl.renderbufferStorage(
      gl.RENDERBUFFER,
      gl.DEPTH_COMPONENT16,
      this._width,
      this._height
    );
  }
}
