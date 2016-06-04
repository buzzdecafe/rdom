#rdom

`rdom` is a simple function that simplifies DOM element creation.

##API

`rdom :: String -> Object -> [DOM] -> DOM`

`rdom` is a curried function that takes a String document-element name, an object that maps its keys to the 
element's attributes, amd an Array of child elements. You may also include a plaintext String in the child elements
Array, and it will be converted to a text node. `rdom` returns a DOM tree, with the specified tag at the root.

A number of functions are defined as properties on the `rdom` function. These are simply partially applied calls to `rdom` 
with just the tag name. This generates functions of the type `Object -> [DOM] -> DOM`.  `rdom` includes `div`, `h1`, `input`, `p`, and several others. This is merely a convenience, so it is easy to write code like this:


    var tree = rdom.div({id: 'main'}, [
      rdom.p({}, ["Imagine your ad here"]),
      rdom.ul({className: 'mainlist'}, [
        rdom.li({}, ["First LI"]),
        rdom.li({className: 'active'}, ["Second LI"]),
        rdom.li({}, ["Third LI"])
      ])
    ]);

This produces a DOM tree that looks like this:

    <div id="main">
      <p>Imagine your ad here</p>
      <ul class="mainlist">
        <li>First LI</li>
        <li class="active">Second LI</li>
        <li>Third LI</li>
      </ul>
    </div>


------------------------------
_Originally inspired by Christian Johansen's talk [Pure, Functional JavaScript](http://vimeo.com/43382919)._

