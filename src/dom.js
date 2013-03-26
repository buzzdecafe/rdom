//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// HERE BEGINETH THE SCRIPT
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

(function(global) {
    "use strict";
    var dom = {};
    var tags = [
        "div", "p", "table", "tr", "td", "th", "tbody", "thead", "tfoot", "span", "ul", "ol", "li",
        "a", "select", "option", "input", "button", "h1", "h2", "h3", "h4", "textarea", "label"
    ];

    // helper functions
    function mkArr(obj) {
        return (!!obj ? (Array.isArray(obj) ? obj : [obj]) : []);
    }

    function cfgElem(elem, attrs) {
        var prop;
        for (prop in attrs) {
            if (attrs.hasOwnProperty(prop)) {
                if (prop === "className" || prop === "innerHTML" || prop === "name" || prop === "title") {
                    elem[prop] = attrs[prop];
                } else {
                    elem.setAttribute(prop, attrs[prop]);
                }
            }
        }
        return elem;
    }

    function mkChildren(elem, children) {
        children.forEach(function(child) {
            if (typeof child === "string") {
                elem.appendChild(document.createTextNode(child));
            } else {
                elem.appendChild(child);
            }
        });
        return elem;
    }

    // helper
    // naive shallow mixin function. good enough for now
    function merge(dest) {
        var args = Array.prototype.slice.call(arguments, 1);

        args.forEach(function(obj) {
            var prop;
            for (prop in obj) {
                if (obj.hasOwnProperty(prop)) {
                    dest[prop] = obj[prop];
                }
            }
        });
        return dest;
    }

    function isElem(obj) {
        return obj instanceof HTMLElement || (obj && (obj.nodeType === 1 || obj.nodeType === 3));
    }

    // the meaty part:
    dom.el = function(tag, cfg) {
        cfg = cfg || {};
        return function(attrs, children) {
            var elem = (typeof tag === "string" ? document.createElement(tag) : tag);

            // sanity
            if (Array.isArray(attrs) || typeof attrs === "string" || isElem(attrs)) {
                children = mkArr(attrs);
                attrs = cfg;
            } else {
                children = mkArr(children);
                attrs = merge({}, cfg, attrs);
            }
            return mkChildren(cfgElem(elem, attrs), children);
        };
    };

    dom.addAll = function(ctx) {
        ctx = ctx || global;
        tags.forEach(function(tag) {
            ctx[tag] = dom.el(tag);
        });
        return ctx;
    };
    dom.addAll(dom);

    global.dom = dom;

}(this));



