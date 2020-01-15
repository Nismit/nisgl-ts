import Triangle from './triangle';
import ColoredTriangle from './coloredTriangle';
import MultipleModels from './multipleModels';
import SimpleTransition from './simpleTransition';

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
    default:
      Triangle();
  }
  
}

document.addEventListener("DOMContentLoaded", () => { init(); });