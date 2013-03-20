/* jasmine 1.3.1 */
describe("dom", function() {

    var dom = window.dom;

    it("is defined", function() {
        expect(dom).toBeDefined();
    });

    it("has an el method", function() {
        expect(typeof dom.el).toBe("function");
    });

    it("has several tags already partially applied and available on its interface", function() {
        var tags = ["div", "p", "table", "tr", "td", "th", "tbody", "thead", "tfoot", "span",
            "ul", "ol", "li", "a", "select", "option", "input", "button", "h1", "h2", "h3",
            "h4", "textarea", "label"];
        tags.forEach(function(tag) {
            expect(typeof dom[tag]).toBe("function");
        });
    });

    describe("the el method: ", function() {

        it("takes a string or DOM element and returns a function", function() {
            expect(typeof dom.el("li")).toBe("function");
            expect(typeof dom.el(document.createElement("li"))).toBe("function");
        });

        it("may also take an optional configuration object", function() {
           expect(typeof dom.el("li", {id: "liid"})).toBe("function");
        });

        describe("the function returned from dom.el", function() {

            it("returns a dom element", function() {
                var p = dom.el("p")();
                expect(p instanceof HTMLElement || (p.nodeType === 1 && p.nodeName==="P")).toBe(true);
            });

            it("will apply the optional config options from the call to dom.el", function() {
                var cfg = {className: "cfg"};
                var configged = dom.el("p", cfg)();
                expect(configged.className).toBe(cfg.className);
            });

            it("takes a config object and returns a configured dom element, overriding initial configuration", function() {
                var cfg = {className: "origClass"};
                var override = {className: "overridden", id: "pid"};
                var p = dom.el("p", cfg)(override);
                expect(p.id).toEqual(override.id);
                expect(p.className).toEqual(override.className);
            });

            it("takes a string and returns an element with its text set to that string", function() {
                var p = dom.el("p")("some text");
                expect(p.textContent).toBe("some text");
            });

            it("takes an array of elements and appends them to the returned element", function() {
                var ul = dom.el("ul");
                var li = dom.el("li");
                var kids = [li("First"), li("Second"), li("Third")];
                var list = ul(kids);
                expect(list.childElementCount).toBe(3);
                expect(list.children[0]).toBe(kids[0]);
                expect(list.children[1]).toBe(kids[1]);
                expect(list.children[2]).toBe(kids[2]);
            });

            it("appends any strings in the array to the parent element's text", function() {
                var p = dom.el("p")(["moo ", dom.el("a")({href: "http://moocow.com"}, "cow"), ", moo"]);
                expect(p.textContent).toMatch(/^moo\s.*, moo$/);
            });

            it("may take a config object and a string for text", function() {
                var a = dom.a({className: "moo", href: "/"}, "cow");
                expect(a.className).toBe("moo");
                expect(a.getAttribute("href")).toBe("/");
                expect(a.textContent).toBe("cow");
            });

            it("may take a config object and an array of child objects and/or strings", function() {
                var a = dom.a({href: "/", target: "_blank"}, ["one ", dom.span("two, "), dom.span("three "), "four"]);
                expect(a.getAttribute('href')).toBe("/");
                expect(a.textContent).toBe("one two, three four");
                expect(a.childElementCount).toBe(2);
            });

        });
    });

    describe("the addAll method", function() {
        it("adds tags to global object", function() {
            dom.addAll();
            expect(p).toBeDefined();
            expect(div("text here").innerText).toBe("text here");
        });
    });

});

