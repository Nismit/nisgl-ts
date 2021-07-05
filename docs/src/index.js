import Triangle from './triangle';
import ColoredTriangle from './coloredTriangle';
import MultipleModels from './multipleModels';
import SimpleTransition from './simpleTransition';
import Diamond from './diamond';
import Torus from './torus';

function init() {
  const ID = document.body.id;

  switch(ID) {
    case 'triangle':
      Triangle();
      break;
    case 'coloredTriangle':
      ColoredTriangle();
      break;
    case 'multipleModels':
      MultipleModels();
      break;
    case 'simpleTransition':
      SimpleTransition();
      break;
    case 'diamond':
      Diamond();
      break;
    case 'torus':
      Torus();
      break;
    default:
      // TODO
      // Will Implement WebGL Stuff For Homepage
  }
  
}

document.addEventListener("DOMContentLoaded", () => { init(); });