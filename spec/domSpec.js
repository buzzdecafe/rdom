/* jasmine 1.3.1 */
describe("dom", function() {

    it("is defined", function() {
        expect(dom).toBeDefined();
    });

    it("has an el method", function() {
        expect(typeof dom.el).toBe("function");
    });

    describe("the el method: ", function() {

        it("takes a string and returns a function", function() {
            expect(typeof dom.el("li")).toBe("function");
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

            it("takes a string and returns an element with its innerText set to that string", function() {
                var p = dom.el("p")("some text");
                expect(p.innerText).toBe("some text");
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

        });
    });
/**/
});