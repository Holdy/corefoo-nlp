var expect = require('chai').expect;

var parser = require('../../../lib/parser/parser');

describe('parser - simplify', function() {


    it('should remove [please tell me] your name', function(done) {

        var parseResult = parser.parse('please tell me your name');

        expect(parseResult).to.be.ok;

        expect(parseResult.ignored.length).to.equal(1);
        expect(parseResult.ignored[0].string).to.equal('please tell me');
        done();
    });
});
