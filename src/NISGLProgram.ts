import GL_CONST from './constants';
import NISGL from './NISGL';
import NISGLShader from './NISGLShader';
import NISGLBuffer from './NISGLBuffer';

export default class NISGLProgram {
  private _gl: NISGL;
  private _program: WebGLProgram;
  private _linked: boolean = false;

  constructor(gl: NISGL, program: WebGLProgram) {
    this._gl = gl;
    this._program = program;
  }

  /**
   * Get program instance
   * @return Return WebGLProgram
   */
  public get getProgram(): WebGLProgram {
    return this._program;
  }

  /**
   * Delete program
   */
  public deleteProgram(): void {
    this._linked = false;
    this._gl.context.deleteProgram(this._program);
  }

  /**
   * Link shaders to the program
   * @param shaders Vertex and Fragment shaders
   */
  public linkProgram(shaders: NISGLShader[]): void {
    const gl = this._gl.context;

    shaders.forEach(shader => { gl.attachShader(this._program, shader.getShader()) });
    gl.linkProgram(this._program);
    this._linked = gl.getProgramParameter(this._program, gl.LINK_STATUS);

    if (!this._linked) {
      this._gl.emitMessage(gl.getProgramInfoLog(this._program));
      return;
    }
  }

  /**
   * Get attribute location
   * @param name Attribute name from a shader
   * @return Return attribute index number
   */
  public getAttributeLocation(name: string): number {
    const gl = this._gl.context;
    const program = this._program;

    return gl.getAttribLocation(program, name);
  }

  /**
   * Get uniform location
   * @param name Uniform name from a shader
   * @return Return uniform index number
   */
  public getUniformLocation(name: string) {
    const gl = this._gl.context;
    const program = this._program;

    return gl.getUniformLocation(program, name);
  }

  /**
   * Set 3D geometry object to vertex shader
   * @param name Attibute name
   * @param size Size of geometry object, Must be 1,2,3 or 4 (e.g. x,y,z object is 3)
   * @param buffer Vertex Buffer Object(VBO) which is already set value
   * @param type Specifying the data type, default GL_CONST.FLOAT
   * @param normalized Normalized VBO, default false
   * @param stride default 0
   * @param offset default 0
   */
  public setAttribute(
    name: string,
    size: GLint,
    buffer: NISGLBuffer | null,
    type: number = GL_CONST.FLOAT,
    normalized: boolean = false,
    stride: number = 0,
    offset: number = 0
  ): void {
    const gl = this._gl.context;
    const attributeLocation = this.getAttributeLocation(name);

    if (attributeLocation === -1) {
      this._gl.emitMessage('Not found Attribute Location');
      return;
    }

    if (buffer === null) {
      this._gl.emitMessage('Buffer Object does not set');
      return;
    }

    buffer.bindBuffer('position');
    gl.enableVertexAttribArray(attributeLocation);
    gl.vertexAttribPointer(attributeLocation, size, type, normalized, stride, offset);
  }

  /**
   * Set a value into the uniform
   * @param type Uniform type
   * @param name Uniform name
   * @param value Value which can be set several value in an array
   */
  public setUniform(type: string, name: string, ...value: number[]): void {
    const fn = (this as any)['uniform' + type];
    const uniformLocation = this.getUniformLocation(name);

    if (uniformLocation === null) {
      this._gl.emitMessage('Not found Uniform Location or Does not use in the shader');
      return;
    }

    fn.call(this, uniformLocation, ...value);
  }

  /**
   * Attach values to the uniform1i
   * @param location Uniform Location 
   * @param value An integer value
   */
  public uniform1i(location: WebGLUniformLocation, value: number): void {
    const gl = this._gl.context;
    gl.uniform1i(location, value);
  }

  /**
   * Attach values to the uniform2i
   * @param location Uniform Location 
   * @param x An integer value
   * @param y An integer value
   */
  public uniform2i(location: WebGLUniformLocation, x: number, y: number): void {
    const gl = this._gl.context;
    gl.uniform2i(location, x, y);
  }

  /**
   * Attach values to the uniform3i
   * @param location Uniform Location 
   * @param x An integer value
   * @param y An integer value
   * @param z An integer value
   */
  public uniform3i(location: WebGLUniformLocation, x: number, y: number, z: number): void {
    const gl = this._gl.context;
    gl.uniform3i(location, x, y, z);
  }

  /**
   * Attach values to the uniform4i
   * @param location Uniform Location 
   * @param x An integer value
   * @param y An integer value
   * @param z An integer value
   * @param w An integer value
   */
  public uniform4i(location: WebGLUniformLocation, x: number, y: number, z: number, w: number): void {
    const gl = this._gl.context;
    gl.uniform4i(location, x, y, z, w);
  }

