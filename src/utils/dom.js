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


export const DOM = {

  // querySelector
  Qs (selector, scopeNode) {
    scopeNode = scopeNode ? scopeNode : document;
    return scopeNode.querySelector(selector);
  },

  // querySelectorAll
  QsAll (selector, scopeNode) {
    scopeNode = scopeNode ? scopeNode : document;
    return scopeNode.querySelectorAll(selector);
    // return Array.prototype.slice.call(scopeNode.querySelectorAll(selector)); // return a Array[] instead of nodelist
  },

  // Recursive find parent
  // Go up the tree to find matching tag
  FindParentTag(el, tag) {
    // console.log('FindParentTag');
    while (el.parentNode) {
      el = el.parentNode;
      if (el.tagName === tag)
        return el;
    }
    return null;
  },

  // createElement
  Create (nodeType, attributes) {

    var node = document.createElement(nodeType);

    // add attributes
    if(attributes) {
      var k;
      for(k in attributes) {
        if(k == "html") {
          node.innerHTML = attributes[k];
        } else {
          node.setAttribute(k, attributes[k]);
        }
      }
    }

    return node;
  },

  // appendChild
  Add (node, parent) {
    parent.appendChild(node);
  },

  // insertBefore
  AddAt (node, parent, index) {
    parent.insertBefore(node, parent.childNodes[index]);
  },

  AddAfter (node, refNode) {
    refNode.parentNode.insertBefore(node, refNode.nextSibling);
  },

  // Wrap node, returns wrapper
  WrapNode(node, node_type) {

    var wrapperNode = document.createElement(node_type);

    while(node.childNodes.length) {
      wrapperNode.appendChild(node.childNodes[0]);
    }

    node.appendChild(wrapperNode);
    return wrapperNode;
  },

  // Remove node from DOM
  Remove (parent, child) {
    this.Kill(parent, child);
  },

  // node.style
  Style (node, styles, dom_update) {

    var s;
    for(s in styles) {
      node.style[s] = styles[s];
    }

    dom_update === false ? false : node.offsetTop;
  },

  AbsoluteY(node) {

    if(node.offsetParent) {
      return node.offsetTop + this.AbsoluteY(node.offsetParent);
    }
    return node.offsetTop;
  },

  AddClass(node, classname) {
    if(!(new RegExp("(^|\\s)" + classname + "(\\s|$)")).test(node.className)) {
      node.className += node.className ? " " + classname : classname;
    }
  },

  // Remove all instances of the parsed classname from element
  RemoveClass(node, classname) {
    node.className = node.className.replace(new RegExp("(\\b)" + classname + "(\\s|$)", "g"), " ").trim().replace(/[\s]{2}/g, " ");
  },

  // Remove all other classes, except 'className'
  ReplaceClass(node, className) {
    node.className = className;
  },

  HasClass(node, classname) {

    var regexp = new RegExp("(^|\\s)(" + classname + ")(\\s|$)");
    if(regexp.test(node.className)) {
      return true;
    }
    return false;
  },

  // Toggle classname on element
  // if class is applied, then remove
  // if not applied, then apply
  // if toggleName is given as parameter, switch between to two classnames
  ToggleClass(node, className, toggleName = undefined) {

    var regexp = new RegExp("(^|\\s)" + className + "(\\s|$|\:)");
    if(regexp.test(node.className)) {
      HTML.RemoveClass(node, className);
      if(toggleName !== undefined) {
        HTML.AddClass(node, toggleName);
      }
    }
    else {
      HTML.AddClass(node, className);
      if(toggleName) {
        HTML.RemoveClass(node, toggleName);
      }
    }
  },

	// Nodelist to array
	NodelistToArray(nodelist) {
		return Array.prototype.slice.call(nodelist);
	}

}
