dom
----

This is a simple object that simplifies DOM element creation, inspired by Christian Johansen's
talk [Pure, Functional JavaScript](http://vimeo.com/43382919).

Johansen mentions a dom object that behaves like a DSL, and enables you to write code like this:

    div({className: "moo"},
        ul({id: "cow"},[
            li("an item"),
            li("an item"),
            li("an item")
        ])
    );

... etc. This is more of a gist, really--I thought it would be harder to do than it turned out to be.

