class NISGLProgram {
    constructor(gl, program, vertex, fragment) {
        this._linked = false;
        this._strict = false;
        this._gl = gl;
        this._program = program;
        this._vertex = gl.createShader(gl.VERTEX_SHADER);
        this._fragment = gl.createShader(gl.FRAGMENT_SHADER);
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
    get getProgram() {
        return this._program;
    }
    /**
     * Delete program
     */
    dispose() {
        this._linked = false;
        this._gl.deleteProgram(this._program);
        this._gl.deleteShader(this._vertex);
        this._gl.deleteShader(this._fragment);
    }
    /**
     * Use Program
     */
    use() {
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
    compile(vertex, fragment) {
        const gl = this._gl;
        if (!(compileShader(gl, this._vertex, vertex) &&
            compileShader(gl, this._fragment, fragment))) {
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
    get isStrict() {
        return this._strict;
    }
    /**
     * Toggle strict mode
     */
    setStrict() {
        this._strict = this._strict ? false : true;
    }
    /**
     * Get uniform location
     * @param {string} name Uniform name from a shader
     * @return {WebGLUniformLocation} Return uniform index number
     */
    getUniformLocation(name) {
        return this._gl.getUniformLocation(this._program, name);
    }
    /**
     * Set a value into the uniform
     * @param {string} type Uniform type
     * @param {string} name Uniform name
     * @param {number[]} value Value which can be set several value in an array
     */
    setUniform(type, name, ...value) {
        const fn = this["uniform" + type];
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
    uniform1i(location, value) {
        this._gl.uniform1i(location, value);
    }
    /**
     * Attach values to the uniform2i
     * @param location Uniform Location
     * @param x An integer value
     * @param y An integer value
     */
    uniform2i(location, x, y) {
        this._gl.uniform2i(location, x, y);
    }
    /**
     * Attach values to the uniform3i
     * @param location Uniform Location
     * @param x An integer value
     * @param y An integer value
     * @param z An integer value
     */
    uniform3i(location, x, y, z) {
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
    uniform4i(location, x, y, z, w) {
        this._gl.uniform4i(location, x, y, z, w);
    }
    /**
     * Attach values to the uniform1f
     * @param location Uniform Location
     * @param value A floating point value
     */
    uniform1f(location, value) {
        this._gl.uniform1f(location, value);
    }
    /**
     * Attach values to the uniform2f
     * @param location Uniform Location
     * @param x A floating point value
     * @param y A floating point value
     */
    uniform2f(location, x, y) {
        this._gl.uniform2f(location, x, y);
    }
    /**
     * Attach values to the uniform3i
     * @param location Uniform Location
     * @param x A floating point value
     * @param y A floating point value
     * @param z A floating point value
     */
    uniform3f(location, x, y, z) {
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
    uniform4f(location, x, y, z, w) {
        this._gl.uniform4f(location, x, y, z, w);
    }
    /**
     * Attach values to the uniform1fv
     * @param location Uniform Location
     * @param value A floating point value in floating array
     */
    uniform1fv(location, value) {
        this._gl.uniform1fv(location, value);
    }
    /**
     * Attach values to the uniform2fv
     * @param location Uniform Location
     * @param value Floating point values in floating array
     */
    uniform2fv(location, value) {
        this._gl.uniform2fv(location, value);
    }
    /**
     * Attach values to the uniform3fv
     * @param location Uniform Location
     * @param value Floating point values in floating array
     */
    uniform3fv(location, value) {
        this._gl.uniform3fv(location, value);
    }
    /**
     * Attach values to the uniform4fv
     * @param location Uniform Location
     * @param value Floating point values in floating array
     */
    uniform4fv(location, value) {
        this._gl.uniform4fv(location, value);
    }
    /**
     * Attach values to the uniform1iv
     * @param location Uniform Location
     * @param value A integer value in an array
     */
    uniform1iv(location, value) {
        this._gl.uniform1iv(location, value);
    }
    /**
     * Attach values to the uniform2iv
     * @param location Uniform Location
     * @param value Integer values in an array
     */
    uniform2iv(location, value) {
        this._gl.uniform2iv(location, value);
    }
    /**
     * Attach values to the uniform3iv
     * @param location Uniform Location
     * @param value Integer values in an array
     */
    uniform3iv(location, value) {
        this._gl.uniform3iv(location, value);
    }
    /**
     * Attach values to the uniform4iv
     * @param location Uniform Location
     * @param value Integer values in an array
     */
    uniform4iv(location, value) {
        this._gl.uniform4iv(location, value);
    }
    /**
     * Attach values to the uniform2fv
     * @param location Uniform Location
     * @param value Integer values in an array
     * @param transpose Must be always false
     */
    uniformMatrix2fv(location, value, transpose = false) {
        this._gl.uniformMatrix2fv(location, transpose, value);
    }
    /**
     * Attach values to the uniform3fv
     * @param location Uniform Location
     * @param value Integer values in an array
     * @param transpose Must be always false
     */
    uniformMatrix3fv(location, value, transpose = false) {
        this._gl.uniformMatrix3fv(location, transpose, value);
    }
    /**
     * Attach values to the uniform4vv
     * @param location Uniform Location
     * @param value Integer values in an array
     * @param transpose Must be always false
     */
    uniformMatrix4fv(location, value, transpose = false) {
        this._gl.uniformMatrix4fv(location, transpose, value);
    }
}
// util
function compileShader(gl, shader, source) {
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error(gl.getShaderInfoLog(shader));
        return false;
    }
    return true;
}

const GL_STATIC_DRAW = 0x88e4;
const GL_FLOAT = 0x1406;
class NISGLBuffer {
    constructor(gl, buffer, mode, data, type) {
        this._usage = GL_STATIC_DRAW;
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
    get getBuffer() {
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
    setType(type) {
        this._type = type;
    }
    /**
     * Dispose the buffer
     */
    dispose() {
        this._gl.deleteBuffer(this._buffer);
    }
    /**
     * Set data into the buffer
     * @param source
     */
    data(source) {
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
    attrib(name, size, type = GL_FLOAT, normalized = false, stride = 0, offset = 0) {
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
    attribPointer(program) {
        const gl = this._gl;
        if (this._attribs.length <= 0) {
            throw new Error("Buffer does not set any attribute");
        }
        this._attribs.forEach((attrib) => {
            const attribLocation = gl.getAttribLocation(program.getProgram, attrib.name);
            if (attribLocation !== -1) {
                gl.bindBuffer(this._bufferType, this._buffer);
                gl.enableVertexAttribArray(attribLocation);
                gl.vertexAttribPointer(attribLocation, attrib.size, attrib.type, attrib.normalized, attrib.stride, attrib.offset);
            }
        });
    }
    /**
     * Shortcut of Draw function
     * @param {GLenum} mode
     * @param {number} count
     * @param {number} offset
     */
    draw(mode, count, offset = 0) {
        const gl = this._gl;
        if (this._bufferType === gl.ELEMENT_ARRAY_BUFFER) {
            gl.drawElements(mode, count, this._type, offset);
        }
        else {
            gl.drawArrays(mode, count, offset);
        }
    }
    drawPoints(count, offset) {
        this.draw(0, count, offset);
    }
    drawLines(count, offset) {
        this.draw(1, count, offset);
    }
    drawLineLoop(count, offset) {
        this.draw(2, count, offset);
    }
    drawLineStrip(count, offset) {
        this.draw(3, count, offset);
    }
    drawTriangles(count, offset) {
        this.draw(4, count, offset);
    }
    drawTriangleStrips(count, offset) {
        this.draw(5, count, offset);
    }
    drawTriangleFan(count, offset) {
        this.draw(6, count, offset);
    }
}

class NISGLTexture {
    constructor(gl, format) {
        this._gl = gl;
        this._texture = gl.createTexture();
        this._width = 0;
        this._height = 0;
        this._format = format || gl.UNSIGNED_BYTE;
        // this.setFilter(true, false, false);
    }
    /**
     * Bind Texture
     * @param {number} id - Set Active Texture (Default: 0)
     */
    bind(id) {
        const gl = this._gl;
        if (id !== undefined) {
            gl.activeTexture(gl.TEXTURE0 + (0 | id));
        }
        gl.bindTexture(gl.TEXTURE_2D, this._texture);
    }
    /**
     * Dispose Texture
     */
    dispose() {
        const gl = this._gl;
        gl.deleteTexture(this._texture);
    }
    /**
     * Set Texture Format
     * @param {GLenum} format
     */
    setFormat(format) {
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
    setFilter(liner = false, nearMipmap = false, linerMipmap = false) {
        const gl = this._gl;
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, getFilterConstants(liner, false, false));
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, getFilterConstants(liner, nearMipmap, linerMipmap));
    }
    /**
     * Set Repeat Wrap
     */
    setRepeatWrap() {
        const gl = this._gl;
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);
    }
    /**
     * Set Clamp Wrap
     */
    setClampWrap() {
        const gl = this._gl;
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    }
    /**
     * Set Mirror Wrap
     */
    setMirrorWrap() {
        const gl = this._gl;
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.MIRRORED_REPEAT);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.MIRRORED_REPEAT);
    }
    /**
     * Set texture from image (e.g. jpg/png)
     * @param {TexImageSource} source
     */
    fromImage(source) {
        const gl = this._gl;
        this._width = source.width;
        this._height = source.height;
        gl.bindTexture(gl.TEXTURE_2D, this._texture);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, this._format, source);
        // need to generate mipmap?
        // gl.generateMipmap(gl.TEXTURE_2D);
    }
    // prettier-ignore
    fromData(width, height, data) {
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
function getFilterConstants(liner, nearMipmap, linerMipmap) {
    return (0x2600 | +liner | (+nearMipmap << 8) | (+(nearMipmap && linerMipmap) << 1));
}

class NISGLFrameBuffer {
    constructor(gl, width, height) {
        this._attachments = [];
        this._gl = gl;
        this._width = width ? width : 0;
        this._height = height ? height : 0;
        this._frameBuffer = gl.createFramebuffer();
        this.bind();
    }
    /**
     * Bind FrameBuffer
     */
    bind() {
        const gl = this._gl;
        gl.bindFramebuffer(gl.FRAMEBUFFER, this._frameBuffer);
    }
    /**
     * Unbind FrameBuffer
     */
    unbind() {
        const gl = this._gl;
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    }
    /**
     * Dispose the FrameBuffer instance
     */
    dispose() {
        const gl = this._gl;
        gl.deleteFramebuffer(this._frameBuffer);
    }
    /**
     * Resize
     * If it has attachment(s), the attachments runs resize as well
     * @param {number} width
     * @param {number} height
     */
    resize(width, height) {
        this._width = width;
        this._height = height;
        this._attachments.forEach((attachment) => {
            attachment.resize(this._width, this._height);
        });
    }
    /**
     * Set Depth Buffer
     */
    attachDepth() {
        const gl = this._gl;
        const attachment = new Attachment(new NISGLRenderBuffer(gl));
        attachment.attach();
        this._attachments[gl.DEPTH_ATTACHMENT] = attachment;
    }
    /**
     * Set Texture Buffer
     * @param {GLenum | undefined} format
     */
    attachTexture(format, near) {
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
    getDepth() {
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
    getTexture() {
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
    constructor(target) {
        this._target = target;
    }
    /**
     * Resize target
     * @param {number} width
     * @param {number} height
     */
    resize(width, height) {
        if (this._target instanceof NISGLTexture) {
            this._target.fromData(width, height, null);
        }
        else {
            this._target.resize(width, height);
        }
    }
    /**
     * Attach Texture or RenderBuffer to FrameBuffer
     */
    attach() {
        const gl = this._target._gl;
        if (this._target instanceof NISGLTexture) {
            gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, this._target._texture, 0);
        }
        else {
            gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, this._target._renderBuffer);
        }
    }
    /**
     * Deattach Texture or RenderBuffer to FrameBuffer
     */
    deattach() {
        const gl = this._target._gl;
        if (this._target instanceof NISGLTexture) {
            gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, null, 0);
        }
        else {
            gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.FRAMEBUFFER, null);
        }
    }
    /**
     * Dispose Target
     */
    dispose() {
        this._target.dispose();
    }
}
class NISGLRenderBuffer {
    constructor(gl) {
        this._width = 0;
        this._height = 0;
        this._gl = gl;
        this._renderBuffer = gl.createRenderbuffer();
    }
    /**
     * Bind RenderBuffer
     */
    bind() {
        const gl = this._gl;
        gl.bindRenderbuffer(gl.RENDERBUFFER, this._renderBuffer);
    }
    /**
     * Dispose RenderBuffer
     */
    dispose() {
        const gl = this._gl;
        gl.deleteRenderbuffer(this._renderBuffer);
    }
    /**
     * Resize RenderBuffer
     * @param {number} width
     * @param {number} height
     */
    resize(width, height) {
        this._width = width;
        this._height = height;
        this.storage();
    }
    /**
     * Set width/height into RenderBuffer
     */
    storage() {
        const gl = this._gl;
        gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT16, this._width, this._height);
    }
}

const GL_DEPTH_BUFFER_BIT = 0x00000100;
const GL_COLOR_BUFFER_BIT = 0x00004000;
class NISGL {
    constructor(gl) {
        this._message = new Error("Exeption Error");
        this._gl = gl;
    }
    /**
     * Get rendering context
     * @return {WebGLRenderingContext}  WebGL Context
     */
    get context() {
        return this._gl;
    }
    /**
     * Create program instance
     * @param {string} vertex - Vertex shader source
     * @param {string} fragment - Fragment shader source
     * @return {NISGLProgram} NISGLProgram instance
     */
    createProgram(vertex, fragment) {
        const gl = this._gl;
        const program = gl.createProgram();
        if (program === null) {
            this.emitMessage("Program creation error");
            return;
        }
        if ((!vertex && fragment) || (vertex && !fragment)) {
            this.emitMessage("Missing Vertex or Fragment shader");
            return;
        }
        return new NISGLProgram(gl, program, vertex, fragment);
    }
    /**
     * Create index buffer instance
     * @return {NISGLBuffer} NISGLBuffer instance
     */
    indexBuffer(data) {
        const gl = this._gl;
        const buffer = gl.createBuffer();
        if (buffer === null) {
            this.emitMessage("Index Buffer creation error");
            return;
        }
        return new NISGLBuffer(gl, buffer, "index", data);
    }
    /**
     * Create array buffer instance
     * @return {NISGLBuffer} NISGLBuffer instance
     */
    arrayBuffer(data) {
        const gl = this._gl;
        const buffer = gl.createBuffer();
        if (buffer === null) {
            this.emitMessage("Array Buffer creation error");
            return;
        }
        return new NISGLBuffer(gl, buffer, "array", data);
    }
    /**
     * Create texture instance
     * @returns {NISGLTexture} NISGLTexture instance
     */
    createTexture() {
        const gl = this._gl;
        return new NISGLTexture(gl);
    }
    /**
     * Create frame buffer instance
     * @param {number} width
     * @param {number} height
     * @return {NISGLFrameBuffer}
     */
    createFrameBuffer(width, height) {
        const gl = this._gl;
        return new NISGLFrameBuffer(gl, width, height);
    }
    /**
     * Initalize canvas
     * @param {number} r Red Color Value, default 0.0
     * @param {number} g Green Color Value, default 0.0
     * @param {number} b Blue Color Value, default 0.0
     * @param {number} a Alpha Color Value, default 1.0
     * @param {number} depth Depath, default 1.0
     */
    clear(r = 0.0, g = 0.0, b = 0.0, a = 1.0, depth = 1.0) {
        const gl = this._gl;
        gl.clearColor(r, g, b, a);
        gl.clearDepth(depth);
        gl.clear(GL_COLOR_BUFFER_BIT | GL_DEPTH_BUFFER_BIT);
    }
    /**
     * Flush
     */
    flush() {
        this._gl.flush();
    }
    /**
     * Emit Error Message
     * @param {Error | string | null} error Error Message
     * @return {Error} Error message
     */
    emitMessage(error) {
        if (typeof error === "string") {
            throw new Error(error);
        }
        else if (error) {
            throw error;
        }
        else {
            throw this._message;
        }
    }
}

export { NISGL, NISGLBuffer, NISGLFrameBuffer, NISGLProgram, NISGLTexture, NISGL as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmlzZ2wubW9kdWxlLmpzIiwic291cmNlcyI6WyIuLi8uLi9zcmMvTklTR0xQcm9ncmFtLnRzIiwiLi4vLi4vc3JjL05JU0dMQnVmZmVyLnRzIiwiLi4vLi4vc3JjL05JU0dMVGV4dHVyZS50cyIsIi4uLy4uL3NyYy9OSVNHTEZyYW1lQnVmZmVyLnRzIiwiLi4vLi4vc3JjL05JU0dMLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjbGFzcyBOSVNHTFByb2dyYW0ge1xuICByZWFkb25seSBfZ2w6IFdlYkdMUmVuZGVyaW5nQ29udGV4dDtcbiAgcmVhZG9ubHkgX3Byb2dyYW06IFdlYkdMUHJvZ3JhbTtcbiAgcHJpdmF0ZSBfdmVydGV4OiBXZWJHTFNoYWRlcjtcbiAgcHJpdmF0ZSBfZnJhZ21lbnQ6IFdlYkdMU2hhZGVyO1xuICBwcml2YXRlIF9saW5rZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgcHJpdmF0ZSBfc3RyaWN0OiBib29sZWFuID0gZmFsc2U7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgZ2w6IFdlYkdMUmVuZGVyaW5nQ29udGV4dCxcbiAgICBwcm9ncmFtOiBXZWJHTFByb2dyYW0sXG4gICAgdmVydGV4Pzogc3RyaW5nLFxuICAgIGZyYWdtZW50Pzogc3RyaW5nXG4gICkge1xuICAgIHRoaXMuX2dsID0gZ2w7XG4gICAgdGhpcy5fcHJvZ3JhbSA9IHByb2dyYW07XG4gICAgdGhpcy5fdmVydGV4ID0gPFdlYkdMU2hhZGVyPmdsLmNyZWF0ZVNoYWRlcihnbC5WRVJURVhfU0hBREVSKTtcbiAgICB0aGlzLl9mcmFnbWVudCA9IDxXZWJHTFNoYWRlcj5nbC5jcmVhdGVTaGFkZXIoZ2wuRlJBR01FTlRfU0hBREVSKTtcblxuICAgIGdsLmF0dGFjaFNoYWRlcih0aGlzLl9wcm9ncmFtLCB0aGlzLl92ZXJ0ZXgpO1xuICAgIGdsLmF0dGFjaFNoYWRlcih0aGlzLl9wcm9ncmFtLCB0aGlzLl9mcmFnbWVudCk7XG5cbiAgICBpZiAodmVydGV4ICYmIGZyYWdtZW50KSB7XG4gICAgICB0aGlzLmNvbXBpbGUodmVydGV4LCBmcmFnbWVudCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEdldCBwcm9ncmFtIGluc3RhbmNlXG4gICAqIEByZXR1cm4ge05JU0dMUHJvZ3JhbX0gTklTR0xQcm9ncmFtXG4gICAqL1xuICBwdWJsaWMgZ2V0IGdldFByb2dyYW0oKTogV2ViR0xQcm9ncmFtIHtcbiAgICByZXR1cm4gdGhpcy5fcHJvZ3JhbTtcbiAgfVxuXG4gIC8qKlxuICAgKiBEZWxldGUgcHJvZ3JhbVxuICAgKi9cbiAgcHVibGljIGRpc3Bvc2UoKTogdm9pZCB7XG4gICAgdGhpcy5fbGlua2VkID0gZmFsc2U7XG4gICAgdGhpcy5fZ2wuZGVsZXRlUHJvZ3JhbSh0aGlzLl9wcm9ncmFtKTtcbiAgICB0aGlzLl9nbC5kZWxldGVTaGFkZXIodGhpcy5fdmVydGV4KTtcbiAgICB0aGlzLl9nbC5kZWxldGVTaGFkZXIodGhpcy5fZnJhZ21lbnQpO1xuICB9XG5cbiAgLyoqXG4gICAqIFVzZSBQcm9ncmFtXG4gICAqL1xuICBwdWJsaWMgdXNlKCkge1xuICAgIGlmICghdGhpcy5fbGlua2VkKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJUaGlzIHByb2dyYW0gaXMgbm90IGxpbmtlZCB5ZXRcIik7XG4gICAgfVxuXG4gICAgdGhpcy5fZ2wudXNlUHJvZ3JhbSh0aGlzLl9wcm9ncmFtKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDb21waWxlIHNoYWRlcnMgdGhlbiBsaW5rIHRvIHByb2dyYW1cbiAgICogQHBhcmFtIHtzdHJpbmd9IHZlcnRleCAtIFZlcnRleCBzaGFkZXIgc291cmNlXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBmcmFnbWVudCAtIEZyYWdtZW50IHNoYWRlciBzb3VyY2VcbiAgICogQHJldHVybiB7Ym9vbGVhbn1cbiAgICovXG4gIHB1YmxpYyBjb21waWxlKHZlcnRleDogc3RyaW5nLCBmcmFnbWVudDogc3RyaW5nKSB7XG4gICAgY29uc3QgZ2wgPSB0aGlzLl9nbDtcblxuICAgIGlmIChcbiAgICAgICEoXG4gICAgICAgIGNvbXBpbGVTaGFkZXIoZ2wsIHRoaXMuX3ZlcnRleCwgdmVydGV4KSAmJlxuICAgICAgICBjb21waWxlU2hhZGVyKGdsLCB0aGlzLl9mcmFnbWVudCwgZnJhZ21lbnQpXG4gICAgICApXG4gICAgKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgZ2wubGlua1Byb2dyYW0odGhpcy5fcHJvZ3JhbSk7XG5cbiAgICB0aGlzLl9saW5rZWQgPSBnbC5nZXRQcm9ncmFtUGFyYW1ldGVyKHRoaXMuX3Byb2dyYW0sIHRoaXMuX2dsLkxJTktfU1RBVFVTKTtcblxuICAgIGlmICghdGhpcy5fbGlua2VkKSB7XG4gICAgICBjb25zb2xlLmVycm9yKGdsLmdldFByb2dyYW1JbmZvTG9nKHRoaXMuX3Byb2dyYW0pKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgc3RyaWN0IG1vZGVcbiAgICogQHJldHVybiB7Ym9vbGVhbn0gU3RyaWN0IG1vZGVcbiAgICovXG4gIHB1YmxpYyBnZXQgaXNTdHJpY3QoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX3N0cmljdDtcbiAgfVxuXG4gIC8qKlxuICAgKiBUb2dnbGUgc3RyaWN0IG1vZGVcbiAgICovXG4gIHB1YmxpYyBzZXRTdHJpY3QoKTogdm9pZCB7XG4gICAgdGhpcy5fc3RyaWN0ID0gdGhpcy5fc3RyaWN0ID8gZmFsc2UgOiB0cnVlO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCB1bmlmb3JtIGxvY2F0aW9uXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lIFVuaWZvcm0gbmFtZSBmcm9tIGEgc2hhZGVyXG4gICAqIEByZXR1cm4ge1dlYkdMVW5pZm9ybUxvY2F0aW9ufSBSZXR1cm4gdW5pZm9ybSBpbmRleCBudW1iZXJcbiAgICovXG4gIHB1YmxpYyBnZXRVbmlmb3JtTG9jYXRpb24obmFtZTogc3RyaW5nKSB7XG4gICAgcmV0dXJuIHRoaXMuX2dsLmdldFVuaWZvcm1Mb2NhdGlvbih0aGlzLl9wcm9ncmFtLCBuYW1lKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXQgYSB2YWx1ZSBpbnRvIHRoZSB1bmlmb3JtXG4gICAqIEBwYXJhbSB7c3RyaW5nfSB0eXBlIFVuaWZvcm0gdHlwZVxuICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZSBVbmlmb3JtIG5hbWVcbiAgICogQHBhcmFtIHtudW1iZXJbXX0gdmFsdWUgVmFsdWUgd2hpY2ggY2FuIGJlIHNldCBzZXZlcmFsIHZhbHVlIGluIGFuIGFycmF5XG4gICAqL1xuICBwdWJsaWMgc2V0VW5pZm9ybSh0eXBlOiBzdHJpbmcsIG5hbWU6IHN0cmluZywgLi4udmFsdWU6IG51bWJlcltdKTogdm9pZCB7XG4gICAgY29uc3QgZm4gPSAodGhpcyBhcyBhbnkpW1widW5pZm9ybVwiICsgdHlwZV07XG4gICAgY29uc3QgdW5pZm9ybUxvY2F0aW9uID0gdGhpcy5nZXRVbmlmb3JtTG9jYXRpb24obmFtZSk7XG5cbiAgICBpZiAodW5pZm9ybUxvY2F0aW9uID09PSBudWxsICYmIHRoaXMuX3N0cmljdCkge1xuICAgICAgY29uc29sZS5lcnJvcihcIk5vdCBmb3VuZCBVbmlmb3JtIExvY2F0aW9uIG9yIERvZXMgbm90IHVzZSBpbiB0aGUgc2hhZGVyXCIpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGZuLmNhbGwodGhpcywgdW5pZm9ybUxvY2F0aW9uLCAuLi52YWx1ZSk7XG4gIH1cblxuICAvKipcbiAgICogQXR0YWNoIHZhbHVlcyB0byB0aGUgdW5pZm9ybTFpXG4gICAqIEBwYXJhbSBsb2NhdGlvbiBVbmlmb3JtIExvY2F0aW9uXG4gICAqIEBwYXJhbSB2YWx1ZSBBbiBpbnRlZ2VyIHZhbHVlXG4gICAqL1xuICBwdWJsaWMgdW5pZm9ybTFpKGxvY2F0aW9uOiBXZWJHTFVuaWZvcm1Mb2NhdGlvbiwgdmFsdWU6IG51bWJlcik6IHZvaWQge1xuICAgIHRoaXMuX2dsLnVuaWZvcm0xaShsb2NhdGlvbiwgdmFsdWUpO1xuICB9XG5cbiAgLyoqXG4gICAqIEF0dGFjaCB2YWx1ZXMgdG8gdGhlIHVuaWZvcm0yaVxuICAgKiBAcGFyYW0gbG9jYXRpb24gVW5pZm9ybSBMb2NhdGlvblxuICAgKiBAcGFyYW0geCBBbiBpbnRlZ2VyIHZhbHVlXG4gICAqIEBwYXJhbSB5IEFuIGludGVnZXIgdmFsdWVcbiAgICovXG4gIHB1YmxpYyB1bmlmb3JtMmkobG9jYXRpb246IFdlYkdMVW5pZm9ybUxvY2F0aW9uLCB4OiBudW1iZXIsIHk6IG51bWJlcik6IHZvaWQge1xuICAgIHRoaXMuX2dsLnVuaWZvcm0yaShsb2NhdGlvbiwgeCwgeSk7XG4gIH1cblxuICAvKipcbiAgICogQXR0YWNoIHZhbHVlcyB0byB0aGUgdW5pZm9ybTNpXG4gICAqIEBwYXJhbSBsb2NhdGlvbiBVbmlmb3JtIExvY2F0aW9uXG4gICAqIEBwYXJhbSB4IEFuIGludGVnZXIgdmFsdWVcbiAgICogQHBhcmFtIHkgQW4gaW50ZWdlciB2YWx1ZVxuICAgKiBAcGFyYW0geiBBbiBpbnRlZ2VyIHZhbHVlXG4gICAqL1xuICBwdWJsaWMgdW5pZm9ybTNpKFxuICAgIGxvY2F0aW9uOiBXZWJHTFVuaWZvcm1Mb2NhdGlvbixcbiAgICB4OiBudW1iZXIsXG4gICAgeTogbnVtYmVyLFxuICAgIHo6IG51bWJlclxuICApOiB2b2lkIHtcbiAgICB0aGlzLl9nbC51bmlmb3JtM2kobG9jYXRpb24sIHgsIHksIHopO1xuICB9XG5cbiAgLyoqXG4gICAqIEF0dGFjaCB2YWx1ZXMgdG8gdGhlIHVuaWZvcm00aVxuICAgKiBAcGFyYW0gbG9jYXRpb24gVW5pZm9ybSBMb2NhdGlvblxuICAgKiBAcGFyYW0geCBBbiBpbnRlZ2VyIHZhbHVlXG4gICAqIEBwYXJhbSB5IEFuIGludGVnZXIgdmFsdWVcbiAgICogQHBhcmFtIHogQW4gaW50ZWdlciB2YWx1ZVxuICAgKiBAcGFyYW0gdyBBbiBpbnRlZ2VyIHZhbHVlXG4gICAqL1xuICBwdWJsaWMgdW5pZm9ybTRpKFxuICAgIGxvY2F0aW9uOiBXZWJHTFVuaWZvcm1Mb2NhdGlvbixcbiAgICB4OiBudW1iZXIsXG4gICAgeTogbnVtYmVyLFxuICAgIHo6IG51bWJlcixcbiAgICB3OiBudW1iZXJcbiAgKTogdm9pZCB7XG4gICAgdGhpcy5fZ2wudW5pZm9ybTRpKGxvY2F0aW9uLCB4LCB5LCB6LCB3KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBdHRhY2ggdmFsdWVzIHRvIHRoZSB1bmlmb3JtMWZcbiAgICogQHBhcmFtIGxvY2F0aW9uIFVuaWZvcm0gTG9jYXRpb25cbiAgICogQHBhcmFtIHZhbHVlIEEgZmxvYXRpbmcgcG9pbnQgdmFsdWVcbiAgICovXG4gIHB1YmxpYyB1bmlmb3JtMWYobG9jYXRpb246IFdlYkdMVW5pZm9ybUxvY2F0aW9uLCB2YWx1ZTogbnVtYmVyKTogdm9pZCB7XG4gICAgdGhpcy5fZ2wudW5pZm9ybTFmKGxvY2F0aW9uLCB2YWx1ZSk7XG4gIH1cblxuICAvKipcbiAgICogQXR0YWNoIHZhbHVlcyB0byB0aGUgdW5pZm9ybTJmXG4gICAqIEBwYXJhbSBsb2NhdGlvbiBVbmlmb3JtIExvY2F0aW9uXG4gICAqIEBwYXJhbSB4IEEgZmxvYXRpbmcgcG9pbnQgdmFsdWVcbiAgICogQHBhcmFtIHkgQSBmbG9hdGluZyBwb2ludCB2YWx1ZVxuICAgKi9cbiAgcHVibGljIHVuaWZvcm0yZihsb2NhdGlvbjogV2ViR0xVbmlmb3JtTG9jYXRpb24sIHg6IG51bWJlciwgeTogbnVtYmVyKTogdm9pZCB7XG4gICAgdGhpcy5fZ2wudW5pZm9ybTJmKGxvY2F0aW9uLCB4LCB5KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBdHRhY2ggdmFsdWVzIHRvIHRoZSB1bmlmb3JtM2lcbiAgICogQHBhcmFtIGxvY2F0aW9uIFVuaWZvcm0gTG9jYXRpb25cbiAgICogQHBhcmFtIHggQSBmbG9hdGluZyBwb2ludCB2YWx1ZVxuICAgKiBAcGFyYW0geSBBIGZsb2F0aW5nIHBvaW50IHZhbHVlXG4gICAqIEBwYXJhbSB6IEEgZmxvYXRpbmcgcG9pbnQgdmFsdWVcbiAgICovXG4gIHB1YmxpYyB1bmlmb3JtM2YoXG4gICAgbG9jYXRpb246IFdlYkdMVW5pZm9ybUxvY2F0aW9uLFxuICAgIHg6IG51bWJlcixcbiAgICB5OiBudW1iZXIsXG4gICAgejogbnVtYmVyXG4gICk6IHZvaWQge1xuICAgIHRoaXMuX2dsLnVuaWZvcm0zZihsb2NhdGlvbiwgeCwgeSwgeik7XG4gIH1cblxuICAvKipcbiAgICogQXR0YWNoIHZhbHVlcyB0byB0aGUgdW5pZm9ybTRpXG4gICAqIEBwYXJhbSBsb2NhdGlvbiBVbmlmb3JtIExvY2F0aW9uXG4gICAqIEBwYXJhbSB4IEEgZmxvYXRpbmcgcG9pbnQgdmFsdWVcbiAgICogQHBhcmFtIHkgQSBmbG9hdGluZyBwb2ludCB2YWx1ZVxuICAgKiBAcGFyYW0geiBBIGZsb2F0aW5nIHBvaW50IHZhbHVlXG4gICAqIEBwYXJhbSB3IEEgZmxvYXRpbmcgcG9pbnQgdmFsdWVcbiAgICovXG4gIHB1YmxpYyB1bmlmb3JtNGYoXG4gICAgbG9jYXRpb246IFdlYkdMVW5pZm9ybUxvY2F0aW9uLFxuICAgIHg6IG51bWJlcixcbiAgICB5OiBudW1iZXIsXG4gICAgejogbnVtYmVyLFxuICAgIHc6IG51bWJlclxuICApOiB2b2lkIHtcbiAgICB0aGlzLl9nbC51bmlmb3JtNGYobG9jYXRpb24sIHgsIHksIHosIHcpO1xuICB9XG5cbiAgLyoqXG4gICAqIEF0dGFjaCB2YWx1ZXMgdG8gdGhlIHVuaWZvcm0xZnZcbiAgICogQHBhcmFtIGxvY2F0aW9uIFVuaWZvcm0gTG9jYXRpb25cbiAgICogQHBhcmFtIHZhbHVlIEEgZmxvYXRpbmcgcG9pbnQgdmFsdWUgaW4gZmxvYXRpbmcgYXJyYXlcbiAgICovXG4gIHB1YmxpYyB1bmlmb3JtMWZ2KGxvY2F0aW9uOiBXZWJHTFVuaWZvcm1Mb2NhdGlvbiwgdmFsdWU6IEZsb2F0MzJMaXN0KTogdm9pZCB7XG4gICAgdGhpcy5fZ2wudW5pZm9ybTFmdihsb2NhdGlvbiwgdmFsdWUpO1xuICB9XG5cbiAgLyoqXG4gICAqIEF0dGFjaCB2YWx1ZXMgdG8gdGhlIHVuaWZvcm0yZnZcbiAgICogQHBhcmFtIGxvY2F0aW9uIFVuaWZvcm0gTG9jYXRpb25cbiAgICogQHBhcmFtIHZhbHVlIEZsb2F0aW5nIHBvaW50IHZhbHVlcyBpbiBmbG9hdGluZyBhcnJheVxuICAgKi9cbiAgcHVibGljIHVuaWZvcm0yZnYobG9jYXRpb246IFdlYkdMVW5pZm9ybUxvY2F0aW9uLCB2YWx1ZTogRmxvYXQzMkxpc3QpOiB2b2lkIHtcbiAgICB0aGlzLl9nbC51bmlmb3JtMmZ2KGxvY2F0aW9uLCB2YWx1ZSk7XG4gIH1cblxuICAvKipcbiAgICogQXR0YWNoIHZhbHVlcyB0byB0aGUgdW5pZm9ybTNmdlxuICAgKiBAcGFyYW0gbG9jYXRpb24gVW5pZm9ybSBMb2NhdGlvblxuICAgKiBAcGFyYW0gdmFsdWUgRmxvYXRpbmcgcG9pbnQgdmFsdWVzIGluIGZsb2F0aW5nIGFycmF5XG4gICAqL1xuICBwdWJsaWMgdW5pZm9ybTNmdihsb2NhdGlvbjogV2ViR0xVbmlmb3JtTG9jYXRpb24sIHZhbHVlOiBGbG9hdDMyTGlzdCk6IHZvaWQge1xuICAgIHRoaXMuX2dsLnVuaWZvcm0zZnYobG9jYXRpb24sIHZhbHVlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBdHRhY2ggdmFsdWVzIHRvIHRoZSB1bmlmb3JtNGZ2XG4gICAqIEBwYXJhbSBsb2NhdGlvbiBVbmlmb3JtIExvY2F0aW9uXG4gICAqIEBwYXJhbSB2YWx1ZSBGbG9hdGluZyBwb2ludCB2YWx1ZXMgaW4gZmxvYXRpbmcgYXJyYXlcbiAgICovXG4gIHB1YmxpYyB1bmlmb3JtNGZ2KGxvY2F0aW9uOiBXZWJHTFVuaWZvcm1Mb2NhdGlvbiwgdmFsdWU6IEZsb2F0MzJMaXN0KTogdm9pZCB7XG4gICAgdGhpcy5fZ2wudW5pZm9ybTRmdihsb2NhdGlvbiwgdmFsdWUpO1xuICB9XG5cbiAgLyoqXG4gICAqIEF0dGFjaCB2YWx1ZXMgdG8gdGhlIHVuaWZvcm0xaXZcbiAgICogQHBhcmFtIGxvY2F0aW9uIFVuaWZvcm0gTG9jYXRpb25cbiAgICogQHBhcmFtIHZhbHVlIEEgaW50ZWdlciB2YWx1ZSBpbiBhbiBhcnJheVxuICAgKi9cbiAgcHVibGljIHVuaWZvcm0xaXYobG9jYXRpb246IFdlYkdMVW5pZm9ybUxvY2F0aW9uLCB2YWx1ZTogSW50MzJMaXN0KTogdm9pZCB7XG4gICAgdGhpcy5fZ2wudW5pZm9ybTFpdihsb2NhdGlvbiwgdmFsdWUpO1xuICB9XG5cbiAgLyoqXG4gICAqIEF0dGFjaCB2YWx1ZXMgdG8gdGhlIHVuaWZvcm0yaXZcbiAgICogQHBhcmFtIGxvY2F0aW9uIFVuaWZvcm0gTG9jYXRpb25cbiAgICogQHBhcmFtIHZhbHVlIEludGVnZXIgdmFsdWVzIGluIGFuIGFycmF5XG4gICAqL1xuICBwdWJsaWMgdW5pZm9ybTJpdihsb2NhdGlvbjogV2ViR0xVbmlmb3JtTG9jYXRpb24sIHZhbHVlOiBJbnQzMkxpc3QpOiB2b2lkIHtcbiAgICB0aGlzLl9nbC51bmlmb3JtMml2KGxvY2F0aW9uLCB2YWx1ZSk7XG4gIH1cblxuICAvKipcbiAgICogQXR0YWNoIHZhbHVlcyB0byB0aGUgdW5pZm9ybTNpdlxuICAgKiBAcGFyYW0gbG9jYXRpb24gVW5pZm9ybSBMb2NhdGlvblxuICAgKiBAcGFyYW0gdmFsdWUgSW50ZWdlciB2YWx1ZXMgaW4gYW4gYXJyYXlcbiAgICovXG4gIHB1YmxpYyB1bmlmb3JtM2l2KGxvY2F0aW9uOiBXZWJHTFVuaWZvcm1Mb2NhdGlvbiwgdmFsdWU6IEludDMyTGlzdCk6IHZvaWQge1xuICAgIHRoaXMuX2dsLnVuaWZvcm0zaXYobG9jYXRpb24sIHZhbHVlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBdHRhY2ggdmFsdWVzIHRvIHRoZSB1bmlmb3JtNGl2XG4gICAqIEBwYXJhbSBsb2NhdGlvbiBVbmlmb3JtIExvY2F0aW9uXG4gICAqIEBwYXJhbSB2YWx1ZSBJbnRlZ2VyIHZhbHVlcyBpbiBhbiBhcnJheVxuICAgKi9cbiAgcHVibGljIHVuaWZvcm00aXYobG9jYXRpb246IFdlYkdMVW5pZm9ybUxvY2F0aW9uLCB2YWx1ZTogSW50MzJMaXN0KTogdm9pZCB7XG4gICAgdGhpcy5fZ2wudW5pZm9ybTRpdihsb2NhdGlvbiwgdmFsdWUpO1xuICB9XG5cbiAgLyoqXG4gICAqIEF0dGFjaCB2YWx1ZXMgdG8gdGhlIHVuaWZvcm0yZnZcbiAgICogQHBhcmFtIGxvY2F0aW9uIFVuaWZvcm0gTG9jYXRpb25cbiAgICogQHBhcmFtIHZhbHVlIEludGVnZXIgdmFsdWVzIGluIGFuIGFycmF5XG4gICAqIEBwYXJhbSB0cmFuc3Bvc2UgTXVzdCBiZSBhbHdheXMgZmFsc2VcbiAgICovXG4gIHB1YmxpYyB1bmlmb3JtTWF0cml4MmZ2KFxuICAgIGxvY2F0aW9uOiBXZWJHTFVuaWZvcm1Mb2NhdGlvbixcbiAgICB2YWx1ZTogRmxvYXQzMkFycmF5LFxuICAgIHRyYW5zcG9zZTogYm9vbGVhbiA9IGZhbHNlXG4gICk6IHZvaWQge1xuICAgIHRoaXMuX2dsLnVuaWZvcm1NYXRyaXgyZnYobG9jYXRpb24sIHRyYW5zcG9zZSwgdmFsdWUpO1xuICB9XG5cbiAgLyoqXG4gICAqIEF0dGFjaCB2YWx1ZXMgdG8gdGhlIHVuaWZvcm0zZnZcbiAgICogQHBhcmFtIGxvY2F0aW9uIFVuaWZvcm0gTG9jYXRpb25cbiAgICogQHBhcmFtIHZhbHVlIEludGVnZXIgdmFsdWVzIGluIGFuIGFycmF5XG4gICAqIEBwYXJhbSB0cmFuc3Bvc2UgTXVzdCBiZSBhbHdheXMgZmFsc2VcbiAgICovXG4gIHB1YmxpYyB1bmlmb3JtTWF0cml4M2Z2KFxuICAgIGxvY2F0aW9uOiBXZWJHTFVuaWZvcm1Mb2NhdGlvbixcbiAgICB2YWx1ZTogRmxvYXQzMkFycmF5LFxuICAgIHRyYW5zcG9zZTogYm9vbGVhbiA9IGZhbHNlXG4gICk6IHZvaWQge1xuICAgIHRoaXMuX2dsLnVuaWZvcm1NYXRyaXgzZnYobG9jYXRpb24sIHRyYW5zcG9zZSwgdmFsdWUpO1xuICB9XG5cbiAgLyoqXG4gICAqIEF0dGFjaCB2YWx1ZXMgdG8gdGhlIHVuaWZvcm00dnZcbiAgICogQHBhcmFtIGxvY2F0aW9uIFVuaWZvcm0gTG9jYXRpb25cbiAgICogQHBhcmFtIHZhbHVlIEludGVnZXIgdmFsdWVzIGluIGFuIGFycmF5XG4gICAqIEBwYXJhbSB0cmFuc3Bvc2UgTXVzdCBiZSBhbHdheXMgZmFsc2VcbiAgICovXG4gIHB1YmxpYyB1bmlmb3JtTWF0cml4NGZ2KFxuICAgIGxvY2F0aW9uOiBXZWJHTFVuaWZvcm1Mb2NhdGlvbixcbiAgICB2YWx1ZTogRmxvYXQzMkFycmF5LFxuICAgIHRyYW5zcG9zZTogYm9vbGVhbiA9IGZhbHNlXG4gICk6IHZvaWQge1xuICAgIHRoaXMuX2dsLnVuaWZvcm1NYXRyaXg0ZnYobG9jYXRpb24sIHRyYW5zcG9zZSwgdmFsdWUpO1xuICB9XG59XG5cbi8vIHV0aWxcbmZ1bmN0aW9uIGNvbXBpbGVTaGFkZXIoXG4gIGdsOiBXZWJHTFJlbmRlcmluZ0NvbnRleHQsXG4gIHNoYWRlcjogV2ViR0xTaGFkZXIsXG4gIHNvdXJjZTogc3RyaW5nXG4pOiBCb29sZWFuIHtcbiAgZ2wuc2hhZGVyU291cmNlKHNoYWRlciwgc291cmNlKTtcbiAgZ2wuY29tcGlsZVNoYWRlcihzaGFkZXIpO1xuXG4gIGlmICghZ2wuZ2V0U2hhZGVyUGFyYW1ldGVyKHNoYWRlciwgZ2wuQ09NUElMRV9TVEFUVVMpKSB7XG4gICAgY29uc29sZS5lcnJvcihnbC5nZXRTaGFkZXJJbmZvTG9nKHNoYWRlcikpO1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHJldHVybiB0cnVlO1xufVxuIiwiaW1wb3J0IHsgTklTR0xQcm9ncmFtIH0gZnJvbSBcIi4vTklTR0xQcm9ncmFtXCI7XG5cbmNvbnN0IEdMX1NUQVRJQ19EUkFXID0gMHg4OGU0O1xuY29uc3QgR0xfRkxPQVQgPSAweDE0MDY7XG5cbnR5cGUgQXR0cmlidXRlVHlwZSA9IHtcbiAgbmFtZTogc3RyaW5nO1xuICBzaXplOiBudW1iZXI7XG4gIHR5cGU6IEdMZW51bTtcbiAgbm9ybWFsaXplZDogYm9vbGVhbjtcbiAgc3RyaWRlOiBudW1iZXI7XG4gIG9mZnNldDogbnVtYmVyO1xufTtcbmV4cG9ydCBjbGFzcyBOSVNHTEJ1ZmZlciB7XG4gIHJlYWRvbmx5IF9nbDogV2ViR0xSZW5kZXJpbmdDb250ZXh0O1xuICByZWFkb25seSBfYnVmZmVyOiBXZWJHTEJ1ZmZlcjtcbiAgcmVhZG9ubHkgX2J1ZmZlclR5cGU6IG51bWJlcjtcbiAgcHJpdmF0ZSBfdXNhZ2U6IEdMZW51bSA9IEdMX1NUQVRJQ19EUkFXO1xuICBwcml2YXRlIF9hdHRyaWJzOiBBdHRyaWJ1dGVUeXBlW107XG4gIHByaXZhdGUgX3R5cGU6IEdMZW51bTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBnbDogV2ViR0xSZW5kZXJpbmdDb250ZXh0LFxuICAgIGJ1ZmZlcjogV2ViR0xCdWZmZXIsXG4gICAgbW9kZTogXCJhcnJheVwiIHwgXCJpbmRleFwiLFxuICAgIGRhdGE/OiBCdWZmZXJTb3VyY2UsXG4gICAgdHlwZT86IEdMZW51bVxuICApIHtcbiAgICB0aGlzLl9nbCA9IGdsO1xuICAgIHRoaXMuX2J1ZmZlciA9IGJ1ZmZlcjtcbiAgICB0aGlzLl9hdHRyaWJzID0gW107XG4gICAgdGhpcy5fYnVmZmVyVHlwZSA9XG4gICAgICBtb2RlID09PSBcImluZGV4XCIgPyBnbC5FTEVNRU5UX0FSUkFZX0JVRkZFUiA6IGdsLkFSUkFZX0JVRkZFUjtcbiAgICB0aGlzLl90eXBlID0gdHlwZSA/IHR5cGUgOiBnbC5VTlNJR05FRF9TSE9SVDtcblxuICAgIGlmIChkYXRhKSB7XG4gICAgICB0aGlzLmRhdGEoZGF0YSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEdldCBidWZmZXIgaW5zdGFuY2VcbiAgICogQHJldHVybiB7V2ViR0xCdWZmZXJ9IFdlYkdMQnVmZmVyXG4gICAqL1xuICBnZXQgZ2V0QnVmZmVyKCk6IFdlYkdMQnVmZmVyIHtcbiAgICByZXR1cm4gdGhpcy5fYnVmZmVyO1xuICB9XG5cbiAgLyoqXG4gICAqIEJpbmQgYnVmZmVyXG4gICAqL1xuICBiaW5kKCkge1xuICAgIHRoaXMuX2dsLmJpbmRCdWZmZXIodGhpcy5fYnVmZmVyVHlwZSwgdGhpcy5fYnVmZmVyKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXQgSW5kZXhCdWZmZXIgVHlwZVxuICAgKiBAcGFyYW0ge0dMZW51bX0gdHlwZVxuICAgKi9cbiAgc2V0VHlwZSh0eXBlOiBHTGVudW0pIHtcbiAgICB0aGlzLl90eXBlID0gdHlwZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBEaXNwb3NlIHRoZSBidWZmZXJcbiAgICovXG4gIGRpc3Bvc2UoKTogdm9pZCB7XG4gICAgdGhpcy5fZ2wuZGVsZXRlQnVmZmVyKHRoaXMuX2J1ZmZlcik7XG4gIH1cblxuICAvKipcbiAgICogU2V0IGRhdGEgaW50byB0aGUgYnVmZmVyXG4gICAqIEBwYXJhbSBzb3VyY2VcbiAgICovXG4gIGRhdGEoc291cmNlOiBCdWZmZXJTb3VyY2UpIHtcbiAgICBjb25zdCBnbCA9IHRoaXMuX2dsO1xuICAgIGdsLmJpbmRCdWZmZXIodGhpcy5fYnVmZmVyVHlwZSwgdGhpcy5fYnVmZmVyKTtcbiAgICBnbC5idWZmZXJEYXRhKHRoaXMuX2J1ZmZlclR5cGUsIHNvdXJjZSwgdGhpcy5fdXNhZ2UpO1xuICAgIGdsLmJpbmRCdWZmZXIodGhpcy5fYnVmZmVyVHlwZSwgbnVsbCk7XG4gIH1cblxuICAvKipcbiAgICogU3RvcmUgYXR0cmlidXRlIGRhdGFcbiAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWUgQXR0aWJ1dGUgbmFtZVxuICAgKiBAcGFyYW0gc2l6ZSBTaXplIG9mIGdlb21ldHJ5IG9iamVjdCwgTXVzdCBiZSAxLDIsMyBvciA0IChlLmcuIHgseSx6IG9iamVjdCBpcyAzKVxuICAgKiBAcGFyYW0gdHlwZSBTcGVjaWZ5aW5nIHRoZSBkYXRhIHR5cGUsIGRlZmF1bHQgR0xfRkxPQVQgKDB4MTQwNilcbiAgICogQHBhcmFtIG5vcm1hbGl6ZWQgTm9ybWFsaXplZCBWQk8sIGRlZmF1bHQgZmFsc2VcbiAgICogQHBhcmFtIHN0cmlkZSBkZWZhdWx0IDBcbiAgICogQHBhcmFtIG9mZnNldCBkZWZhdWx0IDBcbiAgICovXG4gIGF0dHJpYihcbiAgICBuYW1lOiBzdHJpbmcsXG4gICAgc2l6ZTogbnVtYmVyLFxuICAgIHR5cGU6IEdMZW51bSA9IEdMX0ZMT0FULFxuICAgIG5vcm1hbGl6ZWQ6IGJvb2xlYW4gPSBmYWxzZSxcbiAgICBzdHJpZGU6IG51bWJlciA9IDAsXG4gICAgb2Zmc2V0OiBudW1iZXIgPSAwXG4gICkge1xuICAgIGlmICghbmFtZSAmJiAhc2l6ZSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQnVmZmVyIGF0dHJpYnV0ZSBuYW1lIG9yIHNpemUgZG9lcyBub3Qgc2V0IHByb3Blcmx5XCIpO1xuICAgIH1cblxuICAgIHRoaXMuX2F0dHJpYnMucHVzaCh7XG4gICAgICBuYW1lLFxuICAgICAgc2l6ZSxcbiAgICAgIHR5cGUsXG4gICAgICBub3JtYWxpemVkLFxuICAgICAgc3RyaWRlLFxuICAgICAgb2Zmc2V0LFxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFN1YnNjcmliZSBWQk8gYXR0cmlidXRlc1xuICAgKiBAcGFyYW0ge05JU0dMUHJvZ3JhbX0gcHJvZ3JhbVxuICAgKi9cbiAgYXR0cmliUG9pbnRlcihwcm9ncmFtOiBOSVNHTFByb2dyYW0pIHtcbiAgICBjb25zdCBnbCA9IHRoaXMuX2dsO1xuXG4gICAgaWYgKHRoaXMuX2F0dHJpYnMubGVuZ3RoIDw9IDApIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIkJ1ZmZlciBkb2VzIG5vdCBzZXQgYW55IGF0dHJpYnV0ZVwiKTtcbiAgICB9XG5cbiAgICB0aGlzLl9hdHRyaWJzLmZvckVhY2goKGF0dHJpYikgPT4ge1xuICAgICAgY29uc3QgYXR0cmliTG9jYXRpb24gPSBnbC5nZXRBdHRyaWJMb2NhdGlvbihcbiAgICAgICAgcHJvZ3JhbS5nZXRQcm9ncmFtLFxuICAgICAgICBhdHRyaWIubmFtZVxuICAgICAgKTtcbiAgICAgIGlmIChhdHRyaWJMb2NhdGlvbiAhPT0gLTEpIHtcbiAgICAgICAgZ2wuYmluZEJ1ZmZlcih0aGlzLl9idWZmZXJUeXBlLCB0aGlzLl9idWZmZXIpO1xuICAgICAgICBnbC5lbmFibGVWZXJ0ZXhBdHRyaWJBcnJheShhdHRyaWJMb2NhdGlvbik7XG4gICAgICAgIGdsLnZlcnRleEF0dHJpYlBvaW50ZXIoXG4gICAgICAgICAgYXR0cmliTG9jYXRpb24sXG4gICAgICAgICAgYXR0cmliLnNpemUsXG4gICAgICAgICAgYXR0cmliLnR5cGUsXG4gICAgICAgICAgYXR0cmliLm5vcm1hbGl6ZWQsXG4gICAgICAgICAgYXR0cmliLnN0cmlkZSxcbiAgICAgICAgICBhdHRyaWIub2Zmc2V0XG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogU2hvcnRjdXQgb2YgRHJhdyBmdW5jdGlvblxuICAgKiBAcGFyYW0ge0dMZW51bX0gbW9kZVxuICAgKiBAcGFyYW0ge251bWJlcn0gY291bnRcbiAgICogQHBhcmFtIHtudW1iZXJ9IG9mZnNldFxuICAgKi9cbiAgZHJhdyhtb2RlOiBHTGVudW0sIGNvdW50OiBudW1iZXIsIG9mZnNldDogbnVtYmVyID0gMCkge1xuICAgIGNvbnN0IGdsID0gdGhpcy5fZ2w7XG4gICAgaWYgKHRoaXMuX2J1ZmZlclR5cGUgPT09IGdsLkVMRU1FTlRfQVJSQVlfQlVGRkVSKSB7XG4gICAgICBnbC5kcmF3RWxlbWVudHMobW9kZSwgY291bnQsIHRoaXMuX3R5cGUsIG9mZnNldCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGdsLmRyYXdBcnJheXMobW9kZSwgY291bnQsIG9mZnNldCk7XG4gICAgfVxuICB9XG5cbiAgZHJhd1BvaW50cyhjb3VudDogbnVtYmVyLCBvZmZzZXQ6IG51bWJlcikge1xuICAgIHRoaXMuZHJhdygwLCBjb3VudCwgb2Zmc2V0KTtcbiAgfVxuXG4gIGRyYXdMaW5lcyhjb3VudDogbnVtYmVyLCBvZmZzZXQ6IG51bWJlcikge1xuICAgIHRoaXMuZHJhdygxLCBjb3VudCwgb2Zmc2V0KTtcbiAgfVxuXG4gIGRyYXdMaW5lTG9vcChjb3VudDogbnVtYmVyLCBvZmZzZXQ6IG51bWJlcikge1xuICAgIHRoaXMuZHJhdygyLCBjb3VudCwgb2Zmc2V0KTtcbiAgfVxuXG4gIGRyYXdMaW5lU3RyaXAoY291bnQ6IG51bWJlciwgb2Zmc2V0OiBudW1iZXIpIHtcbiAgICB0aGlzLmRyYXcoMywgY291bnQsIG9mZnNldCk7XG4gIH1cblxuICBkcmF3VHJpYW5nbGVzKGNvdW50OiBudW1iZXIsIG9mZnNldDogbnVtYmVyKSB7XG4gICAgdGhpcy5kcmF3KDQsIGNvdW50LCBvZmZzZXQpO1xuICB9XG5cbiAgZHJhd1RyaWFuZ2xlU3RyaXBzKGNvdW50OiBudW1iZXIsIG9mZnNldDogbnVtYmVyKSB7XG4gICAgdGhpcy5kcmF3KDUsIGNvdW50LCBvZmZzZXQpO1xuICB9XG5cbiAgZHJhd1RyaWFuZ2xlRmFuKGNvdW50OiBudW1iZXIsIG9mZnNldDogbnVtYmVyKSB7XG4gICAgdGhpcy5kcmF3KDYsIGNvdW50LCBvZmZzZXQpO1xuICB9XG59XG4iLCJleHBvcnQgY2xhc3MgTklTR0xUZXh0dXJlIHtcbiAgcmVhZG9ubHkgX2dsOiBXZWJHTFJlbmRlcmluZ0NvbnRleHQ7XG4gIHJlYWRvbmx5IF90ZXh0dXJlOiBXZWJHTFRleHR1cmU7XG4gIHByaXZhdGUgX3dpZHRoOiBudW1iZXI7XG4gIHByaXZhdGUgX2hlaWdodDogbnVtYmVyO1xuICBwcml2YXRlIF9mb3JtYXQ6IEdMZW51bTtcblxuICBjb25zdHJ1Y3RvcihnbDogV2ViR0xSZW5kZXJpbmdDb250ZXh0LCBmb3JtYXQ/OiBHTGVudW0pIHtcbiAgICB0aGlzLl9nbCA9IGdsO1xuICAgIHRoaXMuX3RleHR1cmUgPSA8V2ViR0xUZXh0dXJlPmdsLmNyZWF0ZVRleHR1cmUoKTtcbiAgICB0aGlzLl93aWR0aCA9IDA7XG4gICAgdGhpcy5faGVpZ2h0ID0gMDtcbiAgICB0aGlzLl9mb3JtYXQgPSBmb3JtYXQgfHwgZ2wuVU5TSUdORURfQllURTtcbiAgICAvLyB0aGlzLnNldEZpbHRlcih0cnVlLCBmYWxzZSwgZmFsc2UpO1xuICB9XG5cbiAgLyoqXG4gICAqIEJpbmQgVGV4dHVyZVxuICAgKiBAcGFyYW0ge251bWJlcn0gaWQgLSBTZXQgQWN0aXZlIFRleHR1cmUgKERlZmF1bHQ6IDApXG4gICAqL1xuICBwdWJsaWMgYmluZChpZD86IG51bWJlcik6IHZvaWQge1xuICAgIGNvbnN0IGdsID0gdGhpcy5fZ2w7XG4gICAgaWYgKGlkICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIGdsLmFjdGl2ZVRleHR1cmUoZ2wuVEVYVFVSRTAgKyAoMCB8IGlkKSk7XG4gICAgfVxuICAgIGdsLmJpbmRUZXh0dXJlKGdsLlRFWFRVUkVfMkQsIHRoaXMuX3RleHR1cmUpO1xuICB9XG5cbiAgLyoqXG4gICAqIERpc3Bvc2UgVGV4dHVyZVxuICAgKi9cbiAgcHVibGljIGRpc3Bvc2UoKSB7XG4gICAgY29uc3QgZ2wgPSB0aGlzLl9nbDtcbiAgICBnbC5kZWxldGVUZXh0dXJlKHRoaXMuX3RleHR1cmUpO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldCBUZXh0dXJlIEZvcm1hdFxuICAgKiBAcGFyYW0ge0dMZW51bX0gZm9ybWF0XG4gICAqL1xuICBwdWJsaWMgc2V0Rm9ybWF0KGZvcm1hdDogR0xlbnVtKSB7XG4gICAgdGhpcy5fZm9ybWF0ID0gZm9ybWF0O1xuICB9XG5cbiAgLyoqXG4gICAqIFNldCBmaWx0ZXIgdG8gdGV4dHVyZVxuICAgKiBAZXhhbXBsZVxuICAgKiBQYXJhbWV0ZXIgbGlzdDpcbiAgICogZmFsc2UsIGZhbHNlLCBmYWxzZSA9IGdsLk5FQVJFU1QgKDk3MjgpIC0gRGVmdWFsdFxuICAgKiB0cnVlLCBmYWxzZSwgZmFsc2UgPSBnbC5MSU5FQVIgKDk3MjkpXG4gICAqIGZhbHNlLCB0cnVlLCBmYWxzZSA9IGdsLk5FQVJFU1RfTUlQTUFQX05FQVJFU1QgKDk5ODQpXG4gICAqIHRydWUsIHRydWUsIGZhbHNlID0gIGdsLkxJTkVBUl9NSVBNQVBfTkVBUkVTVCAoOTk4NSlcbiAgICogZmFsc2UsIHRydWUsIHRydWUgPSBnbC5MTkVBUkVTVF9NSVBNQVBfTElORUFSICg5OTg2KVxuICAgKiB0cnVlLCB0cnVlLCB0cnVlID0gZ2wuTElORUFSX01JUE1BUF9MSU5FQVIgKDk5ODcpXG4gICAqIGZhbHNlLCBmYWxzZSwgdHJ1ZSA9IGdsLk5FQVJFU1QgKDk3MjgpXG4gICAqXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gbGluZXJcbiAgICogQHBhcmFtIHtib29sZWFufSBuZWFyTWlwbWFwXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gbGluZXJNaXBtYXBcbiAgICovXG4gIHB1YmxpYyBzZXRGaWx0ZXIoXG4gICAgbGluZXI6IGJvb2xlYW4gPSBmYWxzZSxcbiAgICBuZWFyTWlwbWFwOiBib29sZWFuID0gZmFsc2UsXG4gICAgbGluZXJNaXBtYXA6IGJvb2xlYW4gPSBmYWxzZVxuICApIHtcbiAgICBjb25zdCBnbCA9IHRoaXMuX2dsO1xuICAgIGdsLnRleFBhcmFtZXRlcmkoXG4gICAgICBnbC5URVhUVVJFXzJELFxuICAgICAgZ2wuVEVYVFVSRV9NQUdfRklMVEVSLFxuICAgICAgZ2V0RmlsdGVyQ29uc3RhbnRzKGxpbmVyLCBmYWxzZSwgZmFsc2UpXG4gICAgKTtcbiAgICBnbC50ZXhQYXJhbWV0ZXJpKFxuICAgICAgZ2wuVEVYVFVSRV8yRCxcbiAgICAgIGdsLlRFWFRVUkVfTUlOX0ZJTFRFUixcbiAgICAgIGdldEZpbHRlckNvbnN0YW50cyhsaW5lciwgbmVhck1pcG1hcCwgbGluZXJNaXBtYXApXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXQgUmVwZWF0IFdyYXBcbiAgICovXG4gIHB1YmxpYyBzZXRSZXBlYXRXcmFwKCkge1xuICAgIGNvbnN0IGdsID0gdGhpcy5fZ2w7XG4gICAgZ2wudGV4UGFyYW1ldGVyaShnbC5URVhUVVJFXzJELCBnbC5URVhUVVJFX1dSQVBfUywgZ2wuUkVQRUFUKTtcbiAgICBnbC50ZXhQYXJhbWV0ZXJpKGdsLlRFWFRVUkVfMkQsIGdsLlRFWFRVUkVfV1JBUF9ULCBnbC5SRVBFQVQpO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldCBDbGFtcCBXcmFwXG4gICAqL1xuICBwdWJsaWMgc2V0Q2xhbXBXcmFwKCkge1xuICAgIGNvbnN0IGdsID0gdGhpcy5fZ2w7XG4gICAgZ2wudGV4UGFyYW1ldGVyaShnbC5URVhUVVJFXzJELCBnbC5URVhUVVJFX1dSQVBfUywgZ2wuQ0xBTVBfVE9fRURHRSk7XG4gICAgZ2wudGV4UGFyYW1ldGVyaShnbC5URVhUVVJFXzJELCBnbC5URVhUVVJFX1dSQVBfVCwgZ2wuQ0xBTVBfVE9fRURHRSk7XG4gIH1cblxuICAvKipcbiAgICogU2V0IE1pcnJvciBXcmFwXG4gICAqL1xuICBwdWJsaWMgc2V0TWlycm9yV3JhcCgpIHtcbiAgICBjb25zdCBnbCA9IHRoaXMuX2dsO1xuICAgIGdsLnRleFBhcmFtZXRlcmkoZ2wuVEVYVFVSRV8yRCwgZ2wuVEVYVFVSRV9XUkFQX1MsIGdsLk1JUlJPUkVEX1JFUEVBVCk7XG4gICAgZ2wudGV4UGFyYW1ldGVyaShnbC5URVhUVVJFXzJELCBnbC5URVhUVVJFX1dSQVBfVCwgZ2wuTUlSUk9SRURfUkVQRUFUKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXQgdGV4dHVyZSBmcm9tIGltYWdlIChlLmcuIGpwZy9wbmcpXG4gICAqIEBwYXJhbSB7VGV4SW1hZ2VTb3VyY2V9IHNvdXJjZVxuICAgKi9cbiAgcHVibGljIGZyb21JbWFnZShzb3VyY2U6IFRleEltYWdlU291cmNlKTogdm9pZCB7XG4gICAgY29uc3QgZ2wgPSB0aGlzLl9nbDtcblxuICAgIHRoaXMuX3dpZHRoID0gc291cmNlLndpZHRoO1xuICAgIHRoaXMuX2hlaWdodCA9IHNvdXJjZS5oZWlnaHQ7XG5cbiAgICBnbC5iaW5kVGV4dHVyZShnbC5URVhUVVJFXzJELCB0aGlzLl90ZXh0dXJlKTtcbiAgICBnbC50ZXhJbWFnZTJEKGdsLlRFWFRVUkVfMkQsIDAsIGdsLlJHQkEsIGdsLlJHQkEsIHRoaXMuX2Zvcm1hdCwgc291cmNlKTtcblxuICAgIC8vIG5lZWQgdG8gZ2VuZXJhdGUgbWlwbWFwP1xuICAgIC8vIGdsLmdlbmVyYXRlTWlwbWFwKGdsLlRFWFRVUkVfMkQpO1xuICB9XG5cbiAgLy8gcHJldHRpZXItaWdub3JlXG4gIHB1YmxpYyBmcm9tRGF0YSh3aWR0aDogbnVtYmVyLCBoZWlnaHQ6bnVtYmVyLCBkYXRhOiBBcnJheUJ1ZmZlclZpZXcgfCBudWxsKSB7XG4gICAgY29uc3QgZ2wgPSB0aGlzLl9nbDtcblxuICAgIHRoaXMuX3dpZHRoID0gd2lkdGg7XG4gICAgdGhpcy5faGVpZ2h0ID0gaGVpZ2h0O1xuXG4gICAgZGF0YSA9IGRhdGEgfHwgbnVsbDtcblxuICAgIGdsLmJpbmRUZXh0dXJlKGdsLlRFWFRVUkVfMkQsIHRoaXMuX3RleHR1cmUpO1xuICAgIGdsLnRleEltYWdlMkQoZ2wuVEVYVFVSRV8yRCwgMCwgZ2wuUkdCQSwgdGhpcy5fd2lkdGgsIHRoaXMuX2hlaWdodCwgMCwgZ2wuUkdCQSwgdGhpcy5fZm9ybWF0LCBkYXRhKTtcbiAgfVxufVxuXG4vLyB1dGlsXG4vKipcbiAqIEdldCBXZWJHTCBUZXh0dXJlIENvbnN0YW50c1xuICogQHBhcmFtIHtib29sZWFufSBsaW5lclxuICogQHBhcmFtIHtib29sZWFufSBuZWFyTWlwbWFwXG4gKiBAcGFyYW0ge2Jvb2xlYW59IGxpbmVyTWlwbWFwXG4gKiBAcmV0dXJucyB7R0xlbnVtfSBSZXR1cm4gVGV4dHVyZSBDb25zdGFudHNcbiAqIEBzZWUge0BsaW5rIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0FQSS9XZWJHTF9BUEkvQ29uc3RhbnRzI3RleHR1cmVzfVxuICovXG5mdW5jdGlvbiBnZXRGaWx0ZXJDb25zdGFudHMoXG4gIGxpbmVyOiBib29sZWFuLFxuICBuZWFyTWlwbWFwOiBib29sZWFuLFxuICBsaW5lck1pcG1hcDogYm9vbGVhblxuKTogR0xlbnVtIHtcbiAgcmV0dXJuIChcbiAgICAweDI2MDAgfCArbGluZXIgfCAoK25lYXJNaXBtYXAgPDwgOCkgfCAoKyhuZWFyTWlwbWFwICYmIGxpbmVyTWlwbWFwKSA8PCAxKVxuICApO1xufVxuIiwiaW1wb3J0IHsgTklTR0xUZXh0dXJlIH0gZnJvbSBcIi4vTklTR0xUZXh0dXJlXCI7XG5cbnR5cGUgQXR0YWNobWVudFR5cGUgPSBOSVNHTFRleHR1cmUgfCBOSVNHTFJlbmRlckJ1ZmZlcjtcblxuZXhwb3J0IGNsYXNzIE5JU0dMRnJhbWVCdWZmZXIge1xuICByZWFkb25seSBfZ2w6IFdlYkdMUmVuZGVyaW5nQ29udGV4dDtcbiAgcmVhZG9ubHkgX2ZyYW1lQnVmZmVyOiBXZWJHTEZyYW1lYnVmZmVyO1xuICBwcml2YXRlIF93aWR0aDogbnVtYmVyO1xuICBwcml2YXRlIF9oZWlnaHQ6IG51bWJlcjtcbiAgcHJpdmF0ZSBfYXR0YWNobWVudHM6IEF0dGFjaG1lbnRbXSA9IFtdO1xuXG4gIGNvbnN0cnVjdG9yKGdsOiBXZWJHTFJlbmRlcmluZ0NvbnRleHQsIHdpZHRoPzogbnVtYmVyLCBoZWlnaHQ/OiBudW1iZXIpIHtcbiAgICB0aGlzLl9nbCA9IGdsO1xuICAgIHRoaXMuX3dpZHRoID0gd2lkdGggPyB3aWR0aCA6IDA7XG4gICAgdGhpcy5faGVpZ2h0ID0gaGVpZ2h0ID8gaGVpZ2h0IDogMDtcblxuICAgIHRoaXMuX2ZyYW1lQnVmZmVyID0gPFdlYkdMRnJhbWVidWZmZXI+Z2wuY3JlYXRlRnJhbWVidWZmZXIoKTtcbiAgICB0aGlzLmJpbmQoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBCaW5kIEZyYW1lQnVmZmVyXG4gICAqL1xuICBwdWJsaWMgYmluZCgpOiB2b2lkIHtcbiAgICBjb25zdCBnbCA9IHRoaXMuX2dsO1xuICAgIGdsLmJpbmRGcmFtZWJ1ZmZlcihnbC5GUkFNRUJVRkZFUiwgdGhpcy5fZnJhbWVCdWZmZXIpO1xuICB9XG5cbiAgLyoqXG4gICAqIFVuYmluZCBGcmFtZUJ1ZmZlclxuICAgKi9cbiAgcHVibGljIHVuYmluZCgpOiB2b2lkIHtcbiAgICBjb25zdCBnbCA9IHRoaXMuX2dsO1xuICAgIGdsLmJpbmRGcmFtZWJ1ZmZlcihnbC5GUkFNRUJVRkZFUiwgbnVsbCk7XG4gIH1cblxuICAvKipcbiAgICogRGlzcG9zZSB0aGUgRnJhbWVCdWZmZXIgaW5zdGFuY2VcbiAgICovXG4gIHB1YmxpYyBkaXNwb3NlKCk6IHZvaWQge1xuICAgIGNvbnN0IGdsID0gdGhpcy5fZ2w7XG4gICAgZ2wuZGVsZXRlRnJhbWVidWZmZXIodGhpcy5fZnJhbWVCdWZmZXIpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlc2l6ZVxuICAgKiBJZiBpdCBoYXMgYXR0YWNobWVudChzKSwgdGhlIGF0dGFjaG1lbnRzIHJ1bnMgcmVzaXplIGFzIHdlbGxcbiAgICogQHBhcmFtIHtudW1iZXJ9IHdpZHRoXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBoZWlnaHRcbiAgICovXG4gIHB1YmxpYyByZXNpemUod2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIpOiB2b2lkIHtcbiAgICB0aGlzLl93aWR0aCA9IHdpZHRoO1xuICAgIHRoaXMuX2hlaWdodCA9IGhlaWdodDtcblxuICAgIHRoaXMuX2F0dGFjaG1lbnRzLmZvckVhY2goKGF0dGFjaG1lbnQpID0+IHtcbiAgICAgIGF0dGFjaG1lbnQucmVzaXplKHRoaXMuX3dpZHRoLCB0aGlzLl9oZWlnaHQpO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldCBEZXB0aCBCdWZmZXJcbiAgICovXG4gIHB1YmxpYyBhdHRhY2hEZXB0aCgpIHtcbiAgICBjb25zdCBnbCA9IHRoaXMuX2dsO1xuICAgIGNvbnN0IGF0dGFjaG1lbnQgPSBuZXcgQXR0YWNobWVudChuZXcgTklTR0xSZW5kZXJCdWZmZXIoZ2wpKTtcbiAgICBhdHRhY2htZW50LmF0dGFjaCgpO1xuICAgIHRoaXMuX2F0dGFjaG1lbnRzW2dsLkRFUFRIX0FUVEFDSE1FTlRdID0gYXR0YWNobWVudDtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXQgVGV4dHVyZSBCdWZmZXJcbiAgICogQHBhcmFtIHtHTGVudW0gfCB1bmRlZmluZWR9IGZvcm1hdFxuICAgKi9cbiAgcHVibGljIGF0dGFjaFRleHR1cmUoZm9ybWF0PzogR0xlbnVtLCBuZWFyPzogYm9vbGVhbikge1xuICAgIGNvbnN0IGdsID0gdGhpcy5fZ2w7XG4gICAgY29uc3QgdGV4dHVyZSA9IG5ldyBOSVNHTFRleHR1cmUoZ2wsIGZvcm1hdCk7XG4gICAgdGV4dHVyZS5mcm9tRGF0YSh0aGlzLl93aWR0aCwgdGhpcy5faGVpZ2h0LCBudWxsKTtcbiAgICBpZiAobmVhcikge1xuICAgICAgdGV4dHVyZS5zZXRGaWx0ZXIoZmFsc2UsIGZhbHNlLCBmYWxzZSk7XG4gICAgfVxuICAgIGNvbnN0IGF0dGFjaG1lbnQgPSBuZXcgQXR0YWNobWVudCh0ZXh0dXJlKTtcbiAgICBhdHRhY2htZW50LmF0dGFjaCgpO1xuICAgIHRoaXMuX2F0dGFjaG1lbnRzW2dsLkNPTE9SX0FUVEFDSE1FTlQwXSA9IGF0dGFjaG1lbnQ7XG4gIH1cblxuICAvKipcbiAgICogR2V0IERlcHRoIEJ1ZmZlclxuICAgKiBAcmV0dXJucyB7V2ViR0xSZW5kZXJidWZmZXIgfCBudWxsfVxuICAgKi9cbiAgcHVibGljIGdldERlcHRoKCkge1xuICAgIGNvbnN0IGdsID0gdGhpcy5fZ2w7XG4gICAgY29uc3QgYXR0YWNobWVudCA9IHRoaXMuX2F0dGFjaG1lbnRzW2dsLkRFUFRIX0FUVEFDSE1FTlRdO1xuICAgIGlmIChhdHRhY2htZW50KSB7XG4gICAgICByZXR1cm4gYXR0YWNobWVudC5fdGFyZ2V0O1xuICAgIH1cblxuICAgIGNvbnNvbGUud2FybihcIlRoZSBkZXB0aCBmcmFtZWJ1ZmZlciBkb2VzIG5vdCBleGlzdFwiKTtcblxuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCBUZXh0dXJlIEJ1ZmZlclxuICAgKiBAcmV0dXJucyB7TklTR0xUZXh0dXJlIHwgbnVsbH1cbiAgICovXG4gIHB1YmxpYyBnZXRUZXh0dXJlKCkge1xuICAgIGNvbnN0IGdsID0gdGhpcy5fZ2w7XG4gICAgY29uc3QgYXR0YWNobWVudCA9IHRoaXMuX2F0dGFjaG1lbnRzW2dsLkNPTE9SX0FUVEFDSE1FTlQwXTtcbiAgICBpZiAoYXR0YWNobWVudCkge1xuICAgICAgcmV0dXJuIGF0dGFjaG1lbnQuX3RhcmdldDtcbiAgICB9XG5cbiAgICBjb25zb2xlLndhcm4oXCJUaGUgY29sb3IgdGV4dHVyZSBmcmFtZWJ1ZmZlciBkb2VzIG5vdCBleGlzdFwiKTtcblxuICAgIHJldHVybiBudWxsO1xuICB9XG59XG5cbmNsYXNzIEF0dGFjaG1lbnQge1xuICByZWFkb25seSBfdGFyZ2V0OiBBdHRhY2htZW50VHlwZTtcblxuICBjb25zdHJ1Y3Rvcih0YXJnZXQ6IEF0dGFjaG1lbnRUeXBlKSB7XG4gICAgdGhpcy5fdGFyZ2V0ID0gdGFyZ2V0O1xuICB9XG5cbiAgLyoqXG4gICAqIFJlc2l6ZSB0YXJnZXRcbiAgICogQHBhcmFtIHtudW1iZXJ9IHdpZHRoXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBoZWlnaHRcbiAgICovXG4gIHB1YmxpYyByZXNpemUod2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIpIHtcbiAgICBpZiAodGhpcy5fdGFyZ2V0IGluc3RhbmNlb2YgTklTR0xUZXh0dXJlKSB7XG4gICAgICB0aGlzLl90YXJnZXQuZnJvbURhdGEod2lkdGgsIGhlaWdodCwgbnVsbCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX3RhcmdldC5yZXNpemUod2lkdGgsIGhlaWdodCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEF0dGFjaCBUZXh0dXJlIG9yIFJlbmRlckJ1ZmZlciB0byBGcmFtZUJ1ZmZlclxuICAgKi9cbiAgcHVibGljIGF0dGFjaCgpIHtcbiAgICBjb25zdCBnbCA9IHRoaXMuX3RhcmdldC5fZ2w7XG5cbiAgICBpZiAodGhpcy5fdGFyZ2V0IGluc3RhbmNlb2YgTklTR0xUZXh0dXJlKSB7XG4gICAgICBnbC5mcmFtZWJ1ZmZlclRleHR1cmUyRChcbiAgICAgICAgZ2wuRlJBTUVCVUZGRVIsXG4gICAgICAgIGdsLkNPTE9SX0FUVEFDSE1FTlQwLFxuICAgICAgICBnbC5URVhUVVJFXzJELFxuICAgICAgICB0aGlzLl90YXJnZXQuX3RleHR1cmUsXG4gICAgICAgIDBcbiAgICAgICk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGdsLmZyYW1lYnVmZmVyUmVuZGVyYnVmZmVyKFxuICAgICAgICBnbC5GUkFNRUJVRkZFUixcbiAgICAgICAgZ2wuREVQVEhfQVRUQUNITUVOVCxcbiAgICAgICAgZ2wuUkVOREVSQlVGRkVSLFxuICAgICAgICB0aGlzLl90YXJnZXQuX3JlbmRlckJ1ZmZlclxuICAgICAgKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogRGVhdHRhY2ggVGV4dHVyZSBvciBSZW5kZXJCdWZmZXIgdG8gRnJhbWVCdWZmZXJcbiAgICovXG4gIHB1YmxpYyBkZWF0dGFjaCgpIHtcbiAgICBjb25zdCBnbCA9IHRoaXMuX3RhcmdldC5fZ2w7XG5cbiAgICBpZiAodGhpcy5fdGFyZ2V0IGluc3RhbmNlb2YgTklTR0xUZXh0dXJlKSB7XG4gICAgICBnbC5mcmFtZWJ1ZmZlclRleHR1cmUyRChcbiAgICAgICAgZ2wuRlJBTUVCVUZGRVIsXG4gICAgICAgIGdsLkNPTE9SX0FUVEFDSE1FTlQwLFxuICAgICAgICBnbC5URVhUVVJFXzJELFxuICAgICAgICBudWxsLFxuICAgICAgICAwXG4gICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICBnbC5mcmFtZWJ1ZmZlclJlbmRlcmJ1ZmZlcihcbiAgICAgICAgZ2wuRlJBTUVCVUZGRVIsXG4gICAgICAgIGdsLkRFUFRIX0FUVEFDSE1FTlQsXG4gICAgICAgIGdsLkZSQU1FQlVGRkVSLFxuICAgICAgICBudWxsXG4gICAgICApO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBEaXNwb3NlIFRhcmdldFxuICAgKi9cbiAgcHVibGljIGRpc3Bvc2UoKSB7XG4gICAgdGhpcy5fdGFyZ2V0LmRpc3Bvc2UoKTtcbiAgfVxufVxuXG5jbGFzcyBOSVNHTFJlbmRlckJ1ZmZlciB7XG4gIHJlYWRvbmx5IF9nbDogV2ViR0xSZW5kZXJpbmdDb250ZXh0O1xuICByZWFkb25seSBfcmVuZGVyQnVmZmVyOiBXZWJHTFJlbmRlcmJ1ZmZlcjtcbiAgcHJpdmF0ZSBfd2lkdGg6IG51bWJlciA9IDA7XG4gIHByaXZhdGUgX2hlaWdodDogbnVtYmVyID0gMDtcblxuICBjb25zdHJ1Y3RvcihnbDogV2ViR0xSZW5kZXJpbmdDb250ZXh0KSB7XG4gICAgdGhpcy5fZ2wgPSBnbDtcbiAgICB0aGlzLl9yZW5kZXJCdWZmZXIgPSA8V2ViR0xSZW5kZXJidWZmZXI+Z2wuY3JlYXRlUmVuZGVyYnVmZmVyKCk7XG4gIH1cblxuICAvKipcbiAgICogQmluZCBSZW5kZXJCdWZmZXJcbiAgICovXG4gIHB1YmxpYyBiaW5kKCkge1xuICAgIGNvbnN0IGdsID0gdGhpcy5fZ2w7XG4gICAgZ2wuYmluZFJlbmRlcmJ1ZmZlcihnbC5SRU5ERVJCVUZGRVIsIHRoaXMuX3JlbmRlckJ1ZmZlcik7XG4gIH1cblxuICAvKipcbiAgICogRGlzcG9zZSBSZW5kZXJCdWZmZXJcbiAgICovXG4gIHB1YmxpYyBkaXNwb3NlKCkge1xuICAgIGNvbnN0IGdsID0gdGhpcy5fZ2w7XG4gICAgZ2wuZGVsZXRlUmVuZGVyYnVmZmVyKHRoaXMuX3JlbmRlckJ1ZmZlcik7XG4gIH1cblxuICAvKipcbiAgICogUmVzaXplIFJlbmRlckJ1ZmZlclxuICAgKiBAcGFyYW0ge251bWJlcn0gd2lkdGhcbiAgICogQHBhcmFtIHtudW1iZXJ9IGhlaWdodFxuICAgKi9cbiAgcHVibGljIHJlc2l6ZSh3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlcikge1xuICAgIHRoaXMuX3dpZHRoID0gd2lkdGg7XG4gICAgdGhpcy5faGVpZ2h0ID0gaGVpZ2h0O1xuICAgIHRoaXMuc3RvcmFnZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldCB3aWR0aC9oZWlnaHQgaW50byBSZW5kZXJCdWZmZXJcbiAgICovXG4gIHB1YmxpYyBzdG9yYWdlKCkge1xuICAgIGNvbnN0IGdsID0gdGhpcy5fZ2w7XG4gICAgZ2wucmVuZGVyYnVmZmVyU3RvcmFnZShcbiAgICAgIGdsLlJFTkRFUkJVRkZFUixcbiAgICAgIGdsLkRFUFRIX0NPTVBPTkVOVDE2LFxuICAgICAgdGhpcy5fd2lkdGgsXG4gICAgICB0aGlzLl9oZWlnaHRcbiAgICApO1xuICB9XG59XG4iLCJpbXBvcnQgeyBOSVNHTFByb2dyYW0gfSBmcm9tIFwiLi9OSVNHTFByb2dyYW1cIjtcbmltcG9ydCB7IE5JU0dMQnVmZmVyIH0gZnJvbSBcIi4vTklTR0xCdWZmZXJcIjtcbmltcG9ydCB7IE5JU0dMVGV4dHVyZSB9IGZyb20gXCIuL05JU0dMVGV4dHVyZVwiO1xuaW1wb3J0IHsgTklTR0xGcmFtZUJ1ZmZlciB9IGZyb20gXCIuL05JU0dMRnJhbWVCdWZmZXJcIjtcblxuY29uc3QgR0xfREVQVEhfQlVGRkVSX0JJVCA9IDB4MDAwMDAxMDA7XG5jb25zdCBHTF9DT0xPUl9CVUZGRVJfQklUID0gMHgwMDAwNDAwMDtcblxuZXhwb3J0IGNsYXNzIE5JU0dMIHtcbiAgcHJpdmF0ZSBfbWVzc2FnZSA9IG5ldyBFcnJvcihcIkV4ZXB0aW9uIEVycm9yXCIpO1xuICByZWFkb25seSBfZ2w6IFdlYkdMUmVuZGVyaW5nQ29udGV4dDtcblxuICBjb25zdHJ1Y3RvcihnbDogV2ViR0xSZW5kZXJpbmdDb250ZXh0KSB7XG4gICAgdGhpcy5fZ2wgPSBnbDtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgcmVuZGVyaW5nIGNvbnRleHRcbiAgICogQHJldHVybiB7V2ViR0xSZW5kZXJpbmdDb250ZXh0fSAgV2ViR0wgQ29udGV4dFxuICAgKi9cbiAgcHVibGljIGdldCBjb250ZXh0KCk6IFdlYkdMUmVuZGVyaW5nQ29udGV4dCB7XG4gICAgcmV0dXJuIHRoaXMuX2dsO1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZSBwcm9ncmFtIGluc3RhbmNlXG4gICAqIEBwYXJhbSB7c3RyaW5nfSB2ZXJ0ZXggLSBWZXJ0ZXggc2hhZGVyIHNvdXJjZVxuICAgKiBAcGFyYW0ge3N0cmluZ30gZnJhZ21lbnQgLSBGcmFnbWVudCBzaGFkZXIgc291cmNlXG4gICAqIEByZXR1cm4ge05JU0dMUHJvZ3JhbX0gTklTR0xQcm9ncmFtIGluc3RhbmNlXG4gICAqL1xuICBwdWJsaWMgY3JlYXRlUHJvZ3JhbShcbiAgICB2ZXJ0ZXg/OiBzdHJpbmcsXG4gICAgZnJhZ21lbnQ/OiBzdHJpbmdcbiAgKTogTklTR0xQcm9ncmFtIHwgdW5kZWZpbmVkIHtcbiAgICBjb25zdCBnbCA9IHRoaXMuX2dsO1xuICAgIGNvbnN0IHByb2dyYW0gPSBnbC5jcmVhdGVQcm9ncmFtKCk7XG5cbiAgICBpZiAocHJvZ3JhbSA9PT0gbnVsbCkge1xuICAgICAgdGhpcy5lbWl0TWVzc2FnZShcIlByb2dyYW0gY3JlYXRpb24gZXJyb3JcIik7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKCghdmVydGV4ICYmIGZyYWdtZW50KSB8fCAodmVydGV4ICYmICFmcmFnbWVudCkpIHtcbiAgICAgIHRoaXMuZW1pdE1lc3NhZ2UoXCJNaXNzaW5nIFZlcnRleCBvciBGcmFnbWVudCBzaGFkZXJcIik7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgcmV0dXJuIG5ldyBOSVNHTFByb2dyYW0oZ2wsIHByb2dyYW0sIHZlcnRleCwgZnJhZ21lbnQpO1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZSBpbmRleCBidWZmZXIgaW5zdGFuY2VcbiAgICogQHJldHVybiB7TklTR0xCdWZmZXJ9IE5JU0dMQnVmZmVyIGluc3RhbmNlXG4gICAqL1xuICBwdWJsaWMgaW5kZXhCdWZmZXIoZGF0YT86IEJ1ZmZlclNvdXJjZSk6IE5JU0dMQnVmZmVyIHwgdW5kZWZpbmVkIHtcbiAgICBjb25zdCBnbCA9IHRoaXMuX2dsO1xuICAgIGNvbnN0IGJ1ZmZlciA9IGdsLmNyZWF0ZUJ1ZmZlcigpO1xuXG4gICAgaWYgKGJ1ZmZlciA9PT0gbnVsbCkge1xuICAgICAgdGhpcy5lbWl0TWVzc2FnZShcIkluZGV4IEJ1ZmZlciBjcmVhdGlvbiBlcnJvclwiKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICByZXR1cm4gbmV3IE5JU0dMQnVmZmVyKGdsLCBidWZmZXIsIFwiaW5kZXhcIiwgZGF0YSk7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlIGFycmF5IGJ1ZmZlciBpbnN0YW5jZVxuICAgKiBAcmV0dXJuIHtOSVNHTEJ1ZmZlcn0gTklTR0xCdWZmZXIgaW5zdGFuY2VcbiAgICovXG4gIHB1YmxpYyBhcnJheUJ1ZmZlcihkYXRhPzogQnVmZmVyU291cmNlKTogTklTR0xCdWZmZXIgfCB1bmRlZmluZWQge1xuICAgIGNvbnN0IGdsID0gdGhpcy5fZ2w7XG4gICAgY29uc3QgYnVmZmVyID0gZ2wuY3JlYXRlQnVmZmVyKCk7XG5cbiAgICBpZiAoYnVmZmVyID09PSBudWxsKSB7XG4gICAgICB0aGlzLmVtaXRNZXNzYWdlKFwiQXJyYXkgQnVmZmVyIGNyZWF0aW9uIGVycm9yXCIpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHJldHVybiBuZXcgTklTR0xCdWZmZXIoZ2wsIGJ1ZmZlciwgXCJhcnJheVwiLCBkYXRhKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGUgdGV4dHVyZSBpbnN0YW5jZVxuICAgKiBAcmV0dXJucyB7TklTR0xUZXh0dXJlfSBOSVNHTFRleHR1cmUgaW5zdGFuY2VcbiAgICovXG4gIHB1YmxpYyBjcmVhdGVUZXh0dXJlKCk6IE5JU0dMVGV4dHVyZSB7XG4gICAgY29uc3QgZ2wgPSB0aGlzLl9nbDtcblxuICAgIHJldHVybiBuZXcgTklTR0xUZXh0dXJlKGdsKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGUgZnJhbWUgYnVmZmVyIGluc3RhbmNlXG4gICAqIEBwYXJhbSB7bnVtYmVyfSB3aWR0aFxuICAgKiBAcGFyYW0ge251bWJlcn0gaGVpZ2h0XG4gICAqIEByZXR1cm4ge05JU0dMRnJhbWVCdWZmZXJ9XG4gICAqL1xuICBwdWJsaWMgY3JlYXRlRnJhbWVCdWZmZXIod2lkdGg/OiBudW1iZXIsIGhlaWdodD86IG51bWJlcik6IE5JU0dMRnJhbWVCdWZmZXIge1xuICAgIGNvbnN0IGdsID0gdGhpcy5fZ2w7XG5cbiAgICByZXR1cm4gbmV3IE5JU0dMRnJhbWVCdWZmZXIoZ2wsIHdpZHRoLCBoZWlnaHQpO1xuICB9XG5cbiAgLyoqXG4gICAqIEluaXRhbGl6ZSBjYW52YXNcbiAgICogQHBhcmFtIHtudW1iZXJ9IHIgUmVkIENvbG9yIFZhbHVlLCBkZWZhdWx0IDAuMFxuICAgKiBAcGFyYW0ge251bWJlcn0gZyBHcmVlbiBDb2xvciBWYWx1ZSwgZGVmYXVsdCAwLjBcbiAgICogQHBhcmFtIHtudW1iZXJ9IGIgQmx1ZSBDb2xvciBWYWx1ZSwgZGVmYXVsdCAwLjBcbiAgICogQHBhcmFtIHtudW1iZXJ9IGEgQWxwaGEgQ29sb3IgVmFsdWUsIGRlZmF1bHQgMS4wXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBkZXB0aCBEZXBhdGgsIGRlZmF1bHQgMS4wXG4gICAqL1xuICBwdWJsaWMgY2xlYXIoXG4gICAgcjogbnVtYmVyID0gMC4wLFxuICAgIGc6IG51bWJlciA9IDAuMCxcbiAgICBiOiBudW1iZXIgPSAwLjAsXG4gICAgYTogbnVtYmVyID0gMS4wLFxuICAgIGRlcHRoOiBudW1iZXIgPSAxLjBcbiAgKTogdm9pZCB7XG4gICAgY29uc3QgZ2wgPSB0aGlzLl9nbDtcbiAgICBnbC5jbGVhckNvbG9yKHIsIGcsIGIsIGEpO1xuICAgIGdsLmNsZWFyRGVwdGgoZGVwdGgpO1xuICAgIGdsLmNsZWFyKEdMX0NPTE9SX0JVRkZFUl9CSVQgfCBHTF9ERVBUSF9CVUZGRVJfQklUKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBGbHVzaFxuICAgKi9cbiAgZmx1c2goKSB7XG4gICAgdGhpcy5fZ2wuZmx1c2goKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBFbWl0IEVycm9yIE1lc3NhZ2VcbiAgICogQHBhcmFtIHtFcnJvciB8IHN0cmluZyB8IG51bGx9IGVycm9yIEVycm9yIE1lc3NhZ2VcbiAgICogQHJldHVybiB7RXJyb3J9IEVycm9yIG1lc3NhZ2VcbiAgICovXG4gIHB1YmxpYyBlbWl0TWVzc2FnZShlcnJvcj86IEVycm9yIHwgc3RyaW5nIHwgbnVsbCk6IEVycm9yIHtcbiAgICBpZiAodHlwZW9mIGVycm9yID09PSBcInN0cmluZ1wiKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoZXJyb3IpO1xuICAgIH0gZWxzZSBpZiAoZXJyb3IpIHtcbiAgICAgIHRocm93IGVycm9yO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyB0aGlzLl9tZXNzYWdlO1xuICAgIH1cbiAgfVxufVxuIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJNQUFhLFlBQVk7SUFRdkIsWUFDRSxFQUF5QixFQUN6QixPQUFxQixFQUNyQixNQUFlLEVBQ2YsUUFBaUI7UUFQWCxZQUFPLEdBQVksS0FBSyxDQUFDO1FBQ3pCLFlBQU8sR0FBWSxLQUFLLENBQUM7UUFRL0IsSUFBSSxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUM7UUFDZCxJQUFJLENBQUMsUUFBUSxHQUFHLE9BQU8sQ0FBQztRQUN4QixJQUFJLENBQUMsT0FBTyxHQUFnQixFQUFFLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUM5RCxJQUFJLENBQUMsU0FBUyxHQUFnQixFQUFFLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxlQUFlLENBQUMsQ0FBQztRQUVsRSxFQUFFLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzdDLEVBQUUsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7UUFFL0MsSUFBSSxNQUFNLElBQUksUUFBUSxFQUFFO1lBQ3RCLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1NBQ2hDO0tBQ0Y7Ozs7O0lBTUQsSUFBVyxVQUFVO1FBQ25CLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQztLQUN0Qjs7OztJQUtNLE9BQU87UUFDWixJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztRQUNyQixJQUFJLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDdEMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3BDLElBQUksQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztLQUN2Qzs7OztJQUtNLEdBQUc7UUFDUixJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUNqQixNQUFNLElBQUksS0FBSyxDQUFDLGdDQUFnQyxDQUFDLENBQUM7U0FDbkQ7UUFFRCxJQUFJLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7S0FDcEM7Ozs7Ozs7SUFRTSxPQUFPLENBQUMsTUFBYyxFQUFFLFFBQWdCO1FBQzdDLE1BQU0sRUFBRSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUM7UUFFcEIsSUFDRSxFQUNFLGFBQWEsQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLE9BQU8sRUFBRSxNQUFNLENBQUM7WUFDdkMsYUFBYSxDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsU0FBUyxFQUFFLFFBQVEsQ0FBQyxDQUM1QyxFQUNEO1lBQ0EsT0FBTyxLQUFLLENBQUM7U0FDZDtRQUVELEVBQUUsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBRTlCLElBQUksQ0FBQyxPQUFPLEdBQUcsRUFBRSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUUzRSxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUNqQixPQUFPLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztZQUNuRCxPQUFPLEtBQUssQ0FBQztTQUNkO1FBRUQsT0FBTyxJQUFJLENBQUM7S0FDYjs7Ozs7SUFNRCxJQUFXLFFBQVE7UUFDakIsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDO0tBQ3JCOzs7O0lBS00sU0FBUztRQUNkLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLEdBQUcsSUFBSSxDQUFDO0tBQzVDOzs7Ozs7SUFPTSxrQkFBa0IsQ0FBQyxJQUFZO1FBQ3BDLE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxDQUFDO0tBQ3pEOzs7Ozs7O0lBUU0sVUFBVSxDQUFDLElBQVksRUFBRSxJQUFZLEVBQUUsR0FBRyxLQUFlO1FBQzlELE1BQU0sRUFBRSxHQUFJLElBQVksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLENBQUM7UUFDM0MsTUFBTSxlQUFlLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxDQUFDO1FBRXRELElBQUksZUFBZSxLQUFLLElBQUksSUFBSSxJQUFJLENBQUMsT0FBTyxFQUFFO1lBQzVDLE9BQU8sQ0FBQyxLQUFLLENBQUMsMERBQTBELENBQUMsQ0FBQztZQUMxRSxPQUFPO1NBQ1I7UUFFRCxFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxlQUFlLEVBQUUsR0FBRyxLQUFLLENBQUMsQ0FBQztLQUMxQzs7Ozs7O0lBT00sU0FBUyxDQUFDLFFBQThCLEVBQUUsS0FBYTtRQUM1RCxJQUFJLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxRQUFRLEVBQUUsS0FBSyxDQUFDLENBQUM7S0FDckM7Ozs7Ozs7SUFRTSxTQUFTLENBQUMsUUFBOEIsRUFBRSxDQUFTLEVBQUUsQ0FBUztRQUNuRSxJQUFJLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0tBQ3BDOzs7Ozs7OztJQVNNLFNBQVMsQ0FDZCxRQUE4QixFQUM5QixDQUFTLEVBQ1QsQ0FBUyxFQUNULENBQVM7UUFFVCxJQUFJLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztLQUN2Qzs7Ozs7Ozs7O0lBVU0sU0FBUyxDQUNkLFFBQThCLEVBQzlCLENBQVMsRUFDVCxDQUFTLEVBQ1QsQ0FBUyxFQUNULENBQVM7UUFFVCxJQUFJLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7S0FDMUM7Ozs7OztJQU9NLFNBQVMsQ0FBQyxRQUE4QixFQUFFLEtBQWE7UUFDNUQsSUFBSSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsUUFBUSxFQUFFLEtBQUssQ0FBQyxDQUFDO0tBQ3JDOzs7Ozs7O0lBUU0sU0FBUyxDQUFDLFFBQThCLEVBQUUsQ0FBUyxFQUFFLENBQVM7UUFDbkUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsUUFBUSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztLQUNwQzs7Ozs7Ozs7SUFTTSxTQUFTLENBQ2QsUUFBOEIsRUFDOUIsQ0FBUyxFQUNULENBQVMsRUFDVCxDQUFTO1FBRVQsSUFBSSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsUUFBUSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7S0FDdkM7Ozs7Ozs7OztJQVVNLFNBQVMsQ0FDZCxRQUE4QixFQUM5QixDQUFTLEVBQ1QsQ0FBUyxFQUNULENBQVMsRUFDVCxDQUFTO1FBRVQsSUFBSSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsUUFBUSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0tBQzFDOzs7Ozs7SUFPTSxVQUFVLENBQUMsUUFBOEIsRUFBRSxLQUFrQjtRQUNsRSxJQUFJLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxRQUFRLEVBQUUsS0FBSyxDQUFDLENBQUM7S0FDdEM7Ozs7OztJQU9NLFVBQVUsQ0FBQyxRQUE4QixFQUFFLEtBQWtCO1FBQ2xFLElBQUksQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLFFBQVEsRUFBRSxLQUFLLENBQUMsQ0FBQztLQUN0Qzs7Ozs7O0lBT00sVUFBVSxDQUFDLFFBQThCLEVBQUUsS0FBa0I7UUFDbEUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsUUFBUSxFQUFFLEtBQUssQ0FBQyxDQUFDO0tBQ3RDOzs7Ozs7SUFPTSxVQUFVLENBQUMsUUFBOEIsRUFBRSxLQUFrQjtRQUNsRSxJQUFJLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxRQUFRLEVBQUUsS0FBSyxDQUFDLENBQUM7S0FDdEM7Ozs7OztJQU9NLFVBQVUsQ0FBQyxRQUE4QixFQUFFLEtBQWdCO1FBQ2hFLElBQUksQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLFFBQVEsRUFBRSxLQUFLLENBQUMsQ0FBQztLQUN0Qzs7Ozs7O0lBT00sVUFBVSxDQUFDLFFBQThCLEVBQUUsS0FBZ0I7UUFDaEUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsUUFBUSxFQUFFLEtBQUssQ0FBQyxDQUFDO0tBQ3RDOzs7Ozs7SUFPTSxVQUFVLENBQUMsUUFBOEIsRUFBRSxLQUFnQjtRQUNoRSxJQUFJLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxRQUFRLEVBQUUsS0FBSyxDQUFDLENBQUM7S0FDdEM7Ozs7OztJQU9NLFVBQVUsQ0FBQyxRQUE4QixFQUFFLEtBQWdCO1FBQ2hFLElBQUksQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLFFBQVEsRUFBRSxLQUFLLENBQUMsQ0FBQztLQUN0Qzs7Ozs7OztJQVFNLGdCQUFnQixDQUNyQixRQUE4QixFQUM5QixLQUFtQixFQUNuQixZQUFxQixLQUFLO1FBRTFCLElBQUksQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxFQUFFLFNBQVMsRUFBRSxLQUFLLENBQUMsQ0FBQztLQUN2RDs7Ozs7OztJQVFNLGdCQUFnQixDQUNyQixRQUE4QixFQUM5QixLQUFtQixFQUNuQixZQUFxQixLQUFLO1FBRTFCLElBQUksQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxFQUFFLFNBQVMsRUFBRSxLQUFLLENBQUMsQ0FBQztLQUN2RDs7Ozs7OztJQVFNLGdCQUFnQixDQUNyQixRQUE4QixFQUM5QixLQUFtQixFQUNuQixZQUFxQixLQUFLO1FBRTFCLElBQUksQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxFQUFFLFNBQVMsRUFBRSxLQUFLLENBQUMsQ0FBQztLQUN2RDtDQUNGO0FBRUQ7QUFDQSxTQUFTLGFBQWEsQ0FDcEIsRUFBeUIsRUFDekIsTUFBbUIsRUFDbkIsTUFBYztJQUVkLEVBQUUsQ0FBQyxZQUFZLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBQ2hDLEVBQUUsQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUM7SUFFekIsSUFBSSxDQUFDLEVBQUUsQ0FBQyxrQkFBa0IsQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDLGNBQWMsQ0FBQyxFQUFFO1FBQ3JELE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLGdCQUFnQixDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7UUFDM0MsT0FBTyxLQUFLLENBQUM7S0FDZDtJQUVELE9BQU8sSUFBSSxDQUFDO0FBQ2Q7O0FDMVdBLE1BQU0sY0FBYyxHQUFHLE1BQU0sQ0FBQztBQUM5QixNQUFNLFFBQVEsR0FBRyxNQUFNLENBQUM7TUFVWCxXQUFXO0lBUXRCLFlBQ0UsRUFBeUIsRUFDekIsTUFBbUIsRUFDbkIsSUFBdUIsRUFDdkIsSUFBbUIsRUFDbkIsSUFBYTtRQVRQLFdBQU0sR0FBVyxjQUFjLENBQUM7UUFXdEMsSUFBSSxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUM7UUFDZCxJQUFJLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQztRQUN0QixJQUFJLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQztRQUNuQixJQUFJLENBQUMsV0FBVztZQUNkLElBQUksS0FBSyxPQUFPLEdBQUcsRUFBRSxDQUFDLG9CQUFvQixHQUFHLEVBQUUsQ0FBQyxZQUFZLENBQUM7UUFDL0QsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLEdBQUcsSUFBSSxHQUFHLEVBQUUsQ0FBQyxjQUFjLENBQUM7UUFFN0MsSUFBSSxJQUFJLEVBQUU7WUFDUixJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ2pCO0tBQ0Y7Ozs7O0lBTUQsSUFBSSxTQUFTO1FBQ1gsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDO0tBQ3JCOzs7O0lBS0QsSUFBSTtRQUNGLElBQUksQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0tBQ3JEOzs7OztJQU1ELE9BQU8sQ0FBQyxJQUFZO1FBQ2xCLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO0tBQ25COzs7O0lBS0QsT0FBTztRQUNMLElBQUksQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztLQUNyQzs7Ozs7SUFNRCxJQUFJLENBQUMsTUFBb0I7UUFDdkIsTUFBTSxFQUFFLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQztRQUNwQixFQUFFLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzlDLEVBQUUsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3JELEVBQUUsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsQ0FBQztLQUN2Qzs7Ozs7Ozs7OztJQVdELE1BQU0sQ0FDSixJQUFZLEVBQ1osSUFBWSxFQUNaLE9BQWUsUUFBUSxFQUN2QixhQUFzQixLQUFLLEVBQzNCLFNBQWlCLENBQUMsRUFDbEIsU0FBaUIsQ0FBQztRQUVsQixJQUFJLENBQUMsSUFBSSxJQUFJLENBQUMsSUFBSSxFQUFFO1lBQ2xCLE1BQU0sSUFBSSxLQUFLLENBQUMscURBQXFELENBQUMsQ0FBQztTQUN4RTtRQUVELElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDO1lBQ2pCLElBQUk7WUFDSixJQUFJO1lBQ0osSUFBSTtZQUNKLFVBQVU7WUFDVixNQUFNO1lBQ04sTUFBTTtTQUNQLENBQUMsQ0FBQztLQUNKOzs7OztJQU1ELGFBQWEsQ0FBQyxPQUFxQjtRQUNqQyxNQUFNLEVBQUUsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDO1FBRXBCLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLElBQUksQ0FBQyxFQUFFO1lBQzdCLE1BQU0sSUFBSSxLQUFLLENBQUMsbUNBQW1DLENBQUMsQ0FBQztTQUN0RDtRQUVELElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsTUFBTTtZQUMzQixNQUFNLGNBQWMsR0FBRyxFQUFFLENBQUMsaUJBQWlCLENBQ3pDLE9BQU8sQ0FBQyxVQUFVLEVBQ2xCLE1BQU0sQ0FBQyxJQUFJLENBQ1osQ0FBQztZQUNGLElBQUksY0FBYyxLQUFLLENBQUMsQ0FBQyxFQUFFO2dCQUN6QixFQUFFLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO2dCQUM5QyxFQUFFLENBQUMsdUJBQXVCLENBQUMsY0FBYyxDQUFDLENBQUM7Z0JBQzNDLEVBQUUsQ0FBQyxtQkFBbUIsQ0FDcEIsY0FBYyxFQUNkLE1BQU0sQ0FBQyxJQUFJLEVBQ1gsTUFBTSxDQUFDLElBQUksRUFDWCxNQUFNLENBQUMsVUFBVSxFQUNqQixNQUFNLENBQUMsTUFBTSxFQUNiLE1BQU0sQ0FBQyxNQUFNLENBQ2QsQ0FBQzthQUNIO1NBQ0YsQ0FBQyxDQUFDO0tBQ0o7Ozs7Ozs7SUFRRCxJQUFJLENBQUMsSUFBWSxFQUFFLEtBQWEsRUFBRSxTQUFpQixDQUFDO1FBQ2xELE1BQU0sRUFBRSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUM7UUFDcEIsSUFBSSxJQUFJLENBQUMsV0FBVyxLQUFLLEVBQUUsQ0FBQyxvQkFBb0IsRUFBRTtZQUNoRCxFQUFFLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUssRUFBRSxNQUFNLENBQUMsQ0FBQztTQUNsRDthQUFNO1lBQ0wsRUFBRSxDQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1NBQ3BDO0tBQ0Y7SUFFRCxVQUFVLENBQUMsS0FBYSxFQUFFLE1BQWM7UUFDdEMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsS0FBSyxFQUFFLE1BQU0sQ0FBQyxDQUFDO0tBQzdCO0lBRUQsU0FBUyxDQUFDLEtBQWEsRUFBRSxNQUFjO1FBQ3JDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLEtBQUssRUFBRSxNQUFNLENBQUMsQ0FBQztLQUM3QjtJQUVELFlBQVksQ0FBQyxLQUFhLEVBQUUsTUFBYztRQUN4QyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxLQUFLLEVBQUUsTUFBTSxDQUFDLENBQUM7S0FDN0I7SUFFRCxhQUFhLENBQUMsS0FBYSxFQUFFLE1BQWM7UUFDekMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsS0FBSyxFQUFFLE1BQU0sQ0FBQyxDQUFDO0tBQzdCO0lBRUQsYUFBYSxDQUFDLEtBQWEsRUFBRSxNQUFjO1FBQ3pDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLEtBQUssRUFBRSxNQUFNLENBQUMsQ0FBQztLQUM3QjtJQUVELGtCQUFrQixDQUFDLEtBQWEsRUFBRSxNQUFjO1FBQzlDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLEtBQUssRUFBRSxNQUFNLENBQUMsQ0FBQztLQUM3QjtJQUVELGVBQWUsQ0FBQyxLQUFhLEVBQUUsTUFBYztRQUMzQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxLQUFLLEVBQUUsTUFBTSxDQUFDLENBQUM7S0FDN0I7OztNQ3hMVSxZQUFZO0lBT3ZCLFlBQVksRUFBeUIsRUFBRSxNQUFlO1FBQ3BELElBQUksQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDO1FBQ2QsSUFBSSxDQUFDLFFBQVEsR0FBaUIsRUFBRSxDQUFDLGFBQWEsRUFBRSxDQUFDO1FBQ2pELElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO1FBQ2hCLElBQUksQ0FBQyxPQUFPLEdBQUcsQ0FBQyxDQUFDO1FBQ2pCLElBQUksQ0FBQyxPQUFPLEdBQUcsTUFBTSxJQUFJLEVBQUUsQ0FBQyxhQUFhLENBQUM7O0tBRTNDOzs7OztJQU1NLElBQUksQ0FBQyxFQUFXO1FBQ3JCLE1BQU0sRUFBRSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUM7UUFDcEIsSUFBSSxFQUFFLEtBQUssU0FBUyxFQUFFO1lBQ3BCLEVBQUUsQ0FBQyxhQUFhLENBQUMsRUFBRSxDQUFDLFFBQVEsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQztTQUMxQztRQUNELEVBQUUsQ0FBQyxXQUFXLENBQUMsRUFBRSxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7S0FDOUM7Ozs7SUFLTSxPQUFPO1FBQ1osTUFBTSxFQUFFLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQztRQUNwQixFQUFFLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztLQUNqQzs7Ozs7SUFNTSxTQUFTLENBQUMsTUFBYztRQUM3QixJQUFJLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQztLQUN2Qjs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFrQk0sU0FBUyxDQUNkLFFBQWlCLEtBQUssRUFDdEIsYUFBc0IsS0FBSyxFQUMzQixjQUF1QixLQUFLO1FBRTVCLE1BQU0sRUFBRSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUM7UUFDcEIsRUFBRSxDQUFDLGFBQWEsQ0FDZCxFQUFFLENBQUMsVUFBVSxFQUNiLEVBQUUsQ0FBQyxrQkFBa0IsRUFDckIsa0JBQWtCLENBQUMsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FDeEMsQ0FBQztRQUNGLEVBQUUsQ0FBQyxhQUFhLENBQ2QsRUFBRSxDQUFDLFVBQVUsRUFDYixFQUFFLENBQUMsa0JBQWtCLEVBQ3JCLGtCQUFrQixDQUFDLEtBQUssRUFBRSxVQUFVLEVBQUUsV0FBVyxDQUFDLENBQ25ELENBQUM7S0FDSDs7OztJQUtNLGFBQWE7UUFDbEIsTUFBTSxFQUFFLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQztRQUNwQixFQUFFLENBQUMsYUFBYSxDQUFDLEVBQUUsQ0FBQyxVQUFVLEVBQUUsRUFBRSxDQUFDLGNBQWMsRUFBRSxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDOUQsRUFBRSxDQUFDLGFBQWEsQ0FBQyxFQUFFLENBQUMsVUFBVSxFQUFFLEVBQUUsQ0FBQyxjQUFjLEVBQUUsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0tBQy9EOzs7O0lBS00sWUFBWTtRQUNqQixNQUFNLEVBQUUsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDO1FBQ3BCLEVBQUUsQ0FBQyxhQUFhLENBQUMsRUFBRSxDQUFDLFVBQVUsRUFBRSxFQUFFLENBQUMsY0FBYyxFQUFFLEVBQUUsQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUNyRSxFQUFFLENBQUMsYUFBYSxDQUFDLEVBQUUsQ0FBQyxVQUFVLEVBQUUsRUFBRSxDQUFDLGNBQWMsRUFBRSxFQUFFLENBQUMsYUFBYSxDQUFDLENBQUM7S0FDdEU7Ozs7SUFLTSxhQUFhO1FBQ2xCLE1BQU0sRUFBRSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUM7UUFDcEIsRUFBRSxDQUFDLGFBQWEsQ0FBQyxFQUFFLENBQUMsVUFBVSxFQUFFLEVBQUUsQ0FBQyxjQUFjLEVBQUUsRUFBRSxDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBQ3ZFLEVBQUUsQ0FBQyxhQUFhLENBQUMsRUFBRSxDQUFDLFVBQVUsRUFBRSxFQUFFLENBQUMsY0FBYyxFQUFFLEVBQUUsQ0FBQyxlQUFlLENBQUMsQ0FBQztLQUN4RTs7Ozs7SUFNTSxTQUFTLENBQUMsTUFBc0I7UUFDckMsTUFBTSxFQUFFLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQztRQUVwQixJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUM7UUFDM0IsSUFBSSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDO1FBRTdCLEVBQUUsQ0FBQyxXQUFXLENBQUMsRUFBRSxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDN0MsRUFBRSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsVUFBVSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLE9BQU8sRUFBRSxNQUFNLENBQUMsQ0FBQzs7O0tBSXpFOztJQUdNLFFBQVEsQ0FBQyxLQUFhLEVBQUUsTUFBYSxFQUFFLElBQTRCO1FBQ3hFLE1BQU0sRUFBRSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUM7UUFFcEIsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7UUFDcEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUM7UUFFdEIsSUFBSSxHQUFHLElBQUksSUFBSSxJQUFJLENBQUM7UUFFcEIsRUFBRSxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUM3QyxFQUFFLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUM7S0FDckc7Q0FDRjtBQUVEO0FBQ0E7Ozs7Ozs7O0FBUUEsU0FBUyxrQkFBa0IsQ0FDekIsS0FBYyxFQUNkLFVBQW1CLEVBQ25CLFdBQW9CO0lBRXBCLFFBQ0UsTUFBTSxHQUFHLENBQUMsS0FBSyxJQUFJLENBQUMsVUFBVSxJQUFJLENBQUMsQ0FBQyxJQUFJLEVBQUUsVUFBVSxJQUFJLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUMxRTtBQUNKOztNQ3JKYSxnQkFBZ0I7SUFPM0IsWUFBWSxFQUF5QixFQUFFLEtBQWMsRUFBRSxNQUFlO1FBRjlELGlCQUFZLEdBQWlCLEVBQUUsQ0FBQztRQUd0QyxJQUFJLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQztRQUNkLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxHQUFHLEtBQUssR0FBRyxDQUFDLENBQUM7UUFDaEMsSUFBSSxDQUFDLE9BQU8sR0FBRyxNQUFNLEdBQUcsTUFBTSxHQUFHLENBQUMsQ0FBQztRQUVuQyxJQUFJLENBQUMsWUFBWSxHQUFxQixFQUFFLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztRQUM3RCxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7S0FDYjs7OztJQUtNLElBQUk7UUFDVCxNQUFNLEVBQUUsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDO1FBQ3BCLEVBQUUsQ0FBQyxlQUFlLENBQUMsRUFBRSxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7S0FDdkQ7Ozs7SUFLTSxNQUFNO1FBQ1gsTUFBTSxFQUFFLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQztRQUNwQixFQUFFLENBQUMsZUFBZSxDQUFDLEVBQUUsQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLENBQUM7S0FDMUM7Ozs7SUFLTSxPQUFPO1FBQ1osTUFBTSxFQUFFLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQztRQUNwQixFQUFFLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO0tBQ3pDOzs7Ozs7O0lBUU0sTUFBTSxDQUFDLEtBQWEsRUFBRSxNQUFjO1FBQ3pDLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1FBQ3BCLElBQUksQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDO1FBRXRCLElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLENBQUMsVUFBVTtZQUNuQyxVQUFVLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1NBQzlDLENBQUMsQ0FBQztLQUNKOzs7O0lBS00sV0FBVztRQUNoQixNQUFNLEVBQUUsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDO1FBQ3BCLE1BQU0sVUFBVSxHQUFHLElBQUksVUFBVSxDQUFDLElBQUksaUJBQWlCLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUM3RCxVQUFVLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDcEIsSUFBSSxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsZ0JBQWdCLENBQUMsR0FBRyxVQUFVLENBQUM7S0FDckQ7Ozs7O0lBTU0sYUFBYSxDQUFDLE1BQWUsRUFBRSxJQUFjO1FBQ2xELE1BQU0sRUFBRSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUM7UUFDcEIsTUFBTSxPQUFPLEdBQUcsSUFBSSxZQUFZLENBQUMsRUFBRSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQzdDLE9BQU8sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ2xELElBQUksSUFBSSxFQUFFO1lBQ1IsT0FBTyxDQUFDLFNBQVMsQ0FBQyxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFDO1NBQ3hDO1FBQ0QsTUFBTSxVQUFVLEdBQUcsSUFBSSxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDM0MsVUFBVSxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQ3BCLElBQUksQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLGlCQUFpQixDQUFDLEdBQUcsVUFBVSxDQUFDO0tBQ3REOzs7OztJQU1NLFFBQVE7UUFDYixNQUFNLEVBQUUsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDO1FBQ3BCLE1BQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLGdCQUFnQixDQUFDLENBQUM7UUFDMUQsSUFBSSxVQUFVLEVBQUU7WUFDZCxPQUFPLFVBQVUsQ0FBQyxPQUFPLENBQUM7U0FDM0I7UUFFRCxPQUFPLENBQUMsSUFBSSxDQUFDLHNDQUFzQyxDQUFDLENBQUM7UUFFckQsT0FBTyxJQUFJLENBQUM7S0FDYjs7Ozs7SUFNTSxVQUFVO1FBQ2YsTUFBTSxFQUFFLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQztRQUNwQixNQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1FBQzNELElBQUksVUFBVSxFQUFFO1lBQ2QsT0FBTyxVQUFVLENBQUMsT0FBTyxDQUFDO1NBQzNCO1FBRUQsT0FBTyxDQUFDLElBQUksQ0FBQyw4Q0FBOEMsQ0FBQyxDQUFDO1FBRTdELE9BQU8sSUFBSSxDQUFDO0tBQ2I7Q0FDRjtBQUVELE1BQU0sVUFBVTtJQUdkLFlBQVksTUFBc0I7UUFDaEMsSUFBSSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUM7S0FDdkI7Ozs7OztJQU9NLE1BQU0sQ0FBQyxLQUFhLEVBQUUsTUFBYztRQUN6QyxJQUFJLElBQUksQ0FBQyxPQUFPLFlBQVksWUFBWSxFQUFFO1lBQ3hDLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLEtBQUssRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUM7U0FDNUM7YUFBTTtZQUNMLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxNQUFNLENBQUMsQ0FBQztTQUNwQztLQUNGOzs7O0lBS00sTUFBTTtRQUNYLE1BQU0sRUFBRSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDO1FBRTVCLElBQUksSUFBSSxDQUFDLE9BQU8sWUFBWSxZQUFZLEVBQUU7WUFDeEMsRUFBRSxDQUFDLG9CQUFvQixDQUNyQixFQUFFLENBQUMsV0FBVyxFQUNkLEVBQUUsQ0FBQyxpQkFBaUIsRUFDcEIsRUFBRSxDQUFDLFVBQVUsRUFDYixJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFDckIsQ0FBQyxDQUNGLENBQUM7U0FDSDthQUFNO1lBQ0wsRUFBRSxDQUFDLHVCQUF1QixDQUN4QixFQUFFLENBQUMsV0FBVyxFQUNkLEVBQUUsQ0FBQyxnQkFBZ0IsRUFDbkIsRUFBRSxDQUFDLFlBQVksRUFDZixJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FDM0IsQ0FBQztTQUNIO0tBQ0Y7Ozs7SUFLTSxRQUFRO1FBQ2IsTUFBTSxFQUFFLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUM7UUFFNUIsSUFBSSxJQUFJLENBQUMsT0FBTyxZQUFZLFlBQVksRUFBRTtZQUN4QyxFQUFFLENBQUMsb0JBQW9CLENBQ3JCLEVBQUUsQ0FBQyxXQUFXLEVBQ2QsRUFBRSxDQUFDLGlCQUFpQixFQUNwQixFQUFFLENBQUMsVUFBVSxFQUNiLElBQUksRUFDSixDQUFDLENBQ0YsQ0FBQztTQUNIO2FBQU07WUFDTCxFQUFFLENBQUMsdUJBQXVCLENBQ3hCLEVBQUUsQ0FBQyxXQUFXLEVBQ2QsRUFBRSxDQUFDLGdCQUFnQixFQUNuQixFQUFFLENBQUMsV0FBVyxFQUNkLElBQUksQ0FDTCxDQUFDO1NBQ0g7S0FDRjs7OztJQUtNLE9BQU87UUFDWixJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxDQUFDO0tBQ3hCO0NBQ0Y7QUFFRCxNQUFNLGlCQUFpQjtJQU1yQixZQUFZLEVBQXlCO1FBSDdCLFdBQU0sR0FBVyxDQUFDLENBQUM7UUFDbkIsWUFBTyxHQUFXLENBQUMsQ0FBQztRQUcxQixJQUFJLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQztRQUNkLElBQUksQ0FBQyxhQUFhLEdBQXNCLEVBQUUsQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO0tBQ2pFOzs7O0lBS00sSUFBSTtRQUNULE1BQU0sRUFBRSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUM7UUFDcEIsRUFBRSxDQUFDLGdCQUFnQixDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO0tBQzFEOzs7O0lBS00sT0FBTztRQUNaLE1BQU0sRUFBRSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUM7UUFDcEIsRUFBRSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztLQUMzQzs7Ozs7O0lBT00sTUFBTSxDQUFDLEtBQWEsRUFBRSxNQUFjO1FBQ3pDLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1FBQ3BCLElBQUksQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDO1FBQ3RCLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztLQUNoQjs7OztJQUtNLE9BQU87UUFDWixNQUFNLEVBQUUsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDO1FBQ3BCLEVBQUUsQ0FBQyxtQkFBbUIsQ0FDcEIsRUFBRSxDQUFDLFlBQVksRUFDZixFQUFFLENBQUMsaUJBQWlCLEVBQ3BCLElBQUksQ0FBQyxNQUFNLEVBQ1gsSUFBSSxDQUFDLE9BQU8sQ0FDYixDQUFDO0tBQ0g7OztBQzlPSCxNQUFNLG1CQUFtQixHQUFHLFVBQVUsQ0FBQztBQUN2QyxNQUFNLG1CQUFtQixHQUFHLFVBQVUsQ0FBQztNQUUxQixLQUFLO0lBSWhCLFlBQVksRUFBeUI7UUFIN0IsYUFBUSxHQUFHLElBQUksS0FBSyxDQUFDLGdCQUFnQixDQUFDLENBQUM7UUFJN0MsSUFBSSxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUM7S0FDZjs7Ozs7SUFNRCxJQUFXLE9BQU87UUFDaEIsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDO0tBQ2pCOzs7Ozs7O0lBUU0sYUFBYSxDQUNsQixNQUFlLEVBQ2YsUUFBaUI7UUFFakIsTUFBTSxFQUFFLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQztRQUNwQixNQUFNLE9BQU8sR0FBRyxFQUFFLENBQUMsYUFBYSxFQUFFLENBQUM7UUFFbkMsSUFBSSxPQUFPLEtBQUssSUFBSSxFQUFFO1lBQ3BCLElBQUksQ0FBQyxXQUFXLENBQUMsd0JBQXdCLENBQUMsQ0FBQztZQUMzQyxPQUFPO1NBQ1I7UUFFRCxJQUFJLENBQUMsQ0FBQyxNQUFNLElBQUksUUFBUSxNQUFNLE1BQU0sSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFO1lBQ2xELElBQUksQ0FBQyxXQUFXLENBQUMsbUNBQW1DLENBQUMsQ0FBQztZQUN0RCxPQUFPO1NBQ1I7UUFFRCxPQUFPLElBQUksWUFBWSxDQUFDLEVBQUUsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLFFBQVEsQ0FBQyxDQUFDO0tBQ3hEOzs7OztJQU1NLFdBQVcsQ0FBQyxJQUFtQjtRQUNwQyxNQUFNLEVBQUUsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDO1FBQ3BCLE1BQU0sTUFBTSxHQUFHLEVBQUUsQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUVqQyxJQUFJLE1BQU0sS0FBSyxJQUFJLEVBQUU7WUFDbkIsSUFBSSxDQUFDLFdBQVcsQ0FBQyw2QkFBNkIsQ0FBQyxDQUFDO1lBQ2hELE9BQU87U0FDUjtRQUVELE9BQU8sSUFBSSxXQUFXLENBQUMsRUFBRSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUM7S0FDbkQ7Ozs7O0lBTU0sV0FBVyxDQUFDLElBQW1CO1FBQ3BDLE1BQU0sRUFBRSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUM7UUFDcEIsTUFBTSxNQUFNLEdBQUcsRUFBRSxDQUFDLFlBQVksRUFBRSxDQUFDO1FBRWpDLElBQUksTUFBTSxLQUFLLElBQUksRUFBRTtZQUNuQixJQUFJLENBQUMsV0FBVyxDQUFDLDZCQUE2QixDQUFDLENBQUM7WUFDaEQsT0FBTztTQUNSO1FBRUQsT0FBTyxJQUFJLFdBQVcsQ0FBQyxFQUFFLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQztLQUNuRDs7Ozs7SUFNTSxhQUFhO1FBQ2xCLE1BQU0sRUFBRSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUM7UUFFcEIsT0FBTyxJQUFJLFlBQVksQ0FBQyxFQUFFLENBQUMsQ0FBQztLQUM3Qjs7Ozs7OztJQVFNLGlCQUFpQixDQUFDLEtBQWMsRUFBRSxNQUFlO1FBQ3RELE1BQU0sRUFBRSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUM7UUFFcEIsT0FBTyxJQUFJLGdCQUFnQixDQUFDLEVBQUUsRUFBRSxLQUFLLEVBQUUsTUFBTSxDQUFDLENBQUM7S0FDaEQ7Ozs7Ozs7OztJQVVNLEtBQUssQ0FDVixJQUFZLEdBQUcsRUFDZixJQUFZLEdBQUcsRUFDZixJQUFZLEdBQUcsRUFDZixJQUFZLEdBQUcsRUFDZixRQUFnQixHQUFHO1FBRW5CLE1BQU0sRUFBRSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUM7UUFDcEIsRUFBRSxDQUFDLFVBQVUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUMxQixFQUFFLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3JCLEVBQUUsQ0FBQyxLQUFLLENBQUMsbUJBQW1CLEdBQUcsbUJBQW1CLENBQUMsQ0FBQztLQUNyRDs7OztJQUtELEtBQUs7UUFDSCxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssRUFBRSxDQUFDO0tBQ2xCOzs7Ozs7SUFPTSxXQUFXLENBQUMsS0FBNkI7UUFDOUMsSUFBSSxPQUFPLEtBQUssS0FBSyxRQUFRLEVBQUU7WUFDN0IsTUFBTSxJQUFJLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUN4QjthQUFNLElBQUksS0FBSyxFQUFFO1lBQ2hCLE1BQU0sS0FBSyxDQUFDO1NBQ2I7YUFBTTtZQUNMLE1BQU0sSUFBSSxDQUFDLFFBQVEsQ0FBQztTQUNyQjtLQUNGOzs7OzsifQ==
