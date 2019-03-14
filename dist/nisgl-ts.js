!function(t){var e={};function r(o){if(e[o])return e[o].exports;var i=e[o]={i:o,l:!1,exports:{}};return t[o].call(i.exports,i,i.exports,r),i.l=!0,i.exports}r.m=t,r.c=e,r.d=function(t,e,o){r.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:o})},r.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},r.t=function(t,e){if(1&e&&(t=r(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var o=Object.create(null);if(r.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var i in t)r.d(o,i,function(e){return t[e]}.bind(null,i));return o},r.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return r.d(e,"a",e),e},r.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},r.p="",r(r.s=4)}([function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={DEPTH_BUFFER_BIT:256,STENCIL_BUFFER_BIT:1024,COLOR_BUFFER_BIT:16384,POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6,ZERO:0,ONE:1,SRC_COLOR:768,ONE_MINUS_SRC_COLOR:769,SRC_ALPHA:770,ONE_MINUS_SRC_ALPHA:771,DST_ALPHA:772,ONE_MINUS_DST_ALPHA:773,DST_COLOR:774,ONE_MINUS_DST_COLOR:775,SRC_ALPHA_SATURATE:776,CONSTANT_COLOR:32769,ONE_MINUS_CONSTANT_COLOR:32770,CONSTANT_ALPHA:32771,ONE_MINUS_CONSTANT_ALPHA:32772,STATIC_DRAW:35044,STREAM_DRAW:35040,DYNAMIC_DRAW:35048,ARRAY_BUFFER:34962,ELEMENT_ARRAY_BUFFER:34963,BUFFER_SIZE:34660,BUFFER_USAGE:34661,CURRENT_VERTEX_ATTRIB:34342,VERTEX_ATTRIB_ARRAY_ENABLED:34338,VERTEX_ATTRIB_ARRAY_SIZE:34339,VERTEX_ATTRIB_ARRAY_STRIDE:34340,VERTEX_ATTRIB_ARRAY_TYPE:34341,VERTEX_ATTRIB_ARRAY_NORMALIZED:34922,VERTEX_ATTRIB_ARRAY_POINTER:34373,VERTEX_ATTRIB_ARRAY_BUFFER_BINDING:34975,BYTE:5120,UNSIGNED_BYTE:5121,SHORT:5122,UNSIGNED_SHORT:5123,INT:5124,UNSIGNED_INT:5125,FLOAT:5126}},function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=function(){function t(t,e){this._compiled=!1,this._gl=t,this._shader=e}return t.prototype.getShader=function(){return this._shader},t.prototype.deleteShader=function(){this._gl.getGLContext().deleteShader(this._shader)},t.prototype.isCompiled=function(){return this._compiled},t.prototype.compile=function(t){var e=this._gl.getGLContext();e.shaderSource(this._shader,t),e.compileShader(this._shader),this._compiled=e.getShaderParameter(this._shader,e.COMPILE_STATUS),this._compiled||this._gl.emitMessage(e.getShaderInfoLog(this._shader))},t}();e.NISGLShader=o},function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=function(){function t(t,e){this._linked=!1,this._gl=t,this._program=e}return t.prototype.getProgram=function(){return this._program},t.prototype.useProgram=function(){var t=this._gl.getGLContext();this._linked?t.useProgram(this._program):this._gl.emitMessage("Program has not linked yet.")},t.prototype.linkProgram=function(t){var e=this,r=this._gl.getGLContext();t.forEach(function(t){r.attachShader(e._program,t.getShader())}),r.linkProgram(this._program),this._linked=r.getProgramParameter(this._program,r.LINK_STATUS),this._linked||this._gl.emitMessage(r.getProgramInfoLog(this._program))},t}();e.NISGLProgram=o},function(t,e,r){"use strict";var o=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0});var i=o(r(0)),n=function(){function t(t,e){this._gl=t,this._buffer=e}return t.prototype.getBuffer=function(){return this._buffer},t.prototype.createVertexBufferObject=function(t,e){void 0===e&&(e=i.default.STATIC_DRAW);var r=this._gl.getGLContext();r.bindBuffer(r.ARRAY_BUFFER,this.getBuffer()),r.bufferData(r.ARRAY_BUFFER,t,e),r.bindBuffer(r.ARRAY_BUFFER,null)},t.prototype.createIndexBufferObject=function(t,e){void 0===e&&(e=i.default.STATIC_DRAW);var r=this._gl.getGLContext();r.bindBuffer(r.ELEMENT_ARRAY_BUFFER,this.getBuffer()),r.bufferData(r.ELEMENT_ARRAY_BUFFER,t,e),r.bindBuffer(r.ELEMENT_ARRAY_BUFFER,null)},t}();e.NISGLBuffer=n},function(t,e,r){"use strict";function o(t){for(var r in t)e.hasOwnProperty(r)||(e[r]=t[r])}var i=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0});var n=i(r(0));e.GL_CONST=n.default,o(r(5)),o(r(1)),o(r(2)),o(r(3)),o(r(6))},function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=r(1),i=r(2),n=r(3),_=function(){function t(t){this._message=new Error("Exeption Error"),this._gl=t}return t.prototype.getGLContext=function(){return this._gl},t.prototype.createShader=function(t){var e=this._gl.createShader(t);return null===e?(this.emitMessage(this._message),null):new o.NISGLShader(this,e)},t.prototype.createProgram=function(){var t=this._gl.createProgram();return null===t?(this.emitMessage(this._message),null):new i.NISGLProgram(this,t)},t.prototype.createBuffer=function(){var t=this._gl.createBuffer();return null===t?(this.emitMessage(this._message),null):new n.NISGLBuffer(this,t)},t.prototype.clear=function(t,e,r,o,i){void 0===t&&(t=0),void 0===e&&(e=0),void 0===r&&(r=0),void 0===o&&(o=1),void 0===i&&(i=1);var n=this._gl;n.clearColor(t,e,r,o),n.clearDepth(i),n.clear(n.COLOR_BUFFER_BIT|n.DEPTH_BUFFER_BIT)},t.prototype.emitMessage=function(t){throw"string"==typeof t?new Error(t):t||this._message},t}();e.NISGL=_},function(t,e,r){"use strict";var o=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0});var i=o(r(0)),n=function(){function t(t,e){this._isEnabled=!1,this._gl=t,this._program=e}return t.prototype.getAttributeLocation=function(t){var e=this._gl.getGLContext(),r=this._program.getProgram();return-1!==e.getAttribLocation(r,t)?e.getAttribLocation(r,t):void this._gl.emitMessage("Not found Attribute Location")},t.prototype.enableVertexAttribute=function(t){this._gl.getGLContext().enableVertexAttribArray(t),this._isEnabled=!0},t.prototype.vertexAttributePointer=function(t,e,r,o,n,_){void 0===r&&(r=i.default.FLOAT),void 0===o&&(o=!1),void 0===n&&(n=0),void 0===_&&(_=0);var u=this._gl.getGLContext();this._isEnabled?u.vertexAttribPointer(t,e,r,o,n,_):this._gl.emitMessage("Not enabled vertex attribute yet")},t}();e.NISGLAttribute=n}]);