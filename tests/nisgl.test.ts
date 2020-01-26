/**
 * gl library has affected Node internal library bug
 * Node version should be under v12.13.0 to avoid the bug for now.
 * Ref: https://github.com/stackgl/headless-gl/issues/180 
 */

import WebGLContext from "gl";
import NISGL from "../src/NISGL";
import NISGLShader from "../src/NISGLShader";
import NISGLProgram from "../src/NISGLProgram";

describe('NISGL Functions Test', () => {
  let gl: WebGLRenderingContext;
  let nisgl: NISGL;

  beforeAll(() => {
    gl = WebGLContext(500, 250);
    nisgl = new NISGL(gl);
});

  it('Initalize Test', () => {
    expect(nisgl).toBeInstanceOf(NISGL);
  });

  it('Should get WebGL Rendering Context', () => {
    const context = nisgl.context;
    expect(context).toBe(gl);
  });

  it('Context clear test', () => {
    nisgl.clear(1.0, 0.5, 0.5, 1.0, 0.5);
    const colorArray = nisgl.context.getParameter(nisgl.context.COLOR_CLEAR_VALUE);
    const convertedArray =  Array.from(colorArray);
    expect([1.0, 0.5, 0.5, 1.0]).toEqual(expect.arrayContaining(convertedArray));
  });

  it('Unexpected Error with createShader', () => {
    expect(() => {
      nisgl.createShader(32);
    }).toThrowError();
  });

  it('Create shader instance', () => {
    const shader = nisgl.createShader(nisgl.context.FRAGMENT_SHADER);
    expect(shader).toBeInstanceOf(NISGLShader);
  });

  it('Create program instance', () => {
    const program = nisgl.createProgram();
    expect(program).toBeInstanceOf(NISGLProgram);
  });
})