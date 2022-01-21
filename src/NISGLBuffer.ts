import { NISGLProgram } from "./NISGLProgram";

const GL_STATIC_DRAW = 0x88e4;
const GL_FLOAT = 0x1406;

type AttributeType = {
  name: string;
  size: number;
  type: GLenum;
  normalized: boolean;
  stride: number;
  offset: number;
};
export class NISGLBuffer {
  readonly _gl: WebGLRenderingContext;
  readonly _buffer: WebGLBuffer;
  readonly _bufferType: number;
  private _usage: GLenum = GL_STATIC_DRAW;
  private _attribs: AttributeType[];
  private _type: GLenum;

  constructor(
    gl: WebGLRenderingContext,
    buffer: WebGLBuffer,
    mode: "array" | "index",
    data?: BufferSource,
    type?: GLenum
  ) {
    this._gl = gl;
    this._buffer = buffer;
    this._attribs = [];
    this._bufferType =
      mode === "index" ? gl.ELEMENT_ARRAY_BUFFER : gl.ARRAY_BUFFER;
    this._type = type ? type : gl.UNSIGNED_SHORT;

    if (data) {
      this.data(data);
    }
  }

  /**
   * Get buffer instance
   * @return {WebGLBuffer} WebGLBuffer
   */
  get getBuffer(): WebGLBuffer {
    return this._buffer;
  }

  /**
   * Bind buffer
   */
  bind() {
    this._gl.bindBuffer(this._bufferType, this._buffer);
  }

  /**
   * Set IndexBuffer Type
   * @param {GLenum} type
   */
  setType(type: GLenum) {
    this._type = type;
  }

  /**
   * Dispose the buffer
   */
  dispose(): void {
    this._gl.deleteBuffer(this._buffer);
  }

  /**
   * Set data into the buffer
   * @param source
   */
  data(source: BufferSource) {
    const gl = this._gl;
    gl.bindBuffer(this._bufferType, this._buffer);
    gl.bufferData(this._bufferType, source, this._usage);
    gl.bindBuffer(this._bufferType, null);
  }

  /**
   * Store attribute data
   * @param {string} name Attibute name
   * @param size Size of geometry object, Must be 1,2,3 or 4 (e.g. x,y,z object is 3)
   * @param type Specifying the data type, default GL_FLOAT (0x1406)
   * @param normalized Normalized VBO, default false
   * @param stride default 0
   * @param offset default 0
   */
  attrib(
    name: string,
    size: number,
    type: GLenum = GL_FLOAT,
    normalized: boolean = false,
    stride: number = 0,
    offset: number = 0
  ) {
    if (!name && !size) {
      throw new Error("Buffer attribute name or size does not set properly");
    }

    this._attribs.push({
      name,
      size,
      type,
      normalized,
      stride,
      offset,
    });
  }

  /**
   * Subscribe VBO attributes
   * @param {NISGLProgram} program
   */
  attribPointer(program: NISGLProgram) {
    const gl = this._gl;

    if (this._attribs.length <= 0) {
      throw new Error("Buffer does not set any attribute");
    }

    this._attribs.forEach((attrib) => {
      const attribLocation = gl.getAttribLocation(
        program.getProgram,
        attrib.name
      );
      if (attribLocation !== -1) {
        gl.bindBuffer(this._bufferType, this._buffer);
        gl.enableVertexAttribArray(attribLocation);
        gl.vertexAttribPointer(
          attribLocation,
          attrib.size,
          attrib.type,
          attrib.normalized,
          attrib.stride,
          attrib.offset
        );
      }
    });
  }

  /**
   * Shortcut of Draw function
   * @param {GLenum} mode
   * @param {number} count
   * @param {number} offset
   */
  draw(mode: GLenum, count: number, offset: number = 0) {
    const gl = this._gl;
    if (this._bufferType === gl.ELEMENT_ARRAY_BUFFER) {
      gl.drawElements(mode, count, this._type, offset);
    } else {
      gl.drawArrays(mode, count, offset);
    }
  }

  drawPoints(count: number, offset: number) {
    this.draw(0, count, offset);
  }

  drawLines(count: number, offset: number) {
    this.draw(1, count, offset);
  }

  drawLineLoop(count: number, offset: number) {
    this.draw(2, count, offset);
  }

  drawLineStrip(count: number, offset: number) {
    this.draw(3, count, offset);
  }

  drawTriangles(count: number, offset: number) {
    this.draw(4, count, offset);
  }

  drawTriangleStrips(count: number, offset: number) {
    this.draw(5, count, offset);
  }

  drawTriangleFan(count: number, offset: number) {
    this.draw(6, count, offset);
  }
}
