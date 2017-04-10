// Some specific tests to ensure that known uses of the parser are preserved.
var expect = require('chai').expect;
var check = require('./nodeChecker').check;

var basis = require('../../../lib/definitions/basis');
var structureType = require('../../../lib/definitions/structureType');

var parser = require('../../../lib/parser/parser');
var fetch = require('../../../lib/navigator').find;

describe('Known use cases', function() {

    function process(inputText) {
        var parseResult = parser.parse(inputText);

        return parseResult.intentTree;
    }

    function nodeCount(item) {
        return 1 + childCount(item);
    }

    function childCount(item) {
        var children = item.children;
        if (children) {
            var result = 0;
            children.forEach(function(child) {
                result += nodeCount(child);
            });
            return result;
        } else {
            return 0;
        }
    }

    it('should process - prs', function(done) {
        var parseResult = parser.parse('prs');
        var intentTree = parseResult.intentTree;

        expect(nodeCount(intentTree)).to.equal(3);

        //default today
        check(intentTree, false, ['prs'], 1);

        var child = intentTree.children[0];
        expect(child.isStructure).to.be.ok;
        expect(child.codeBasis).to.equal(basis.defaulted);
        expect(child.codeType).to.equal(structureType.timeframe);

        var date = fetch.dataType.date(intentTree);
        expect(date instanceof Date).to.be.ok;

        done();
    });


    it('should process - who is on prs', function(done) {
        var parseTree = process('who is on prs');
        // check implied date.
        //TODO should be isQuery=true

        var date = fetch.dataType.date(parseTree);
        expect(date instanceof Date).to.be.ok;
        done();
    });

    it('should process - who is on prs today', function(done) {
        var parseTree = process('who is on prs today');
        // TODO explicit today

        expect(nodeCount(parseTree)).to.equal(5);

        done();
    });

    it('should process - who is on prs tomorrow', function(done) {
        var parseTree = process('who is on prs tomorrow');

        done();
    });

    it('should process - who is on prs tomoz', function(done) {
        var parseTree = process('who is on prs tomoz');

        done();
    });

    it('should process - play the barking dog', function(done) {
        // implied now
        var parseTree = process('play the barking dog');
        done();
    });

});
