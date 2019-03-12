import WebGLContext from "gl";
import { NISGL } from "../src/NISGL";
import { NISGLShader } from "../src/NISGLShader";

describe('NISGL', () => {
  let gl: WebGLRenderingContext;
  let nisGL: NISGL;

  beforeAll(() => {
    gl = WebGLContext(500, 250);
  });

  it('Initalize Test', () => {
    nisGL = new NISGL(gl);
    expect(nisGL).toBeInstanceOf(NISGL);
  });

  it('Unexpected Error with createShader', () => {
    nisGL = new NISGL(gl);
    expect(() => {
      nisGL.createShader(32);
    }).toThrowError();
  });

  it('Create shader instance', () => {
    nisGL = new NISGL(gl);
    expect(() => {
      return nisGL.createShader(nisGL.getGLContext().FRAGMENT_SHADER);
    }).toBeInstanceOf(NISGLShader);
  })
})