import WebGLContext from "gl";
import { NISGL } from "../src/NISGL";
import { NISGLShader } from "../src/NISGLShader";
import { NISGLProgram } from "../src/NISGLProgram";

describe('NISGL', () => {
  let gl: WebGLRenderingContext;
  let nisgl: NISGL;

  beforeAll(() => {
    gl = WebGLContext(500, 250);
  });

  it('Initalize Test', () => {
    nisgl = new NISGL(gl);
    expect(nisgl).toBeInstanceOf(NISGL);
  });

  it('Should get WebGL Rendering Context', () => {
    const context = nisgl.context;
    expect(context).toBe(gl);
  });

  it('Unexpected Error with createShader', () => {
    expect(() => {
      nisgl.createShader(32);
    }).toThrowError();
  });

  it('Create shader instance', () => {
    const shader = nisgl.createShader(gl.FRAGMENT_SHADER);
    expect(shader).toBeInstanceOf(NISGLShader);
  });

  it('Create program instance', () => {
    const program = nisgl.createProgram();
    expect(program).toBeInstanceOf(NISGLProgram);
  });
})