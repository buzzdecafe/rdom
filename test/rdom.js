require('./setup');

describe("rdom", function() {
  var rdom;

  before(function() {
    rdom = require('..') || window.rdom;
  });

  it("is a function", function() {
    expect(rdom).to.be.a('function');
  });

  it("has the correct interface", function() {
    expect(rdom.addTags).to.be.a("function");
    var tags = require('../src/tags');
    tags.forEach(function(tag) {
      expect(rdom[tag]).to.be.a("function");
    });
  });

  it("takes a string and returns a function", function() {
    expect(rdom("li")).to.be.a("function");
    expect(rdom('div').length).to.equal(2);
  });
  
  it('takes a string and a config object and returns a function', function() {
    expect(rdom("li", {id: 'testLi'})).to.be.a("function");
    expect(rdom('div', {id: 'testDiv'}).length).to.equal(1);
  });

  it('takes a string, config, and a list of children and returns a DOM tree', function() {
    var p = rdom("p", {id: 'pTest', className: 'pclass'}, []);
    expect(p).to.be.instanceof(HTMLElement);
    expect(p.nodeType).to.equal(1);
    expect(p.nodeName).to.equal("P");
  });

  it("may take an empty list of children", function() {
    var p = rdom("p", {}, []);
    expect(p.children.length).to.equal(0);
  });

  it("may take DOM elements in its children array", function() {
    var p = rdom("p", {}, [document.createElement('span')]);
    expect(p.children.length).to.equal(1);
    expect(p.children[0].nodeName).to.equal('SPAN');
  });

  it("may take plain strings in its `children` array that will be converted to text nodes", function() {
    var p = rdom("p", {}, ['imagine your ad here']);
    expect(p.textContent).to.equal('imagine your ad here');
  });

  it("takes an array of elements and appends them to the returned element", function() {
    var ul = rdom("ul", {id: 'ulTest'});
    var li = rdom("li", {});
    var kids = [li(["First"]), li(["Second"]), li(["Third"])];
    var list = ul(kids);
    expect(list.childElementCount).to.equal(3);
    expect(list.children[0]).to.equal(kids[0]);
    expect(list.children[1]).to.equal(kids[1]);
    expect(list.children[2]).to.equal(kids[2]);
    expect(list.innerHTML).to.equal('<li>First</li><li>Second</li><li>Third</li>');
  });

  it("appends any strings in the array to the parent element's text", function() {
    var p = rdom("p", {}, ["moo ", rdom("a", {href: "http://moocow.com"}, ["cow"]), ", moo"]);
    expect(p.textContent).to.match(/^moo\s.*, moo$/);
  });

  it("converts the config object to element attributes", function() {
    var a = rdom.a({className: "moo", href: "/something"}, []);
    expect(a.className).to.equal("moo");
    expect(a.getAttribute("href")).to.equal("/something");
  });

  describe("rdom.addTags", function() {
    it("adds tags to the object supplied as an argument", function() {
      var obj = {};
      rdom.addTags(['p', 'div'], obj);
      expect(obj.p).to.be.a('function');
      expect(obj.div({}, ["text here"]).textContent).to.equal("text here");
    });

    it("returns the object passed in as an argument", function() {
      var obj = {};
      expect(rdom.addTags(['a', 'b', 'i'], obj)).to.equal(obj);
    });
  });
});

