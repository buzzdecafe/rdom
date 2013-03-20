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
    function arrOrStr(obj) {
        return Array.isArray(obj) || typeof obj === "string";
    }

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

    // the meaty part:
    dom.el = function(tag, cfg) {
        cfg = cfg || {};
        return function(attrs, children) {
            var elem = (typeof tag === "string" ? document.createElement(tag) : tag);

            // sanity
            if (arrOrStr(attrs)) {
                children = mkArr(attrs);
                attrs = cfg;
            } else {
                children = mkArr(children);
                attrs = merge({}, cfg, attrs);
            }            

            return mkChildren(cfgElem(elem, attrs), children);
        };
    };

    // initialize a bunch of popular tags
//    tags.forEach(function(tag) {
//        dom[tag] = dom.el(tag);
//    });

    dom.addAll = function(ctx) {
        ctx = ctx || global;
        tags.forEach(function(tag) {
            ctx[tag] = dom.el(tag);
        });
    };

    dom.addAll(dom);

    global.dom = dom;

}(this));




// example
function inputAndLabel(type, id, options, fn) {
    "use strict";
    var a = [];
    fn = (fn && fn(a)) || function(opt) {
        a.push(dom.input({type: type, id: id, name: opt.name, value: opt.value}));
        a.push(dom.label({"for": id }, opt.text));
    };
    options.forEach(fn);
    return a;
}

