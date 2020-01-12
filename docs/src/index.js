import Triangle from './triangle';
import ColoredTriangle from './coloredTriangle';
import MultipleModels from './multipleModels';

function init() {
  const ID = document.body.id;

  switch(ID) {
    case 'triangle':
      Triangle();
      break;
    case 'coloredTriangle':
      ColoredTriangle();
      break;
    case 'multipleModel':
      MultipleModels();
      break;
    default:
      Triangle();
  }
  
}

document.addEventListener("DOMContentLoaded", () => { init(); });