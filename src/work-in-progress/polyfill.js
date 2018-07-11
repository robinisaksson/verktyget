
// Object.assign
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
if (typeof Object.assign != 'function') {
  Object.assign = function (target, varArgs) { // .length of function is 2
    'use strict';
    if (target == null) { // TypeError if undefined or null
      throw new TypeError('Cannot convert undefined or null to object');
    }

    var to = Object(target);

    for (var index = 1; index < arguments.length; index++) {
      var nextSource = arguments[index];

      if (nextSource != null) { // Skip over if undefined or null
        for (var nextKey in nextSource) {
          // Avoid bugs when hasOwnProperty is shadowed
          if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
            to[nextKey] = nextSource[nextKey];
          }
        }
      }
    }
    return to;
  };
}



// // http://paulirish.com/2011/requestanimationframe-for-smart-animating/
// // http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating
// // requestAnimationFrame polyfill by Erik Möller. fixes from Paul Irish, Tino Zijdel
// // MIT license
//
// (function() { //Closure to avoid memory leak
//
// 	(function() { //Closure to avoid memory leak again..
//
// 		var vendors = ['ms', 'moz', 'webkit', 'o'];
// 		for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
// 			window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
// 			window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame'] || window[vendors[x]+'CancelRequestAnimationFrame'];
// 		}
//
// 	}());
//
// 	if (!window.requestAnimationFrame) {
// 		//Fix to make sure that the time isent extremly huge. and to give the correct number..
// 		var baseTime = new Date().getTime();
// 		var lastTime = 0;
// 		window.requestAnimationFrame = function(callback) {
// 			var currTime = new Date().getTime()-baseTime;
// 			var timeToCall = Math.max(0, 16 - (currTime - lastTime));
// 			var id = window.setTimeout(  function() {callback(currTime + timeToCall);},   timeToCall);
// 			lastTime = currTime + timeToCall;
// 			return id;
// 		};
// 	}
//
// 	if (!window.cancelAnimationFrame) {
// 		window.cancelAnimationFrame = function(id) {
// 			clearTimeout(id);
// 		};
// 	}
//
// }());
