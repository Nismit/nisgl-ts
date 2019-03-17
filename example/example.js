import { NISGL } from "../dist/nisgl-ts";

function init() {
  console.log('test');
  const canvas = document.querySelector('#canvas');
  canvas.width = document.documentElement.clientWidth;
  canvas.height = window.innerHeight;
  const gl = canvas.getContext('webgl');
  const nisgl = new NISGL(gl);
  console.log(nisgl);
}

window.onload = (() => { init() });