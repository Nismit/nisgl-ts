import Triangle from './triangle';
import ColoredTriangle from './coloredTriangle';

function init() {
  const ID = document.body.id;

  switch(ID) {
    case 'triangle':
      Triangle();
      break;
    case 'coloredTriangle':
      ColoredTriangle();
      break;
    default:
      Triangle();
  }
  
}

document.addEventListener("DOMContentLoaded", () => { init(); });