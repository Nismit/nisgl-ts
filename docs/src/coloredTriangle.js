import { NISGL } from "../../dist/nisgl-ts";
import { mat4 } from "gl-matrix";

const Vertex = `
attribute vec3 position;
attribute vec4 color;
uniform   mat4 mvpMatrix;
varying   vec4 vColor;

void main(void) {
    vColor = color;
    gl_Position = mvpMatrix * vec4(position, 1.0);
}`;

const Fragment = `
precision mediump float;
varying vec4 vColor;

void main(void) {
	gl_FragColor = vColor;
}`;


export default function () {
  const canvas = document.querySelector('#canvas');
  canvas.width = document.documentElement.clientWidth;
  canvas.height = window.innerHeight;
  const gl = canvas.getContext('webgl');
  const nisgl = new NISGL(gl);

  // Clear
  nisgl.clear();

  // Compile shaders
  const vertex = nisgl.createShader(nisgl.context.VERTEX_SHADER);
  vertex.compile(Vertex);
  const fragment = nisgl.createShader(nisgl.context.FRAGMENT_SHADER);
  fragment.compile(Fragment);

  // Create a program
  const program = nisgl.createProgram();
  program.linkProgram([vertex, fragment]);
  nisgl.useProgram(program);

  // Create buffer
  const positionBuffer = nisgl.createBuffer();
  const colorBuffer = nisgl.createBuffer();

  const vertex_data = [
    0.0, 1.0, 0.0,
    1.0, 0.0, 0.0,
    -1.0, 0.0, 0.0
  ];

  // R,G,B,A
  const vertex_color = [
    1.0, 0.0, 0.0, 1.0,
    0.0, 1.0, 0.0, 1.0,
    0.0, 0.0, 1.0, 1.0
  ];

  const typedVertexData = new Float32Array(vertex_data); // needs to cast
  const typedVertexColorData = new Float32Array(vertex_color);

  positionBuffer.createVertexPosition(typedVertexData); // should be set buffer VBO
  colorBuffer.createVertexPosition(typedVertexColorData);

  program.setAttribute('position', 3, positionBuffer);
  program.setAttribute('color', 4, colorBuffer);

  const mMatrix = mat4.create();
  const vMatrix = mat4.identity(mat4.create());
  const pMatrix = mat4.create();
  const mvpMatrix = mat4.create();

  mat4.lookAt(
    vMatrix,
    [0.0, 1.0, 3.0],
    [0, 0, 0],
    [0, 1.0, 0]
  );

  mat4.perspective(
    pMatrix,
    90,
    canvas.width / canvas.height,
    0.1,
    100,
  );

  mat4.multiply(mvpMatrix, pMatrix, vMatrix);
  mat4.multiply(mvpMatrix, mvpMatrix, mMatrix);

  program.setUniform('Matrix4fv', 'mvpMatrix', mvpMatrix);

  nisgl.context.drawArrays(nisgl.context.TRIANGLES, 0, 3);
  nisgl.context.flush();
}