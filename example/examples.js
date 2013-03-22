// include dom.js

(function(D) {
    "use strict";

    var tree, xs;

    function inputAndLabel(type, id, options, fn) {
        var a = [];
        fn = (fn && fn(a)) || function(opt) {
            a.push(D.p({className: "inputAndLabel"}, [
                D.input({type: type, id: opt.id, name: opt.name, value: opt.value}),
                D.label({"for": opt.id }, opt.text)
            ]));
        };
        options.forEach(fn);
        return a;
    }

    xs = [
        {name: "foo", id: "fooCow", value: "moo", text: "MOOOOOOO"},
        {name: "bar", id: "barCat", value: "meow", text: "MEOW"},
        {name: "baz", id: "bazEwe", value: "baa", text: "BAAAAAAAA"}
    ];

    tree = D.ul({id: "inputList"},
            [
                D.li(
                    D.div({className: "divClass", id: "wrap1"}, inputAndLabel("radio", "r", xs))
                ),
                D.li(
                    D.div({className: "divClass", id: "wrap2"}, inputAndLabel("checkbox", "c", xs))
                ),
                D.li({className: "regularLI"}, "Just some text here, please")
            ]);

    console.log(tree);
    // see? nice little dom fragment

}(dom));

