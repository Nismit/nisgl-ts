import GL_CONST from './constants';
import { NISGL } from './NISGL';
import { NISGLShader } from './NISGLShader';

export class NISGLProgram {
  private _gl: NISGL;
  private _program: WebGLProgram;
  private _linked: boolean = false;

  constructor(gl: NISGL, program: WebGLProgram) {
    this._gl = gl;
    this._program = program;
  }

  /**
   * 
   */
  public get getProgram(): WebGLProgram {
    return this._program;
  }

  /**
   * 
   */
  public deleteProgram(): void {
    this._gl.context.deleteProgram(this._program);
  }

  /**
   * 
   */
  public useProgram(): void {
    const gl = this._gl.context;

    if (this._linked) {
      gl.useProgram(this._program);
    } else {
      this._gl.emitMessage('Program has not linked yet.');
    }
  }

  /**
   * 
   * @param shaders 
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
   * 
   * @param name 
   */
  public getAttributeLocation(name: string): number {
    const gl = this._gl.context;
    const program = this._program;

    return gl.getAttribLocation(program, name);
  }

  /**
   * 
   * @param name 
   */
  public getUniformLocation(name: string) {
    const gl = this._gl.context;
    const program = this._program;

    return gl.getUniformLocation(program, name);
  }

  /**
   * 
   * @param name 
   * @param size 
   * @param type 
   * @param normalized 
   * @param stride 
   * @param offset 
   */
  public setAttribute(
    name: string,
    size: GLint,
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

    gl.enableVertexAttribArray(attributeLocation);
    gl.vertexAttribPointer(attributeLocation, size, type, normalized, stride, offset);
  }

  /**
   * 
   * @param type 
   * @param name 
   * @param value 
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
   * Attach values to the uniform
   * @param location WebGLUniformLocation - Uniform Location 
   * @param value 
   */
  public uniform1i(location: WebGLUniformLocation, value: number): void {
    const gl = this._gl.context;
    gl.uniform1i(location, value);
  }

  /**
   * Attach values to the uniform
   * @param location WebGLUniformLocation - Uniform Location 
   * @param x 
   * @param y 
   */
  public uniform2i(location: WebGLUniformLocation, x: number, y: number): void {
    const gl = this._gl.context;
    gl.uniform2i(location, x, y);
  }

  /**
   * Attach values to the uniform
   * @param location WebGLUniformLocation - Uniform Location 
   * @param x 
   * @param y 
   * @param z 
   */
  public uniform3i(location: WebGLUniformLocation, x: number, y: number, z: number): void {
    const gl = this._gl.context;
    gl.uniform3i(location, x, y, z);
  }

  /**
   * Attach values to the uniform
   * @param location WebGLUniformLocation - Uniform Location 
   * @param x 
   * @param y 
   * @param z 
   * @param w 
   */
  public uniform4i(location: WebGLUniformLocation, x: number, y: number, z: number, w: number): void {
    const gl = this._gl.context;
    gl.uniform4i(location, x, y, z, w);
  }

  /**
   * Attach values to the uniform
   * @param location WebGLUniformLocation - Uniform Location 
   * @param value 
   */
  public uniform1f(location: WebGLUniformLocation, value: number): void {
    const gl = this._gl.context;
    gl.uniform1f(location, value);
  }

  /**
   * Attach values to the uniform
   * @param location WebGLUniformLocation - Uniform Location 
   * @param x 
   * @param y 
   */
  public uniform2f(location: WebGLUniformLocation, x: number, y: number): void {
    const gl = this._gl.context;
    gl.uniform2f(location, x, y);
  }

  /**
   * Attach values to the uniform
   * @param location WebGLUniformLocation - Uniform Location 
   * @param x 
   * @param y 
   * @param z 
   */
  public uniform3f(location: WebGLUniformLocation, x: number, y: number, z: number): void {
    const gl = this._gl.context;
    gl.uniform3f(location, x, y, z);
  }

  /**
   * Attach values to the uniform
   * @param location WebGLUniformLocation - Uniform Location 
   * @param x 
   * @param y 
   * @param z 
   * @param w 
   */
  public uniform4f(location: WebGLUniformLocation, x: number, y: number, z: number, w: number): void {
    const gl = this._gl.context;
    gl.uniform4f(location, x, y, z, w);
  }

  /**
   * Attach values to the uniform
   * @param location WebGLUniformLocation - Uniform Location 
   * @param value 
   */
  public uniform1fv(location: WebGLUniformLocation, value: Float32List): void {
    const gl = this._gl.context;
    gl.uniform1fv(location, value);
  }

  /**
   * Attach values to the uniform
   * @param location WebGLUniformLocation - Uniform Location 
   * @param value 
   */
  public uniform2fv(location: WebGLUniformLocation, value: Float32List): void {
    const gl = this._gl.context;
    gl.uniform2fv(location, value);
  }

  /**
   * Attach values to the uniform
   * @param location WebGLUniformLocation - Uniform Location 
   * @param value 
   */
  public uniform3fv(location: WebGLUniformLocation, value: Float32List): void {
    const gl = this._gl.context;
    gl.uniform3fv(location, value);
  }

  /**
   * Attach values to the uniform
   * @param location WebGLUniformLocation - Uniform Location 
   * @param value 
   */
  public uniform4fv(location: WebGLUniformLocation, value: Float32List): void {
    const gl = this._gl.context;
    gl.uniform4fv(location, value);
  }

  /**
   * Attach values to the uniform
   * @param location WebGLUniformLocation - Uniform Location 
   * @param value 
   */
  public uniform1iv(location: WebGLUniformLocation, value: Int32List): void {
    const gl = this._gl.context;
    gl.uniform1iv(location, value);
  }

  /**
   * Attach values to the uniform
   * @param location WebGLUniformLocation - Uniform Location 
   * @param value 
   */
  public uniform2iv(location: WebGLUniformLocation, value: Int32List): void {
    const gl = this._gl.context;
    gl.uniform2iv(location, value);
  }

  /**
   * Attach values to the uniform
   * @param location WebGLUniformLocation - Uniform Location 
   * @param value 
   */
  public uniform3iv(location: WebGLUniformLocation, value: Int32List): void {
    const gl = this._gl.context;
    gl.uniform3iv(location, value);
  }

  /**
   * Attach values to the uniform
   * @param location WebGLUniformLocation - Uniform Location 
   * @param value 
   */
  public uniform4iv(location: WebGLUniformLocation, value: Int32List): void {
    const gl = this._gl.context;
    gl.uniform4iv(location, value);
  }
}
