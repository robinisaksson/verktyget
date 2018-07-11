// WORK IN PROGRESS

const CSSTransition = {
  // GetVendorPrefix(name) {
  //
  //   var prefixes = [ "Khtml", "O", "ms", "Moz", "Webkit"]; // we loop backwards in this one.. therefore the most important in the back..
  //   testStyle = document.getElementsByTagName('html')[0].style;
  //
  //   // make sure that the first letter isent capitalized
  //   name = name.charAt(0).toLowerCase() + name.slice(1);
  //   // shortcut for names that are not vendor prefixed
  //   if ( name in testStyle ) {
  //     return name;
  //   }
  //
  //   // check for vendor prefixed names
  //   var capName = name.charAt(0).toUpperCase() + name.slice(1),
  //   fixedName,
  //   i = prefixes.length;
  //
  //   while ( i-- ) {
  //     fixedName = prefixes[ i ] + capName;
  //     if ( fixedName in testStyle ) {
  //       return fixedName;
  //     }
  //   }
  //
	// },
  //
  //
  // /*
  // *   USAGE:
  // *   CSS.SetTransition(node, 'all 1s ease-in', functionName, boolean);
  // */
  // SetTransition(node, transition, callback, autoDestroy) {
  //
  //   DOM.OPACITY = StyleUtility.GetVendorPrefix("opacity");// TODO: investigate wether this is needed..
	// 	DOM.TRANSFORM = StyleUtility.GetVendorPrefix("transform");
	// 	DOM.TRANSFORMORIGIN = StyleUtility.GetVendorPrefix("transformOrigin");
  //   DOM.TRANSITION = StyleUtility.GetVendorPrefix("transition");
	// 	DOM.ANIMATION = StyleUtility.GetVendorPrefix("animation");
	// 	DOM.ANIMATIONNAME = StyleUtility.GetVendorPrefix("animationName");
  //
  //   // node.style[StyleName.TRANSITION] = transition;
  // 	//
  //   // var transitions = {
  // 	// 	"transition": "transitionend",
  // 	// 	"MozTransition": "transitionend",
  // 	// 	"msTransition": "transitionend",
  // 	// 	"webkitTransition": "webkitTransitionEnd",
  // 	// 	"OTransition": "otransitionend"
  // 	// };
  //
  //   DOM.GetVendorPrefix("TransformOrigin")
  //
  //   node.style[DOM.GetVendorPrefix("transition")] = transition;
  //
  // 	if (typeof callback === "function" || autoDestroy !== false) {
  //
  // 		// Destroy + callback
  // 		var _destroyAndCallback = function(event) {
  //
  // 			if (event.target !== node) {
  // 				return null;
  // 			}
  // 			node.removeEventListener("transitionend", _destroyAndCallback);
  //
  //
  // 			// Clear transition from node
  // 			if (autoDestroy !== undefined && autoDestroy !== false) {
  // 				CSS.SetTransition(node, "", null, false);
  // 			}
  //
  // 			// Callback
  // 			if (typeof callback === "function") {
  // 				callback();
  // 			}
  //
  // 			event.stopPropagation();
  //
  // 		}
  //
  // 		node.addEventListener("transitionend", _destroyAndCallback);
  //
  // 		return _destroyAndCallback;
  // 	}
  //
  // 	return null;
  // },
  //
  //
  // RemoveTransition(node) {
  // 	node.style[StyleName.TRANSITION] = "none";
  // },
  // RemoveTransitionCallback(node, callback) {
  // 	node.removeEventListener("transitionend", callback);
  // },
  //
  // SetOrigin(node, x, y) {
  // 	node.style[DOM.TRANSFORMORIGIN] = x +"px "+ y +"px";
  // },
  // SetTranslate(node, x, y) {
  // 	node.style[DOM.TRANSFORM] = Polyfill.Create3DTranslate(x, y);
  // },
  // SetTranslateRotate(node, x, y, deg) {
  // 	node.style[DOM.TRANSFORM] = Polyfill.Create3DTranslate(x, y) + " rotate("+deg+"deg)";
  // },
  // SetTranslateScale(node, x, y, scale) {
  // 	node.style[DOM.TRANSFORM] = Polyfill.Create3DTranslate(x, y) + " scale("+scale+")";;
  // },
  // SetTranslateScaleRotate(node, x, y, scale, deg) {
  // 	node.style[DOM.TRANSFORM] = Polyfill.Create3DTranslate(x, y) + " scale("+scale+") rotate("+deg+"deg)";
  // },
  //
  // SetRotate(node, deg) {
  // 	node.style[DOM.TRANSFORM] = "rotate("+deg+"deg)";
  // },
  // SetRotateScale(node, deg, scale) {
  // 	node.style[DOM.TRANSFORM] = "rotate("+deg+"deg) scale("+scale+")";
  // },
  //
  // SetScale(node, scale) {
  // 	node.style[DOM.TRANSFORM] = "scale("+scale+")";
  // },
  // SetScaleXY(node, scaleX, scaleY) {
  // 	node.style[DOM.TRANSFORM] = "scaleX("+scaleX+") scaleY("+scaleY+")";
  // },
  //
  // SetTransformMatrix(node, matrix) {
  // 	node.style[DOM.TRANSFORM] = matrix.toString();
  // },
  //
  // SetOpacity(node, opacity) {
  // 	node.style[StyleName.OPACITY] = opacity;
  // },
  //
  // ForceUpdate(node) {
  // 	node.offsetHeight;
  // }
}

export default CSSTransition;
