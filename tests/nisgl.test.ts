import WebGLContext from "gl";
import { NISGL } from "../src/NISGL";
import { NISGLProgram } from "../src/NISGLProgram";
import { NISGLBuffer } from "../src/NISGLBuffer";

describe("NISGL Functions Test", () => {
  let gl: WebGLRenderingContext;
  let nisgl: NISGL;

  beforeAll(() => {
    gl = WebGLContext(500, 250);
    nisgl = new NISGL(gl);
  });

  it("Initalize Test", () => {
    expect(nisgl).toBeInstanceOf(NISGL);
  });

  it("Should get WebGL Rendering Context", () => {
    const context = nisgl.context;
    expect(context).toBe(gl);
  });

  it("Context clear test", () => {
    nisgl.clear(1.0, 0.5, 0.5, 1.0, 0.5);
    const colorArray = nisgl.context.getParameter(
      nisgl.context.COLOR_CLEAR_VALUE
    );
    const convertedArray = Array.from(colorArray);
    expect([1.0, 0.5, 0.5, 1.0]).toEqual(
      expect.arrayContaining(convertedArray)
    );
  });

  it("Unexpected Error with createProgram", () => {
    expect(() => {
      nisgl.createProgram("32");
    }).toThrowError();
  });

  it("Create program instance", () => {
    const program = nisgl.createProgram();
    expect(program).toBeInstanceOf(NISGLProgram);
  });

  it("Create buffer instance", () => {
    const buffer = nisgl.arrayBuffer(new Float32Array([1.0]));
    expect(buffer).toBeInstanceOf(NISGLBuffer);
  });
});
