(function(){function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s}return e})()({1:[function(require,module,exports){
'use strict';

var _deviceInfo = require('./utils/device-info.js');

var _dom = require('./utils/dom.js');

},{"./utils/device-info.js":2,"./utils/dom.js":3}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/*
Usage:
var isMobile = DeviceInfo.IsMobile();

Functions:
IsMobile      - True / False
GetPrefix     - Returns browser prefix {object} - {dom: "WebKit", lowercase: "webkit", css: "-webkit-", js: "Webkit"}

GetSize       - Returns {object} - {x: 1920, y: 1080}
GetScroll     - Returns {object} - {x: 0, y: 999}

Resize        - Set new size.             Make sure to listen for 'resize' - window.addEventListener('resize', Resize);
Scroll        - Set new scroll position.  Make sure to listen for 'scroll'  - window.addEventListener('resize', Resize);
*/

var DeviceInfo = {
  Init: function Init() {
    this.SetPrefix();
    this.Scroll();
    this.Resize();

    // Moved to project code
    // window.addEventListener('resize', Resize);
    // window.addEventListener('scroll', this.Scroll.bind(this));

    return this;
  },
  SetPrefix: function SetPrefix() {

    var styles = window.getComputedStyle(document.documentElement, '');
    var pre = (Array.prototype.slice.call(styles).join('').match(/-(moz|webkit|ms)-/) || styles.OLink === '' && ['', 'o'])[1];

    var dom = 'WebKit|Moz|MS|O'.match(new RegExp('(' + pre + ')', 'i'))[1];

    // Object containing browser prefixes
    // {dom: "WebKit", lowercase: "webkit", css: "-webkit-", js: "Webkit"}
    this.prefix = {
      dom: dom,
      lowercase: pre,
      css: '-' + pre + '-',
      js: pre[0].toUpperCase() + pre.substr(1)
    };
  },
  GetPrefix: function GetPrefix() {
    return this.prefix;
  },


  // Try to get all touch devices except "Desktop computers"
  IsMobile: function IsMobile() {
    var isMobile = navigator.userAgent.match(/(iPad)|(iPhone)|(iPod)|(Android)|(BlackBerry)|(IEMobile)|(Windows Phone)|(kindle)|(Opera Mini)|(webOS)/i) !== null;
    return isMobile;
  },


  // http://stackoverflow.com/questions/1248081/get-the-browser-viewport-dimensions-with-javascript
  Resize: function Resize() {
    var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

    this.size = { x: w, y: h };
  },
  GetSize: function GetSize() {
    return this.size;
  },
  Scroll: function Scroll() {
    var scrollX = window.pageXOffset || document.documentElement.scrollLeft; // || document.body.scrollLeft;
    var scrollY = window.pageYOffset || document.documentElement.scrollTop; // || document.body.scrollTop;

    this.scroll = { x: scrollX, y: scrollY };
  },
  GetScroll: function GetScroll() {
    return this.scroll;
  }
};

// const Resize = throttle(DeviceInfo.Resize.bind(DeviceInfo), 200);

exports.default = DeviceInfo.Init();

},{}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
/*
Usage:
var node = DOM.Qs('.className', document);      // node
var nodes = DOM.QsAll('.className', document);  // nodelist
var parent = DOM.FindParentTag(node, 'a');
var link = DOM.Create('a', {href: 'http://google.com', class: 'link'});
DOM.Add(link, node); // node, parent
DOM.AddAt(link, node, 0); // node, parent, index

AddAfter (node, parent, index)
WrapNode return wrapperNode
Remove (parent, child)
Style (node, styles, dom_update)
AbsoluteY(node) // return top position of node
AddClass(node, classname)
RemoveClass(node, classname)
ReplaceClass(node, className) // Remove all other classes, except 'className'
HasClass(node, classname)
ToggleClass(node, className, toggleName = undefined) // toggle or turn on/off
NodelistToArray(nodelist) // return array

*/

var DOM = {

  // querySelector
  Qs: function Qs(selector, scopeNode) {
    return scopeNode.querySelector(selector);
  },


  // querySelectorAll
  QsAll: function QsAll(selector, scopeNode) {
    scopeNode = scopeNode ? scopeNode : document;
    return scopeNode.querySelectorAll(selector);
  },


  // Recursive find parent
  // Go up the tree to find matching tag
  FindParentTag: function FindParentTag(el, tag) {
    // console.log('FindParentTag');
    while (el.parentNode) {
      el = el.parentNode;
      if (el.tagName === tag) return el;
    }
    return null;
  },


  // createElement
  Create: function Create(nodeType, attributes) {

    var node = document.createElement(nodeType);

    // add attributes
    if (attributes) {
      var k;
      for (k in attributes) {
        if (k == "html") {
          node.innerHTML = attributes[k];
        } else {
          node.setAttribute(k, attributes[k]);
        }
      }
    }

    return node;
  },


  // appendChild
  Add: function Add(node, parent) {
    parent.appendChild(node);
  },


  // insertBefore
  AddAt: function AddAt(node, parent, index) {
    parent.insertBefore(node, parent.childNodes[index]);
  },
  AddAfter: function AddAfter(node, refNode) {
    refNode.parentNode.insertBefore(node, refNode.nextSibling);
  },


  // Wrap node, returns wrapper
  WrapNode: function WrapNode(node, node_type) {

    var wrapperNode = document.createElement(node_type);

    while (node.childNodes.length) {
      wrapperNode.appendChild(node.childNodes[0]);
    }

    node.appendChild(wrapperNode);
    return wrapperNode;
  },


  // Remove node from DOM
  Remove: function Remove(parent, child) {
    this.Kill(parent, child);
  },


  // node.style
  Style: function Style(node, styles, dom_update) {

    var s;
    for (s in styles) {
      node.style[s] = styles[s];
    }

    dom_update === false ? false : node.offsetTop;
  },
  AbsoluteY: function AbsoluteY(node) {

    if (node.offsetParent) {
      return node.offsetTop + this.AbsoluteY(node.offsetParent);
    }
    return node.offsetTop;
  },
  AddClass: function AddClass(node, classname) {
    if (!new RegExp("(^|\\s)" + classname + "(\\s|$)").test(node.className)) {
      node.className += node.className ? " " + classname : classname;
    }
  },


  // Remove all instances of the parsed classname from element
  RemoveClass: function RemoveClass(node, classname) {
    node.className = node.className.replace(new RegExp("(\\b)" + classname + "(\\s|$)", "g"), " ").trim().replace(/[\s]{2}/g, " ");
  },


  // Remove all other classes, except 'className'
  ReplaceClass: function ReplaceClass(node, className) {
    node.className = className;
  },
  HasClass: function HasClass(node, classname) {

    var regexp = new RegExp("(^|\\s)(" + classname + ")(\\s|$)");
    if (regexp.test(node.className)) {
      return true;
    }
    return false;
  },


  // Toggle classname on element
  // if class is applied, then remove
  // if not applied, then apply
  // if toggleName is given as parameter, switch between to two classnames
  ToggleClass: function ToggleClass(node, className) {
    var toggleName = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined;


    var regexp = new RegExp("(^|\\s)" + className + "(\\s|$|\:)");
    if (regexp.test(node.className)) {
      HTML.RemoveClass(node, className);
      if (toggleName !== undefined) {
        HTML.AddClass(node, toggleName);
      }
    } else {
      HTML.AddClass(node, className);
      if (toggleName) {
        HTML.RemoveClass(node, toggleName);
      }
    }
  },


  // Nodelist to array
  NodelistToArray: function NodelistToArray(nodelist) {
    return Array.prototype.slice.call(nodelist);
  }
};

exports.default = DOM;

},{}]},{},[1]);
