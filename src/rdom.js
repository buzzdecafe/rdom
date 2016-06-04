var tags = require('./tags');
var elProps = ['className', 'innerHTML', 'name', 'title'];

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
    if (typeof child === 'string') {
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
    return rdom;
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
}

rdom.addTags = function _rdomAddTags(ts, dest) {
  return ts.reduce(function(acc, tagName) {
    acc[tagName] = rdom(tagName);
    return acc;
  }, dest);
};

rdom.addTags(tags, rdom);

module.exports = rdom;
