var expect = require('chai').expect;
var rewire = require('rewire');
var phraseHandler = rewire('../../../lib/parser/phraseHandler');
var parser = rewire('../../../lib/parser/parser');
var tokenizer = require('../../../lib/parser/tokenizer');

describe('phraseHandler', function() {

    describe('expandContractions', function() {
        var wrapWords = tokenizer.process;

        it('should handle - who[apos]s online', function (done) {
            var inputText = 'who\'s online';
            var wrapped = wrapWords(inputText);

            var result = phraseHandler.__get__('expandContractions')(wrapped);

            expect(result).to.be.ok;
            expect(result.length).to.equal(3);

            expect(result[0].strings[0]).to.equal('who');
            expect(result[1].strings[0]).to.equal('is');
            expect(result[2].strings[0]).to.equal('online');

            done();
        });

        it('should handle - whos online', function (done) {
            var inputText = 'whos online';
            var wrapped = wrapWords(inputText);

            var result = phraseHandler.__get__('expandContractions')(wrapped);

            expect(result).to.be.ok;
            expect(result.length).to.equal(3);

            expect(result[0].strings[0]).to.equal('who');
            expect(result[1].strings[0]).to.equal('is');
            expect(result[2].strings[0]).to.equal('online');

            done();
        });

    });


    describe('handleContractions', function() {
        var wrapWords = tokenizer.process;

        it('should handle - when i die', function (done) {
            var inputText = 'when i die';
            var wrapped = wrapWords(inputText);

            var result = phraseHandler.__get__('handleContractions')(wrapped);

            expect(result).to.be.ok;
            expect(result.length).to.equal(3);

            expect(result[0].strings).to.eql(['when']);
            expect(result[1].strings).to.eql(['i']);
            expect(result[2].strings).to.eql(['die']);

            done();
        });

        it('should handle - when i kick the bucket then', function (done) {
            var inputText = 'when i kick the bucket then';
            var wrapped = wrapWords(inputText);

            var result = phraseHandler.__get__('handleContractions')(wrapped);

            expect(result).to.be.ok;
            expect(result.length).to.equal(4);

            expect(result[0].strings).to.eql(['when']);
            expect(result[1].strings).to.eql(['i']);
            expect(result[2].strings).to.eql(['die']);
            expect(result[3].strings).to.eql(['then']);

            done();
        });

    });

});
