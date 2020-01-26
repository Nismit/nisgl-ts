import NISGL from "../../dist/nisgl-ts";
import { mat4 } from "gl-matrix";

const Vertex = `
attribute vec3 position;
uniform   mat4 mvpMatrix;

void main(void){
    gl_Position = mvpMatrix * vec4(position, 1.0);
}`;

const Fragment = `
void main(void){
	gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
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
  const buffer = nisgl.createBuffer();

  const vertex_data = [
    0.0, 1.0, 0.0,
    1.0, 0.0, 0.0,
    -1.0, 0.0, 0.0
  ];
  const typedVertexData = new Float32Array(vertex_data); // needs to cast
  buffer.createVertexPosition(typedVertexData); // should be set buffer VBO

  program.setAttribute('position', 3, buffer);

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