  /**
   * Attach values to the uniform1f
   * @param location Uniform Location 
   * @param value A floating point value
   */
  public uniform1f(location: WebGLUniformLocation, value: number): void {
    const gl = this._gl.context;
    gl.uniform1f(location, value);
  }

  /**
   * Attach values to the uniform2f
   * @param location Uniform Location 
   * @param x A floating point value
   * @param y A floating point value
   */
  public uniform2f(location: WebGLUniformLocation, x: number, y: number): void {
    const gl = this._gl.context;
    gl.uniform2f(location, x, y);
  }

  /**
   * Attach values to the uniform3i
   * @param location Uniform Location 
   * @param x A floating point value
   * @param y A floating point value
   * @param z A floating point value
   */
  public uniform3f(location: WebGLUniformLocation, x: number, y: number, z: number): void {
    const gl = this._gl.context;
    gl.uniform3f(location, x, y, z);
  }

  /**
   * Attach values to the uniform4i
   * @param location Uniform Location 
   * @param x A floating point value
   * @param y A floating point value
   * @param z A floating point value
   * @param w A floating point value
   */
  public uniform4f(location: WebGLUniformLocation, x: number, y: number, z: number, w: number): void {
    const gl = this._gl.context;
    gl.uniform4f(location, x, y, z, w);
  }

  /**
   * Attach values to the uniform1fv
   * @param location Uniform Location 
   * @param value A floating point value in floating array
   */
  public uniform1fv(location: WebGLUniformLocation, value: Float32List): void {
    const gl = this._gl.context;
    gl.uniform1fv(location, value);
  }

  /**
   * Attach values to the uniform2fv
   * @param location Uniform Location 
   * @param value Floating point values in floating array
   */
  public uniform2fv(location: WebGLUniformLocation, value: Float32List): void {
    const gl = this._gl.context;
    gl.uniform2fv(location, value);
  }

  /**
   * Attach values to the uniform3fv
   * @param location Uniform Location 
   * @param value Floating point values in floating array
   */
  public uniform3fv(location: WebGLUniformLocation, value: Float32List): void {
    const gl = this._gl.context;
    gl.uniform3fv(location, value);
  }

  /**
   * Attach values to the uniform4fv
   * @param location Uniform Location 
   * @param value Floating point values in floating array
   */
  public uniform4fv(location: WebGLUniformLocation, value: Float32List): void {
    const gl = this._gl.context;
    gl.uniform4fv(location, value);
  }

  /**
   * Attach values to the uniform1iv
   * @param location Uniform Location 
   * @param value A integer value in an array
   */
  public uniform1iv(location: WebGLUniformLocation, value: Int32List): void {
    const gl = this._gl.context;
    gl.uniform1iv(location, value);
  }

  /**
   * Attach values to the uniform2iv
   * @param location Uniform Location 
   * @param value Integer values in an array
   */
  public uniform2iv(location: WebGLUniformLocation, value: Int32List): void {
    const gl = this._gl.context;
    gl.uniform2iv(location, value);
  }

  /**
   * Attach values to the uniform3iv
   * @param location Uniform Location 
   * @param value Integer values in an array
   */
  public uniform3iv(location: WebGLUniformLocation, value: Int32List): void {
    const gl = this._gl.context;
    gl.uniform3iv(location, value);
  }

  /**
   * Attach values to the uniform4iv
   * @param location Uniform Location 
   * @param value Integer values in an array
   */
  public uniform4iv(location: WebGLUniformLocation, value: Int32List): void {
    const gl = this._gl.context;
    gl.uniform4iv(location, value);
  }

  /**
   * Attach values to the uniform2fv
   * @param location Uniform Location 
   * @param value Integer values in an array
   * @param transpose Must be always false
   */
  public uniformMatrix2fv(location: WebGLUniformLocation, value: Float32Array, transpose: boolean = false): void {
    const gl = this._gl.context;
    gl.uniformMatrix2fv(location, transpose, value);
  }

  /**
   * Attach values to the uniform3fv
   * @param location Uniform Location 
   * @param value Integer values in an array
   * @param transpose Must be always false
   */
  public uniformMatrix3fv(location: WebGLUniformLocation, value: Float32Array, transpose: boolean = false): void {
    const gl = this._gl.context;
    gl.uniformMatrix3fv(location, transpose, value);
  }

  /**
   * Attach values to the uniform4vv
   * @param location Uniform Location 
   * @param value Integer values in an array
   * @param transpose Must be always false
   */
  public uniformMatrix4fv(location: WebGLUniformLocation, value: Float32Array, transpose: boolean = false): void {
    const gl = this._gl.context;
    gl.uniformMatrix4fv(location, transpose, value);
  }
}
