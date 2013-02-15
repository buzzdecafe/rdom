
(function(obj) {
    var dom = {};

    var tags = [
        "div", "p", "table", "tr", "td", "th", "tbody", "thead", "tfoot", "span",
        "ul", "li", "a", "select", "option", "input", "button", "h1", "h2", "h3", "h4",
        "body", "head", "em", "hr", "br", "ol", "strong", "sub", "sup", "textarea",
        "title", "label"
    ];
    obj = obj || {};

    dom.el = function(tag) {
        return function(attrs, children) {
            var attrArray = Array.isArray(attrs),
                elem = document.createElement(tag), prop;

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
        }
    };

    // initialize a bunch of popular tags
    tags.forEach(function(tag) {
        dom[tag] = dom.el(tag);
    });

    obj.dom = dom;
    return dom;

}(this));

