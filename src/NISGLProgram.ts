export class NISGLProgram {
  private _gl: WebGLRenderingContext;
  private _program: WebGLProgram;
  private _vertex: WebGLShader;
  private _fragment: WebGLShader;
  private _linked: boolean = false;
  private _strict: boolean = false;

  constructor(
    gl: WebGLRenderingContext,
    program: WebGLProgram,
    vertex?: string,
    fragment?: string
  ) {
    this._gl = gl;
    this._program = program;
    this._vertex = <WebGLShader>gl.createShader(gl.VERTEX_SHADER);
    this._fragment = <WebGLShader>gl.createShader(gl.FRAGMENT_SHADER);

    gl.attachShader(this._program, this._vertex);
    gl.attachShader(this._program, this._fragment);

    if (vertex && fragment) {
      this.compile(vertex, fragment);
    }
  }

  /**
   * Get program instance
   * @return {NISGLProgram} NISGLProgram
   */
  public get getProgram(): WebGLProgram {
    return this._program;
  }

  /**
   * Delete program
   */
  public dispose(): void {
    this._linked = false;
    this._gl.deleteProgram(this._program);
    this._gl.deleteShader(this._vertex);
    this._gl.deleteShader(this._fragment);
  }

  /**
   * Use Program
   */
  public use() {
    if (!this._linked) {
      throw new Error("This program is not linked yet");
    }

    this._gl.useProgram(this._program);
  }

  /**
   * Compile shaders then link to program
   * @param {string} vertex - Vertex shader source
   * @param {string} fragment - Fragment shader source
   * @return {boolean}
   */
  public compile(vertex: string, fragment: string) {
    const gl = this._gl;

    if (
      !(
        compileShader(gl, this._vertex, vertex) &&
        compileShader(gl, this._fragment, fragment)
      )
    ) {
      return false;
    }

    gl.linkProgram(this._program);

    this._linked = gl.getProgramParameter(this._program, this._gl.LINK_STATUS);

    if (!this._linked) {
      console.error(gl.getProgramInfoLog(this._program));
      return false;
    }

    return true;
  }

  /**
   * Get strict mode
   * @return {boolean} Strict mode
   */
  public get isStrict(): boolean {
    return this._strict;
  }

  /**
   * Toggle strict mode
   */
  public setStrict(): void {
    this._strict = this._strict ? false : true;
  }

  /**
   * Get uniform location
   * @param {string} name Uniform name from a shader
   * @return {WebGLUniformLocation} Return uniform index number
   */
  public getUniformLocation(name: string) {
    return this._gl.getUniformLocation(this._program, name);
  }

  /**
   * Set a value into the uniform
   * @param {string} type Uniform type
   * @param {string} name Uniform name
   * @param {number[]} value Value which can be set several value in an array
   */
  public setUniform(type: string, name: string, ...value: number[]): void {
    const fn = (this as any)["uniform" + type];
    const uniformLocation = this.getUniformLocation(name);

    if (uniformLocation === null && this._strict) {
      console.error("Not found Uniform Location or Does not use in the shader");
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
    this._gl.uniform1i(location, value);
  }

  /**
   * Attach values to the uniform2i
   * @param location Uniform Location
   * @param x An integer value
   * @param y An integer value
   */
  public uniform2i(location: WebGLUniformLocation, x: number, y: number): void {
    this._gl.uniform2i(location, x, y);
  }

  /**
   * Attach values to the uniform3i
   * @param location Uniform Location
   * @param x An integer value
   * @param y An integer value
   * @param z An integer value
   */
  public uniform3i(
    location: WebGLUniformLocation,
    x: number,
    y: number,
    z: number
  ): void {
    this._gl.uniform3i(location, x, y, z);
  }

  /**
   * Attach values to the uniform4i
   * @param location Uniform Location
   * @param x An integer value
   * @param y An integer value
   * @param z An integer value
   * @param w An integer value
   */
  public uniform4i(
    location: WebGLUniformLocation,
    x: number,
    y: number,
    z: number,
    w: number
  ): void {
    this._gl.uniform4i(location, x, y, z, w);
  }

  /**
   * Attach values to the uniform1f
   * @param location Uniform Location
   * @param value A floating point value
   */
  public uniform1f(location: WebGLUniformLocation, value: number): void {
    this._gl.uniform1f(location, value);
  }

  /**
   * Attach values to the uniform2f
   * @param location Uniform Location
   * @param x A floating point value
   * @param y A floating point value
   */
  public uniform2f(location: WebGLUniformLocation, x: number, y: number): void {
    this._gl.uniform2f(location, x, y);
  }

  /**
   * Attach values to the uniform3i
   * @param location Uniform Location
   * @param x A floating point value
   * @param y A floating point value
   * @param z A floating point value
   */
  public uniform3f(
    location: WebGLUniformLocation,
    x: number,
    y: number,
    z: number
  ): void {
    this._gl.uniform3f(location, x, y, z);
  }

  /**
   * Attach values to the uniform4i
   * @param location Uniform Location
   * @param x A floating point value
   * @param y A floating point value
   * @param z A floating point value
   * @param w A floating point value
   */
  public uniform4f(
    location: WebGLUniformLocation,
    x: number,
    y: number,
    z: number,
    w: number
  ): void {
    this._gl.uniform4f(location, x, y, z, w);
  }

  /**
   * Attach values to the uniform1fv
   * @param location Uniform Location
   * @param value A floating point value in floating array
   */
  public uniform1fv(location: WebGLUniformLocation, value: Float32List): void {
    this._gl.uniform1fv(location, value);
  }

  /**
   * Attach values to the uniform2fv
   * @param location Uniform Location
   * @param value Floating point values in floating array
   */
  public uniform2fv(location: WebGLUniformLocation, value: Float32List): void {
    this._gl.uniform2fv(location, value);
  }

  /**
   * Attach values to the uniform3fv
   * @param location Uniform Location
   * @param value Floating point values in floating array
   */
  public uniform3fv(location: WebGLUniformLocation, value: Float32List): void {
    this._gl.uniform3fv(location, value);
  }

  /**
   * Attach values to the uniform4fv
   * @param location Uniform Location
   * @param value Floating point values in floating array
   */
  public uniform4fv(location: WebGLUniformLocation, value: Float32List): void {
    this._gl.uniform4fv(location, value);
  }

  /**
   * Attach values to the uniform1iv
   * @param location Uniform Location
   * @param value A integer value in an array
   */
  public uniform1iv(location: WebGLUniformLocation, value: Int32List): void {
    this._gl.uniform1iv(location, value);
  }

  /**
   * Attach values to the uniform2iv
   * @param location Uniform Location
   * @param value Integer values in an array
   */
  public uniform2iv(location: WebGLUniformLocation, value: Int32List): void {
    this._gl.uniform2iv(location, value);
  }

  /**
   * Attach values to the uniform3iv
   * @param location Uniform Location
   * @param value Integer values in an array
   */
  public uniform3iv(location: WebGLUniformLocation, value: Int32List): void {
    this._gl.uniform3iv(location, value);
  }

  /**
   * Attach values to the uniform4iv
   * @param location Uniform Location
   * @param value Integer values in an array
   */
  public uniform4iv(location: WebGLUniformLocation, value: Int32List): void {
    this._gl.uniform4iv(location, value);
  }

  /**
   * Attach values to the uniform2fv
   * @param location Uniform Location
   * @param value Integer values in an array
   * @param transpose Must be always false
   */
  public uniformMatrix2fv(
    location: WebGLUniformLocation,
    value: Float32Array,
    transpose: boolean = false
  ): void {
    this._gl.uniformMatrix2fv(location, transpose, value);
  }

  /**
   * Attach values to the uniform3fv
   * @param location Uniform Location
   * @param value Integer values in an array
   * @param transpose Must be always false
   */
  public uniformMatrix3fv(
    location: WebGLUniformLocation,
    value: Float32Array,
    transpose: boolean = false
  ): void {
    this._gl.uniformMatrix3fv(location, transpose, value);
  }

  /**
   * Attach values to the uniform4vv
   * @param location Uniform Location
   * @param value Integer values in an array
   * @param transpose Must be always false
   */
  public uniformMatrix4fv(
    location: WebGLUniformLocation,
    value: Float32Array,
    transpose: boolean = false
  ): void {
    this._gl.uniformMatrix4fv(location, transpose, value);
  }
}

// util
function compileShader(
  gl: WebGLRenderingContext,
  shader: WebGLShader,
  source: string
) {
  gl.shaderSource(shader, source);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error(gl.getShaderInfoLog(shader));
    return false;
  }

  return true;
}
