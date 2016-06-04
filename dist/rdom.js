(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.rdom = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports = [
  "div", 
  "p", 
  "table", 
  "tr", 
  "td", 
  "th", 
  "tbody", 
  "thead", 
  "tfoot", 
  "span", 
  "ul", 
  "ol", 
  "li",
  "a", 
  "select", 
  "option", 
  "input", 
  "button", 
  "h1", 
  "h2", 
  "h3", 
  "h4", 
  "textarea", 
  "label"
];

},{}],"/src/rdom":[function(require,module,exports){
var tags = require('./tags');
var elProps = ["className", "innerHTML", "name", "title"];

// helper functions
function isElProp(prop) {
  return elProps.indexOf(prop) > -1;
}

function cfgElem(elem, attrs) {
  var prop;
  for (prop in attrs) {
    if (attrs.hasOwnProperty(prop)) {
      if (isElProp(prop)) {
        elem[prop] = attrs[prop];
      } else {
        elem.setAttribute(prop, attrs[prop]);
      }
    }
  }
  return elem;
}

function mkChildren(elem, children) {
  return children.reduce(function(elm, child) {
    if (typeof child === "string") {
      elm.appendChild(document.createTextNode(child));
    } else {
      elm.appendChild(child);
    }
    return elm;
  }, elem);
}

function rdom(tag, config, children) {
  switch (arguments.length) {
    case 0:
      return dom.el;
    case 1:
      return function _el1(conf, kids) {
        switch (arguments.length) {
          case 0: return _el1;
          case 1: return function _el1_1(ks) {
            var elem = document.createElement(tag);
            return mkChildren(cfgElem(elem, conf), ks);
          };
          default: 
            var elem = document.createElement(tag);
            return mkChildren(cfgElem(elem, conf), kids);
        }
      };
    case 2:
      return function _el2(cs) {
        if (arguments.length === 0) { return _el2; }
        var elem = document.createElement(tag);
        return mkChildren(cfgElem(elem, config), cs);
      };
    default:
      var elem = document.createElement(tag);
      return mkChildren(cfgElem(elem, config), children);
  }
};

rdom.addTags = function _rdomAddTags(ts, dest) {
  return ts.reduce(function(acc, tagName) {
    acc[tagName] = rdom(tagName);
    return acc;
  }, dest);
};

rdom.addTags(tags, rdom);

module.exports = rdom;

},{"./tags":1}]},{},[])("/src/rdom")
});