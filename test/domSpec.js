/* jasmine 1.1.0 */
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
            it("takes a config object and returns a configured dom element", function() {
                var cfg = {className: "testp", id: "pid"}
                var p = dom.el("p")(cfg);
                expect(p instanceof HTMLElement || (p.nodeType === 1 && typeof p.nodeName==="string")).toBe(true);
                expect(p.id).toEqual(cfg.id);
                expect(p.className).toEqual(cfg.className);
            });
        });
    });
/**/
});