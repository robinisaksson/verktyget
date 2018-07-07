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

var DOM = exports.DOM = {

  // querySelector
  Qs: function Qs(selector, scopeNode) {
    // scopeNode = scopeNode || document;
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
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var sensitiveWords = exports.sensitiveWords = function sensitiveWords(content, words) {
    return content.replace(new RegExp(words.join('|'), 'ig'), '****');
};
