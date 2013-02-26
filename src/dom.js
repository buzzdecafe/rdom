// var dom =
(function() {
    "use strict";
    var dom = {};
    var tags = [
        "div", "p", "table", "tr", "td", "th", "tbody", "thead", "tfoot", "span", "ul", "ol", "li",
        "a", "select", "option", "input", "button", "h1", "h2", "h3", "h4", "textarea", "label"
    ];

    dom.el = function(tag) {
        return function(attrs, children) {
            var elem, prop, attrArray = Array.isArray(attrs);

            elem = (typeof tag === "string" ? document.createElement(tag) : tag);

            if (attrArray || typeof attrs === "string") {
                children = attrArray ? attrs : [attrs];
                attrs = {};
            }
            else if (children) {
                children = Array.isArray(children) ? children : [children];
            }

            for (prop in attrs) {
                if (attrs.hasOwnProperty(prop)) {
                    if (prop === "className" || prop === "innerHTML" || prop === "name" || prop === "title") {
                        elem[prop] = attrs[prop];
                    }
                    else {
                        elem.setAttribute(prop, attrs[prop]);
                    }
                }
            }

            children.forEach(function(child) {
                if (typeof child === "string") {
                    elem.innerText += child;
                }
                else {
                    elem.appendChild(child);
                }
            });
            return elem;
        };
    };

    dom.inputAndLabel = function(type, id, options, fn) {
        var a = [];
        fn = (fn && fn(a)) || function(opt) {
            a.push(dom.input({type: type, id: id, name: opt.name, value: opt.value}));
            a.push(dom.label({"for": id }, opt.text));
        };
        options.forEach(fn);
        return a;
    };

    // initialize a bunch of popular tags
    tags.forEach(function(tag) {
        dom[tag] = dom.el(tag);
    });

    return dom;

}());

