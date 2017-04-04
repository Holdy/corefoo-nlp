var expect = require('chai').expect;

var tokenizer = require('../../../lib/parser/tokenizer');


describe('tokenizer', function() {

    it('should tokenize and build inheritance list', function(done) {

        var result = tokenizer.process('three blind mice');
        expect(result).to.be.ok;
        expect(result.length).to.equal(3);
        expect(result[0].strings).to.eql(['three']);
        expect(result[1].strings).to.eql(['blind']);
        expect(result[2].strings).to.eql(['mice']);

        done();
    });
});
