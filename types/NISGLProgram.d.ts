export declare class NISGLProgram {
    readonly _gl: WebGLRenderingContext;
    readonly _program: WebGLProgram;
    private _vertex;
    private _fragment;
    private _linked;
    private _strict;
    constructor(gl: WebGLRenderingContext, program: WebGLProgram, vertex?: string, fragment?: string);
    /**
     * Get program instance
     * @return {NISGLProgram} NISGLProgram
     */
    get getProgram(): WebGLProgram;
    /**
     * Delete program
     */
    dispose(): void;
    /**
     * Use Program
     */
    use(): void;
    /**
     * Compile shaders then link to program
     * @param {string} vertex - Vertex shader source
     * @param {string} fragment - Fragment shader source
     * @return {boolean}
     */
    compile(vertex: string, fragment: string): boolean;
    /**
     * Get strict mode
     * @return {boolean} Strict mode
     */
    get isStrict(): boolean;
    /**
     * Toggle strict mode
     */
    setStrict(): void;
    /**
     * Get uniform location
     * @param {string} name Uniform name from a shader
     * @return {WebGLUniformLocation} Return uniform index number
     */
    getUniformLocation(name: string): WebGLUniformLocation | null;
    /**
     * Set a value into the uniform
     * @param {string} type Uniform type
     * @param {string} name Uniform name
     * @param {number[]} value Value which can be set several value in an array
     */
    setUniform(type: string, name: string, ...value: number[]): void;
    /**
     * Attach values to the uniform1i
     * @param location Uniform Location
     * @param value An integer value
     */
    uniform1i(location: WebGLUniformLocation, value: number): void;
    /**
     * Attach values to the uniform2i
     * @param location Uniform Location
     * @param x An integer value
     * @param y An integer value
     */
    uniform2i(location: WebGLUniformLocation, x: number, y: number): void;
    /**
     * Attach values to the uniform3i
     * @param location Uniform Location
     * @param x An integer value
     * @param y An integer value
     * @param z An integer value
     */
    uniform3i(location: WebGLUniformLocation, x: number, y: number, z: number): void;
    /**
     * Attach values to the uniform4i
     * @param location Uniform Location
     * @param x An integer value
     * @param y An integer value
     * @param z An integer value
     * @param w An integer value
     */
    uniform4i(location: WebGLUniformLocation, x: number, y: number, z: number, w: number): void;
    /**
     * Attach values to the uniform1f
     * @param location Uniform Location
     * @param value A floating point value
     */
    uniform1f(location: WebGLUniformLocation, value: number): void;
    /**
     * Attach values to the uniform2f
     * @param location Uniform Location
     * @param x A floating point value
     * @param y A floating point value
     */
    uniform2f(location: WebGLUniformLocation, x: number, y: number): void;
    /**
     * Attach values to the uniform3i
     * @param location Uniform Location
     * @param x A floating point value
     * @param y A floating point value
     * @param z A floating point value
     */
    uniform3f(location: WebGLUniformLocation, x: number, y: number, z: number): void;
    /**
     * Attach values to the uniform4i
     * @param location Uniform Location
     * @param x A floating point value
     * @param y A floating point value
     * @param z A floating point value
     * @param w A floating point value
     */
    uniform4f(location: WebGLUniformLocation, x: number, y: number, z: number, w: number): void;
    /**
     * Attach values to the uniform1fv
     * @param location Uniform Location
     * @param value A floating point value in floating array
     */
    uniform1fv(location: WebGLUniformLocation, value: Float32List): void;
    /**
     * Attach values to the uniform2fv
     * @param location Uniform Location
     * @param value Floating point values in floating array
     */
    uniform2fv(location: WebGLUniformLocation, value: Float32List): void;
    /**
     * Attach values to the uniform3fv
     * @param location Uniform Location
     * @param value Floating point values in floating array
     */
    uniform3fv(location: WebGLUniformLocation, value: Float32List): void;
    /**
     * Attach values to the uniform4fv
     * @param location Uniform Location
     * @param value Floating point values in floating array
     */
    uniform4fv(location: WebGLUniformLocation, value: Float32List): void;
    /**
     * Attach values to the uniform1iv
     * @param location Uniform Location
     * @param value A integer value in an array
     */
    uniform1iv(location: WebGLUniformLocation, value: Int32List): void;
    /**
     * Attach values to the uniform2iv
     * @param location Uniform Location
     * @param value Integer values in an array
     */
    uniform2iv(location: WebGLUniformLocation, value: Int32List): void;
    /**
     * Attach values to the uniform3iv
     * @param location Uniform Location
     * @param value Integer values in an array
     */
    uniform3iv(location: WebGLUniformLocation, value: Int32List): void;
    /**
     * Attach values to the uniform4iv
     * @param location Uniform Location
     * @param value Integer values in an array
     */
    uniform4iv(location: WebGLUniformLocation, value: Int32List): void;
    /**
     * Attach values to the uniform2fv
     * @param location Uniform Location
     * @param value Integer values in an array
     * @param transpose Must be always false
     */
    uniformMatrix2fv(location: WebGLUniformLocation, value: Float32Array, transpose?: boolean): void;
    /**
     * Attach values to the uniform3fv
     * @param location Uniform Location
     * @param value Integer values in an array
     * @param transpose Must be always false
     */
    uniformMatrix3fv(location: WebGLUniformLocation, value: Float32Array, transpose?: boolean): void;
    /**
     * Attach values to the uniform4vv
     * @param location Uniform Location
     * @param value Integer values in an array
     * @param transpose Must be always false
     */
    uniformMatrix4fv(location: WebGLUniformLocation, value: Float32Array, transpose?: boolean): void;
}
