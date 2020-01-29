import { NISGL } from './NISGL';
import { NISGLShader } from './NISGLShader';
import { NISGLBuffer } from './NISGLBuffer';
export declare class NISGLProgram {
    private _gl;
    private _program;
    private _linked;
    private _restrict;
    constructor(gl: NISGL, program: WebGLProgram);
    /**
     * Get program instance
     * @return Return WebGLProgram
     */
    get getProgram(): WebGLProgram;
    /**
     * Delete program
     */
    deleteProgram(): void;
    /**
     * Get restriction setting
     * @return Restriction config
     */
    get getRestriction(): boolean;
    /**
     * Toggle restrict setting
     */
    setRestrict(): void;
    /**
     * Link shaders to the program
     * @param shaders Vertex and Fragment shaders
     */
    linkProgram(shaders: NISGLShader[]): void;
    /**
     * Get attribute location
     * @param name Attribute name from a shader
     * @return Return attribute index number
     */
    getAttributeLocation(name: string): number;
    /**
     * Get uniform location
     * @param name Uniform name from a shader
     * @return Return uniform index number
     */
    getUniformLocation(name: string): WebGLUniformLocation | null;
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
    setAttribute(name: string, size: GLint, buffer: NISGLBuffer | null, type?: number, normalized?: boolean, stride?: number, offset?: number): void;
    /**
     * Set a value into the uniform
     * @param type Uniform type
     * @param name Uniform name
     * @param value Value which can be set several value in an array
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
