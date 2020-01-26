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
  const indexBuffer = nisgl.createBuffer();

  const torus_model = torus(32, 32, 1.0, 2.0);
  console.log(torus_model);
  const vertex_data = torus_model[0];
  const vertex_color = torus_model[1];
  const vertex_index = torus_model[2];

  const typedVertexData = new Float32Array(vertex_data); // needs to cast
  const typedVertexColorData = new Float32Array(vertex_color);
  const typedVertexIndexData = new Int16Array(vertex_index);

  positionBuffer.createVertexPosition(typedVertexData); // should be set buffer VBO
  colorBuffer.createVertexPosition(typedVertexColorData);
  indexBuffer.createVertexIndex(typedVertexIndexData);

  program.setAttribute('position', 3, positionBuffer);
  program.setAttribute('color', 4, colorBuffer);

  indexBuffer.bindBuffer('index');

  const mMatrix = mat4.create();
  const vMatrix = mat4.identity(mat4.create());
  const pMatrix = mat4.create();
  const tmpMatrix = mat4.create();
  const mvpMatrix = mat4.create();

  mat4.lookAt(
    vMatrix,
    [0.0, 0.0, 20.0],
    [0, 0, 0],
    [0, 1.0, 0]
  );

  mat4.perspective(
    pMatrix,
    45,
    canvas.width / canvas.height,
    0.1,
    100,
  );

  mat4.multiply(tmpMatrix, pMatrix, vMatrix);

  let counter = 0;

  nisgl.context.enable(nisgl.context.DEPTH_TEST);
  nisgl.context.depthFunc(nisgl.context.LEQUAL);
  nisgl.context.enable(nisgl.context.CULL_FACE);

  function render() {
    nisgl.clear();

    counter++;

    const rad = (counter % 360) * Math.PI / 180;

    mat4.identity(mMatrix);
    mat4.rotate(mMatrix, mMatrix, rad, [0.0, 1.0, 1.0]);
    mat4.multiply(mvpMatrix, tmpMatrix, mMatrix);

    program.setUniform('Matrix4fv', 'mvpMatrix', mvpMatrix);
    nisgl.context.drawElements(nisgl.context.TRIANGLES, vertex_index.length, nisgl.context.UNSIGNED_SHORT, 0);

    nisgl.context.flush();
  }

  function renderLoop() {
    render();
    requestAnimationFrame(renderLoop);
  }

  function torus(row, col, innerRad, outerRad) {
    const position = [];
    const column = [];
    const index = [];

    for(let i = 0; i <= row; i++) {
      const rad = Math.PI * 2 / row * i;
      const radX = Math.cos(rad);
      const radY = Math.sin(rad);

      for(let j = 0; j <= col; j++) {
        const tx = Math.PI * 2 / col * j;
        const ty = (radX * innerRad + outerRad) * Math.cos(tx);
        const tz = radY * innerRad;
        const tw = (radX * innerRad + outerRad) * Math.sin(tx);
        position.push(ty, tz, tw);

        const tc = hsva(360 / col * j, 1.0, 1.0, 1.0);
        column.push(tc[0], tc[1], tc[2], tc[3]);
      }
    }

    for(let i = 0; i < row; i++) {
      for(let j = 0; j < col; j++) {
        const rad = (col + 1) * i + j;
        index.push(rad, rad + col + 1, rad + 1);
        index.push(rad + col + 1, rad + col + 2, rad + 1);
      }
    }

    return [position, column, index];
  }

  function hsva(h, s, v, a) {
    const color = [];

    if(s > 1 || v > 1 || a > 1) {
      return;
    }

    const th = h % 360;
    const i = Math.floor(th / 60);
    const f = th / 60 - i;
    const m = v * (1 -s);
    const n = v * (1 - s * f);
    const k = v * (1 - s * (1 -f));

    if(!s > 0 && !s < 0) {
      color.push(v, v, v, a);
    } else {
      const r = [v, n, m, m, k, v];
      const g = [k, v, v, n, m, m];
      const b = [m, m, k, v, v, n];
      color.push(r[i], g[i], b[i], a);
    }

    return color;
  }

  renderLoop();
}